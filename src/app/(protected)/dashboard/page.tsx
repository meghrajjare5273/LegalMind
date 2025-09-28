"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { useSession } from "@/contexts/session-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  CheckCircle2,
  Calendar,
  Plus,
  Bell,
  Trash2,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { debounce } from "lodash";
import CardNav from "@/components/react-bits/CardNav";

// Types remain the same
interface Task {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  dueDate?: Date;
  reminderTime?: Date;
  createdAt: Date;
}

interface ChatSession {
  id: string;
  title: string;
  updatedAt: Date;
  messages: Array<{ content: string }>;
}

interface DashboardData {
  Tasks: Task[];
  chatSessions: ChatSession[];
  stats: {
    totalTasks: number;
    completedTasks: number;
    pendingTasks: number;
    totalChatSessions: number;
    completionRate: number;
  };
}

type TaskPriority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";

// Optimized Dashboard Component
export default function DashboardPage() {
  const { user, loading } = useSession();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Local state - minimized and optimized
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "MEDIUM" as TaskPriority,
    dueDate: "",
    reminderTime: "",
  });

  // Memoized user firstName computation
  const firstName = useMemo(
    () => user?.name?.split(" ")[0] || "Counsel",
    [user?.name]
  );

  // React Query for data fetching with caching (fixed cacheTime -> gcTime)
  const {
    data: dashboardData,
    isLoading: isLoadingData,
    error,
  } = useQuery({
    queryKey: ["dashboard-data", user?.id],
    queryFn: async (): Promise<DashboardData> => {
      const response = await fetch("/api/dashboard");
      if (!response.ok) throw new Error("Failed to fetch dashboard data");
      return response.json() as Promise<DashboardData>;
    },
    enabled: !!user,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes (renamed from cacheTime)
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    refetchInterval: 5 * 60 * 1000, // Auto-refresh every 5 minutes
  });

  // Separate query for notifications with different timing
  const { data: notifications = [] } = useQuery({
    queryKey: ["notifications", user?.id],
    queryFn: async (): Promise<Task[]> => {
      const response = await fetch("/api/notifications");
      if (!response.ok) return [];
      const data = await response.json();
      return data.notifications || [];
    },
    enabled: !!user,
    staleTime: 2 * 60 * 1000, // 2 minutes
    refetchInterval: 2 * 60 * 1000, // Check every 2 minutes
  });

  // Optimized mutations with optimistic updates
  const createTaskMutation = useMutation({
    mutationFn: async (taskData: typeof newTask) => {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: taskData.title,
          description: taskData.description,
          priority: taskData.priority,
          dueDate: taskData.dueDate || null,
          reminderTime: taskData.reminderTime || null,
        }),
      });
      if (!response.ok) throw new Error("Failed to create task");
      return response.json();
    },
    onMutate: async (newTaskData) => {
      // Optimistic update
      await queryClient.cancelQueries({
        queryKey: ["dashboard-data", user?.id],
      });
      const previousData = queryClient.getQueryData<DashboardData>([
        "dashboard-data",
        user?.id,
      ]);

      const optimisticTask: Task = {
        id: `temp-${Date.now()}`,
        title: newTaskData.title,
        description: newTaskData.description,
        completed: false,
        priority: newTaskData.priority,
        dueDate: newTaskData.dueDate
          ? new Date(newTaskData.dueDate)
          : undefined,
        reminderTime: newTaskData.reminderTime
          ? new Date(newTaskData.reminderTime)
          : undefined,
        createdAt: new Date(),
      };

      queryClient.setQueryData<DashboardData>(
        ["dashboard-data", user?.id],
        (old) =>
          old
            ? {
                ...old,
                Tasks: [optimisticTask, ...old.Tasks],
                stats: {
                  ...old.stats,
                  totalTasks: old.stats.totalTasks + 1,
                  pendingTasks: old.stats.pendingTasks + 1,
                },
              }
            : old
      );

      return { previousData, optimisticTask };
    },
    onError: (err, variables, context) => {
      // Revert optimistic update on error
      if (context?.previousData) {
        queryClient.setQueryData(
          ["dashboard-data", user?.id],
          context.previousData
        );
      }
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["dashboard-data", user?.id] });
      setNewTask({
        title: "",
        description: "",
        priority: "MEDIUM",
        dueDate: "",
        reminderTime: "",
      });
      setIsCreateDialogOpen(false);
      toast({ title: "Success", description: "Task created successfully" });
    },
  });

  const toggleTaskMutation = useMutation({
    mutationFn: async ({
      taskId,
      completed,
    }: {
      taskId: string;
      completed: boolean;
    }) => {
      const response = await fetch(`/api/todos/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });
      if (!response.ok) throw new Error("Failed to update task");
      return response.json();
    },
    onMutate: async ({ taskId, completed }) => {
      await queryClient.cancelQueries({
        queryKey: ["dashboard-data", user?.id],
      });
      const previousData = queryClient.getQueryData<DashboardData>([
        "dashboard-data",
        user?.id,
      ]);

      queryClient.setQueryData<DashboardData>(
        ["dashboard-data", user?.id],
        (old) =>
          old
            ? {
                ...old,
                Tasks: old.Tasks.map((task) =>
                  task.id === taskId ? { ...task, completed: !completed } : task
                ),
                stats: {
                  ...old.stats,
                  completedTasks: completed
                    ? old.stats.completedTasks - 1
                    : old.stats.completedTasks + 1,
                  pendingTasks: completed
                    ? old.stats.pendingTasks + 1
                    : old.stats.pendingTasks - 1,
                },
              }
            : old
      );

      return { previousData };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["dashboard-data", user?.id],
          context.previousData
        );
      }
      toast({
        title: "Error",
        description: "Failed to update task",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Task updated successfully" });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      const response = await fetch(`/api/todos  /${taskId}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete task");
    },
    onMutate: async (taskId) => {
      await queryClient.cancelQueries({
        queryKey: ["dashboard-data", user?.id],
      });
      const previousData = queryClient.getQueryData<DashboardData>([
        "dashboard-data",
        user?.id,
      ]);
      const taskToDelete = dashboardData?.Tasks.find(
        (task) => task.id === taskId
      );

      queryClient.setQueryData<DashboardData>(
        ["dashboard-data", user?.id],
        (old) =>
          old
            ? {
                ...old,
                Tasks: old.Tasks.filter((task) => task.id !== taskId),
                stats: {
                  ...old.stats,
                  totalTasks: old.stats.totalTasks - 1,
                  completedTasks: taskToDelete?.completed
                    ? old.stats.completedTasks - 1
                    : old.stats.completedTasks,
                  pendingTasks: !taskToDelete?.completed
                    ? old.stats.pendingTasks - 1
                    : old.stats.pendingTasks,
                },
              }
            : old
      );

      return { previousData, taskToDelete };
    },
    onError: (err, variables, context) => {
      if (context?.previousData) {
        queryClient.setQueryData(
          ["dashboard-data", user?.id],
          context.previousData
        );
      }
      toast({
        title: "Error",
        description: "Failed to delete task",
        variant: "destructive",
      });
    },
    onSuccess: () => {
      toast({ title: "Success", description: "Task deleted successfully" });
    },
  });

  // Memoized callbacks to prevent unnecessary re-renders
  const handleCreateTask = useCallback(() => {
    if (!newTask.title.trim()) return;
    createTaskMutation.mutate(newTask);
  }, [newTask, createTaskMutation]);

  const handleToggleTask = useCallback(
    (taskId: string, completed: boolean) => {
      toggleTaskMutation.mutate({ taskId, completed });
    },
    [toggleTaskMutation]
  );

  const handleDeleteTask = useCallback(
    (taskId: string) => {
      deleteTaskMutation.mutate(taskId);
    },
    [deleteTaskMutation]
  );

  // Fixed debounced input handlers
  const debouncedSetTitle = useMemo(
    () =>
      debounce((value: string) => {
        setNewTask((prev) => ({ ...prev, title: value }));
      }, 300),
    []
  );

  const debouncedSetDescription = useMemo(
    () =>
      debounce((value: string) => {
        setNewTask((prev) => ({ ...prev, description: value }));
      }, 300),
    []
  );

  // CardNav configuration
  const navItems = [
    {
      label: "Services",
      bgColor: "#0D0716",
      textColor: "#fff",
      links: [
        {
          label: "AI Chat",
          href: "/services/chat",
          ariaLabel: "AI Chat Service",
        },
        {
          label: "Document Analysis",
          href: "/services/analysis",
          ariaLabel: "Document Analysis Service",
        },
        {
          label: "Contract Review",
          href: "/services/contract-review",
          ariaLabel: "Contract Review Service",
        },
      ],
    },
    {
      label: "Dashboard",
      bgColor: "#170D27",
      textColor: "#fff",
      links: [
        {
          label: "Overview",
          href: "/dashboard",
          ariaLabel: "Dashboard Overview",
        },
        {
          label: "Analytics",
          href: "/analytics",
          ariaLabel: "Analytics Dashboard",
        },
      ],
    },
    {
      label: "Resources",
      bgColor: "#271E37",
      textColor: "#fff",
      links: [
        { label: "Help Center", href: "/help", ariaLabel: "Help Center" },
        {
          label: "Legal Guides",
          href: "/resources/guides",
          ariaLabel: "Legal Guides",
        },
        { label: "API Docs", href: "/docs", ariaLabel: "API Documentation" },
      ],
    },
  ];

  // Cleanup debounced functions
  useEffect(() => {
    return () => {
      debouncedSetTitle.cancel();
      debouncedSetDescription.cancel();
    };
  }, [debouncedSetTitle, debouncedSetDescription]);

  // Memoized priority color function
  const getPriorityColor = useCallback((priority: string) => {
    switch (priority) {
      case "URGENT":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300";
      case "HIGH":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300";
      case "MEDIUM":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300";
      case "LOW":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-300";
    }
  }, []);

  // Show notification toasts
  useEffect(() => {
    notifications.forEach((task: Task) => {
      toast({
        title: "Task Reminder",
        description: `Don't forget: ${task.title}`,
        duration: 5000,
      });
    });
  }, [notifications, toast]);

  // Loading state
  if (loading || isLoadingData) {
    return (
      <div className="min-h-screen w-full max-w-7xl mx-auto p-6 md:p-8 lg:p-12 pt-32">
        {/* Loading skeleton - matches your existing loading component */}
        <div className="flex flex-col gap-8">
          <div className="h-7 w-48 bg-muted rounded animate-pulse" />
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {Array(4)
              .fill(0)
              .map((_, i) => (
                <div
                  key={i}
                  className="h-32 bg-muted rounded-xl animate-pulse"
                />
              ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="h-72 bg-muted rounded-xl animate-pulse" />
            <div className="h-72 bg-muted rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="min-h-screen w-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">
            Failed to load dashboard
          </h2>
          <p className="text-muted-foreground mb-4">
            Please try refreshing the page
          </p>
          <Button
            onClick={() =>
              queryClient.invalidateQueries({
                queryKey: ["dashboard-data", user?.id],
              })
            }
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border/40">
        <CardNav
          logo="/logo.svg"
          logoAlt="LegalMind Logo"
          items={navItems}
          baseColor="#fff"
          menuColor="#000"
          buttonBgColor="#111"
          buttonTextColor="#fff"
          ease="power3.out"
        />
      </div>
      <div
        className="min-h-screen w-full max-w-7xl mx-auto p-6 md:p-8 lg:p-12 pt-32"
        style={{ paddingTop: "97px" }}
      >
        <div className="flex flex-col gap-8">
          {/* Header */}
          <motion.div
            layout
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
          >
            <div className="flex-1">
              <motion.h1
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1 }}
                className="text-3xl font-bold tracking-tight text-foreground"
              >
                Welcome back, {firstName}
              </motion.h1>
              <motion.p
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="text-muted-foreground mt-1"
              >
                Here&apos;s what&apos;s happening with your legal work today.
              </motion.p>
            </div>

            <motion.div layout className="flex items-center gap-3">
              {notifications.length > 0 && (
                <Button
                  variant="outline"
                  size="sm"
                  className="relative bg-transparent"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Notifications
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 text-xs">
                    {notifications.length}
                  </Badge>
                </Button>
              )}

              <Dialog
                open={isCreateDialogOpen}
                onOpenChange={setIsCreateDialogOpen}
              >
                <DialogTrigger asChild>
                  <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Task
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Task</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Task title"
                      onChange={(e) => debouncedSetTitle(e.target.value)}
                    />
                    <Textarea
                      placeholder="Description (optional)"
                      onChange={(e) => debouncedSetDescription(e.target.value)}
                    />
                    <Select
                      value={newTask.priority}
                      onValueChange={(value: TaskPriority) =>
                        setNewTask({ ...newTask, priority: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="LOW">Low Priority</SelectItem>
                        <SelectItem value="MEDIUM">Medium Priority</SelectItem>
                        <SelectItem value="HIGH">High Priority</SelectItem>
                        <SelectItem value="URGENT">Urgent</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Due Date</label>
                        <Input
                          type="datetime-local"
                          value={newTask.dueDate}
                          onChange={(e) =>
                            setNewTask({ ...newTask, dueDate: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Reminder</label>
                        <Input
                          type="datetime-local"
                          value={newTask.reminderTime}
                          onChange={(e) =>
                            setNewTask({
                              ...newTask,
                              reminderTime: e.target.value,
                            })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setIsCreateDialogOpen(false)}
                        disabled={createTaskMutation.isPending}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={handleCreateTask}
                        disabled={createTaskMutation.isPending}
                      >
                        {createTaskMutation.isPending
                          ? "Creating..."
                          : "Create Task"}
                      </Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          </motion.div>

          {/* Stats Cards */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <Card className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Tasks</p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats?.totalTasks || 0}
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats?.completedTasks || 0}
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats?.pendingTasks || 0}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Chat Sessions
                    </p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats?.totalChatSessions || 0}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tasks */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <Card className="relative overflow-hidden">
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl font-semibold">
                    Your Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {!dashboardData?.Tasks || dashboardData.Tasks.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No tasks yet. Create your first one!
                    </div>
                  ) : (
                    dashboardData.Tasks.map((task: Task) => (
                      <div
                        key={task.id}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                          task.completed
                            ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                            : "bg-card hover:bg-accent/50"
                        } ${
                          toggleTaskMutation.isPending ||
                          deleteTaskMutation.isPending
                            ? "opacity-50"
                            : ""
                        }`}
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <button
                            onClick={() =>
                              handleToggleTask(task.id, task.completed)
                            }
                            disabled={toggleTaskMutation.isPending}
                            className={`w-4 h-4 rounded-full border-2 mt-0.5 transition-colors disabled:cursor-not-allowed ${
                              task.completed
                                ? "bg-green-600 border-green-600"
                                : "border-muted-foreground hover:border-primary"
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <h4
                              className={`font-medium text-sm ${
                                task.completed
                                  ? "line-through text-muted-foreground"
                                  : "text-card-foreground"
                              }`}
                            >
                              {task.title}
                            </h4>
                            {task.description && (
                              <p className="text-xs text-muted-foreground mt-1 truncate">
                                {task.description}
                              </p>
                            )}
                            {task.dueDate && (
                              <div className="flex items-center gap-1 mt-1">
                                <Calendar className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {new Date(task.dueDate).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={getPriorityColor(task.priority)}
                            variant="secondary"
                          >
                            {task.priority}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDeleteTask(task.id)}
                            disabled={deleteTaskMutation.isPending}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive disabled:cursor-not-allowed"
                          >
                            <Trash2 className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    ))
                  )}
                </CardContent>
              </Card>
            </motion.div>

            {/* Recent Chat Sessions */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-6"
            >
              <Card className="relative overflow-hidden">
                <CardHeader>
                  <CardTitle className="text-lg font-semibold">
                    Recent Chats
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {!dashboardData?.chatSessions ||
                  dashboardData.chatSessions.length === 0 ? (
                    <div className="text-center py-4 text-muted-foreground text-sm">
                      No chat sessions yet
                    </div>
                  ) : (
                    dashboardData.chatSessions.map((session: ChatSession) => (
                      <Link
                        key={session.id}
                        href={`/services/chat/${session.id}`}
                        className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-card-foreground truncate">
                            {session.title || "Untitled Chat"}
                          </h4>
                          {session.messages[0] && (
                            <p className="text-xs text-muted-foreground truncate mt-1">
                              {session.messages[0].content}
                            </p>
                          )}
                          <div className="text-xs text-muted-foreground mt-1">
                            {new Date(session.updatedAt).toLocaleDateString()}
                          </div>
                        </div>
                      </Link>
                    ))
                  )}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
