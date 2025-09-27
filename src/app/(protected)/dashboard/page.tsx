// src/app/(protected)/dashboard/page.tsx (Updated)
"use client";

import { useMemo, useState, useEffect, useCallback } from "react";
import { useSession } from "@/contexts/session-context";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GlowingEffect } from "@/components/ui/glowing-effect";
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
  MoreHorizontal,
  CheckCircle2,
  Calendar,
  Plus,
  Bell,
  Trash2,
  Clock,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import CardNav from "@/components/react-bits/CardNav";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { navItems } from "@/lib/items";

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
  messages: Array<{
    content: string;
  }>;
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

export default function DashboardPage() {
  const { user, loading } = useSession();
  const { toast } = useToast();

  const [dashboardData, setDashboardData] = useState<DashboardData | null>(
    null
  );
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [isCreatingTask, setIsCreatingTask] = useState(false);
  const [loadingTasks, setLoadingTasks] = useState<Set<string>>(new Set());
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [notifications, setNotifications] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "MEDIUM" as const,
    dueDate: "",
    reminderTime: "",
  });

  // CardNav configuration

  const firstName = useMemo(
    () => user?.name?.split(" ")[0] || "Counsel",
    [user]
  );

  const fetchDashboardData = useCallback(async () => {
    if (!user) return;

    setIsLoadingData(true);
    try {
      const response = await fetch("/api/dashboard");
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data);
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      toast({
        title: "Error",
        description: "Failed to fetch dashboard data",
        variant: "destructive",
      });
    } finally {
      setIsLoadingData(false);
    }
  }, [user, toast]);

  const checkNotifications = useCallback(async () => {
    if (!user) return;

    try {
      const response = await fetch("/api/notifications");
      if (response.ok) {
        const data = await response.json();
        if (data.notifications.length > 0) {
          setNotifications(data.notifications);
          data.notifications.forEach((Task: Task) => {
            toast({
              title: "📋 Task Reminder",
              description: `Don't forget: ${Task.title}`,
              duration: 5000,
            });
          });
        }
      }
    } catch (error) {
      console.error("Error checking notifications:", error);
    }
  }, [user, toast]);

  // Fetch dashboard data
  useEffect(() => {
    if (user) {
      fetchDashboardData();
      checkNotifications();

      // Set up periodic notification checks
      const notificationInterval = setInterval(checkNotifications, 60000); // Check every minute

      return () => clearInterval(notificationInterval);
    }
  }, [user]);

  const createTask = async () => {
    if (!newTask.title.trim() || isCreatingTask) return;

    setIsCreatingTask(true);

    // Optimistic update
    const optimisticTask: Task = {
      id: `temp-${Date.now()}`,
      title: newTask.title,
      description: newTask.description,
      completed: false,
      priority: newTask.priority,
      dueDate: newTask.dueDate ? new Date(newTask.dueDate) : undefined,
      reminderTime: newTask.reminderTime
        ? new Date(newTask.reminderTime)
        : undefined,
      createdAt: new Date(),
    };

    if (dashboardData) {
      setDashboardData((prev) =>
        prev
          ? {
              ...prev,
              Tasks: [optimisticTask, ...prev.Tasks],
              stats: {
                ...prev.stats,
                totalTasks: prev.stats.totalTasks + 1,
                pendingTasks: prev.stats.pendingTasks + 1,
              },
            }
          : null
      );
    }

    try {
      const response = await fetch("/api/Tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTask.title,
          description: newTask.description,
          priority: newTask.priority,
          dueDate: newTask.dueDate || null,
          reminderTime: newTask.reminderTime || null,
        }),
      });

      if (response.ok) {
        setNewTask({
          title: "",
          description: "",
          priority: "MEDIUM",
          dueDate: "",
          reminderTime: "",
        });
        setIsCreateDialogOpen(false);
        // Refresh data to get the real Task with server-generated ID
        fetchDashboardData();
        toast({
          title: "Success",
          description: "Task created successfully",
        });
      } else {
        // Revert optimistic update on error
        if (dashboardData) {
          setDashboardData((prev) =>
            prev
              ? {
                  ...prev,
                  Tasks: prev.Tasks.filter(
                    (Task) => Task.id !== optimisticTask.id
                  ),
                  stats: {
                    ...prev.stats,
                    totalTasks: prev.stats.totalTasks - 1,
                    pendingTasks: prev.stats.pendingTasks - 1,
                  },
                }
              : null
          );
        }
        throw new Error("Failed to create Task");
      }
    } catch (error) {
      console.error("Error creating Task:", error);
      toast({
        title: "Error",
        description: "Failed to create Task",
        variant: "destructive",
      });
    } finally {
      setIsCreatingTask(false);
    }
  };

  const toggleTaskComplete = async (TaskId: string, completed: boolean) => {
    if (loadingTasks.has(TaskId)) return;

    setLoadingTasks((prev) => new Set(prev).add(TaskId));

    // Optimistic update
    if (dashboardData) {
      setDashboardData((prev) =>
        prev
          ? {
              ...prev,
              Tasks: prev.Tasks.map((Task) =>
                Task.id === TaskId ? { ...Task, completed: !completed } : Task
              ),
              stats: {
                ...prev.stats,
                completedTasks: completed
                  ? prev.stats.completedTasks - 1
                  : prev.stats.completedTasks + 1,
                pendingTasks: completed
                  ? prev.stats.pendingTasks + 1
                  : prev.stats.pendingTasks - 1,
              },
            }
          : null
      );
    }

    try {
      const response = await fetch(`/api/Tasks/${TaskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: completed
            ? "Task marked as incomplete"
            : "Task completed!",
        });
      } else {
        // Revert optimistic update on error
        if (dashboardData) {
          setDashboardData((prev) =>
            prev
              ? {
                  ...prev,
                  Tasks: prev.Tasks.map((Task) =>
                    Task.id === TaskId ? { ...Task, completed } : Task
                  ),
                  stats: {
                    ...prev.stats,
                    completedTasks: completed
                      ? prev.stats.completedTasks + 1
                      : prev.stats.completedTasks - 1,
                    pendingTasks: completed
                      ? prev.stats.pendingTasks - 1
                      : prev.stats.pendingTasks + 1,
                  },
                }
              : null
          );
        }
        throw new Error("Failed to update Task");
      }
    } catch (error) {
      console.error("Error updating Task:", error);
      toast({
        title: "Error",
        description: "Failed to update Task",
        variant: "destructive",
      });
    } finally {
      setLoadingTasks((prev) => {
        const newSet = new Set(prev);
        newSet.delete(TaskId);
        return newSet;
      });
    }
  };

  const deleteTask = async (TaskId: string) => {
    if (loadingTasks.has(TaskId)) return;

    setLoadingTasks((prev) => new Set(prev).add(TaskId));

    // Store the Task for potential rollback
    const TaskToDelete = dashboardData?.Tasks.find(
      (Task) => Task.id === TaskId
    );

    // Optimistic update
    if (dashboardData && TaskToDelete) {
      setDashboardData((prev) =>
        prev
          ? {
              ...prev,
              Tasks: prev.Tasks.filter((Task) => Task.id !== TaskId),
              stats: {
                ...prev.stats,
                totalTasks: prev.stats.totalTasks - 1,
                completedTasks: TaskToDelete.completed
                  ? prev.stats.completedTasks - 1
                  : prev.stats.completedTasks,
                pendingTasks: !TaskToDelete.completed
                  ? prev.stats.pendingTasks - 1
                  : prev.stats.pendingTasks,
              },
            }
          : null
      );
    }

    try {
      const response = await fetch(`/api/Tasks/${TaskId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        toast({
          title: "Success",
          description: "Task deleted successfully",
        });
      } else {
        // Revert optimistic update on error
        if (dashboardData && TaskToDelete) {
          setDashboardData((prev) =>
            prev
              ? {
                  ...prev,
                  Tasks: [...prev.Tasks, TaskToDelete].sort(
                    (a, b) =>
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                  ),
                  stats: {
                    ...prev.stats,
                    totalTasks: prev.stats.totalTasks + 1,
                    completedTasks: TaskToDelete.completed
                      ? prev.stats.completedTasks + 1
                      : prev.stats.completedTasks,
                    pendingTasks: !TaskToDelete.completed
                      ? prev.stats.pendingTasks + 1
                      : prev.stats.pendingTasks,
                  },
                }
              : null
          );
        }
        throw new Error("Failed to delete Task");
      }
    } catch (error) {
      console.error("Error deleting Task:", error);
      toast({
        title: "Error",
        description: "Failed to delete Task",
        variant: "destructive",
      });
    } finally {
      setLoadingTasks((prev) => {
        const newSet = new Set(prev);
        newSet.delete(TaskId);
        return newSet;
      });
    }
  };

  const getPriorityColor = (priority: string) => {
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
  };

  if (loading || isLoadingData) {
    return (
      <>
        <div className="fixed top-0 left-0 right-0 z-50">
          {/* <CardNav
            logo="/logo.svg"
            logoAlt="LegalMind Logo"
            items={navItems}
            baseColor="#fff"
            menuColor="#000"
            buttonBgColor="#111"
            buttonTextColor="#fff"
            ease="power3.out"
            className="tab-disabled fixed"
          /> */}
        </div>
        <div
          className="min-h-screen w-full max-w-7xl mx-auto p-6 md:p-8 lg:p-12 pt-32"
          style={{ paddingTop: "92px" }}
        >
          <div className="flex flex-col gap-6">
            <div className="h-7 w-48 bg-muted rounded animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[...Array(4)].map((_, i) => (
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
      </>
    );
  }

  return (
    <>
      <div className="fixed top-0 left-0 right-0 z-50">
        <CardNav
          logo="/logo.svg"
          logoAlt="LegalMind Logo"
          items={navItems}
          baseColor="#fff"
          menuColor="#000"
          buttonBgColor="#111"
          buttonTextColor="#fff"
          ease="power3.out"
          user={user!}
          className="fixed top-0 left-0"
          
        />
      </div>

      <div
        className="min-h-screen w-full max-w-7xl mx-auto p-6 md:p-8 lg:p-12 pt-32"
        style={{ paddingTop: "92px" }}
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
                      value={newTask.title}
                      onChange={(e) =>
                        setNewTask({ ...newTask, title: e.target.value })
                      }
                    />
                    <Textarea
                      placeholder="Description (optional)"
                      value={newTask.description}
                      onChange={(e) =>
                        setNewTask({ ...newTask, description: e.target.value })
                      }
                    />
                    <Select
                      value={newTask.priority}
                      onValueChange={(value: never) =>
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
                        disabled={isCreatingTask}
                      >
                        Cancel
                      </Button>
                      <Button onClick={createTask} disabled={isCreatingTask}>
                        {isCreatingTask ? "Creating..." : "Create Task"}
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
              <GlowingEffect spread={40} glow={true} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Tasks</p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats.totalTasks || 0}
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <GlowingEffect spread={40} glow={true} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats.completedTasks || 0}
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <GlowingEffect spread={40} glow={true} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats.pendingTasks || 0}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <GlowingEffect spread={40} glow={true} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Chat Sessions
                    </p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats.totalChatSessions || 0}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <Card className="relative overflow-hidden">
              <GlowingEffect spread={40} glow={true} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Tasks</p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats.totalTasks || 0}
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <GlowingEffect spread={40} glow={true} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats.completedTasks || 0}
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <GlowingEffect spread={40} glow={true} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats.pendingTasks || 0}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <GlowingEffect spread={40} glow={true} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Chat Sessions
                    </p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats.totalChatSessions || 0}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <Card className="relative overflow-hidden">
              <GlowingEffect spread={40} glow={true} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Tasks</p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats.totalTasks || 0}
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <GlowingEffect spread={40} glow={true} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats.completedTasks || 0}
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <GlowingEffect spread={40} glow={true} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats.pendingTasks || 0}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <GlowingEffect spread={40} glow={true} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Chat Sessions
                    </p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats.totalChatSessions || 0}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <Card className="relative overflow-hidden">
              <GlowingEffect spread={40} glow={true} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Tasks</p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats.totalTasks || 0}
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <GlowingEffect spread={40} glow={true} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats.completedTasks || 0}
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <GlowingEffect spread={40} glow={true} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats.pendingTasks || 0}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <GlowingEffect spread={40} glow={true} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Chat Sessions
                    </p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats.totalChatSessions || 0}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <Card className="relative overflow-hidden">
              <GlowingEffect spread={40} glow={true} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Tasks</p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats.totalTasks || 0}
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <GlowingEffect spread={40} glow={true} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats.completedTasks || 0}
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <GlowingEffect spread={40} glow={true} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats.pendingTasks || 0}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <GlowingEffect spread={40} glow={true} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Chat Sessions
                    </p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats.totalChatSessions || 0}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="grid grid-cols-1 md:grid-cols-4 gap-6"
          >
            <Card className="relative overflow-hidden">
              <GlowingEffect spread={40} glow={true} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Total Tasks</p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats.totalTasks || 0}
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <GlowingEffect spread={40} glow={true} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Completed</p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats.completedTasks || 0}
                    </p>
                  </div>
                  <CheckCircle2 className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <GlowingEffect spread={40} glow={true} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">Pending</p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats.pendingTasks || 0}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-orange-600" />
                </div>
              </CardContent>
            </Card>

            <Card className="relative overflow-hidden">
              <GlowingEffect spread={40} glow={true} />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Chat Sessions
                    </p>
                    <p className="text-2xl font-bold">
                      {dashboardData?.stats.totalChatSessions || 0}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Tasks */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <Card className="relative overflow-hidden">
                <GlowingEffect spread={60} glow={true} />
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl font-semibold">
                    Your Tasks
                  </CardTitle>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {!dashboardData?.Tasks || dashboardData.Tasks.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No Tasks yet. Create your first one!
                    </div>
                  ) : (
                    dashboardData.Tasks.map((Task) => (
                      <div
                        key={Task.id}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                          Task.completed
                            ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                            : "bg-card hover:bg-accent/50"
                        } ${loadingTasks.has(Task.id) ? "opacity-50" : ""}`}
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <button
                            onClick={() =>
                              toggleTaskComplete(Task.id, Task.completed)
                            }
                            disabled={loadingTasks.has(Task.id)}
                            className={`w-4 h-4 rounded-full border-2 mt-0.5 transition-colors disabled:cursor-not-allowed ${
                              Task.completed
                                ? "bg-green-600 border-green-600"
                                : "border-muted-foreground hover:border-primary"
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <h4
                              className={`font-medium text-sm ${
                                Task.completed
                                  ? "line-through text-muted-foreground"
                                  : "text-card-foreground"
                              }`}
                            >
                              {Task.title}
                            </h4>
                            {Task.description && (
                              <p className="text-xs text-muted-foreground mt-1 truncate">
                                {Task.description}
                              </p>
                            )}
                            {Task.dueDate && (
                              <div className="flex items-center gap-1 mt-1">
                                <Calendar className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {new Date(Task.dueDate).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={getPriorityColor(Task.priority)}
                            variant="secondary"
                          >
                            {Task.priority}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteTask(Task.id)}
                            disabled={loadingTasks.has(Task.id)}
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
                <GlowingEffect spread={40} glow={true} />
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
                    dashboardData.chatSessions.map((session) => (
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
