// src/app/(protected)/dashboard/page.tsx (Updated)
"use client";

import { useMemo, useState, useEffect } from "react";
import { useSession } from "@/contexts/session-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  Edit,
  Clock,
  AlertTriangle,
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

interface Todo {
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
  todos: Todo[];
  chatSessions: ChatSession[];
  stats: {
    totalTodos: number;
    completedTodos: number;
    pendingTodos: number;
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
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [notifications, setNotifications] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState({
    title: "",
    description: "",
    priority: "MEDIUM" as const,
    dueDate: "",
    reminderTime: "",
  });

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

  const firstName = useMemo(
    () => user?.name?.split(" ")[0] || "Counsel",
    [user]
  );

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

  const fetchDashboardData = async () => {
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
    }
  };

  const checkNotifications = async () => {
    try {
      const response = await fetch("/api/notifications");
      if (response.ok) {
        const data = await response.json();
        if (data.notifications.length > 0) {
          setNotifications(data.notifications);
          data.notifications.forEach((todo: Todo) => {
            toast({
              title: "📋 Task Reminder",
              description: `Don't forget: ${todo.title}`,
              duration: 5000,
            });
          });
        }
      }
    } catch (error) {
      console.error("Error checking notifications:", error);
    }
  };

  const createTodo = async () => {
    if (!newTodo.title.trim()) return;

    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: newTodo.title,
          description: newTodo.description,
          priority: newTodo.priority,
          dueDate: newTodo.dueDate || null,
          reminderTime: newTodo.reminderTime || null,
        }),
      });

      if (response.ok) {
        setNewTodo({
          title: "",
          description: "",
          priority: "MEDIUM",
          dueDate: "",
          reminderTime: "",
        });
        setIsCreateDialogOpen(false);
        fetchDashboardData();
        toast({
          title: "Success",
          description: "Todo created successfully",
        });
      }
    } catch (error) {
      console.error("Error creating todo:", error);
      toast({
        title: "Error",
        description: "Failed to create todo",
        variant: "destructive",
      });
    }
  };

  const toggleTodoComplete = async (todoId: string, completed: boolean) => {
    try {
      const response = await fetch(`/api/todos/${todoId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: !completed }),
      });

      if (response.ok) {
        fetchDashboardData();
        toast({
          title: "Success",
          description: completed
            ? "Todo marked as incomplete"
            : "Todo completed!",
        });
      }
    } catch (error) {
      console.error("Error updating todo:", error);
      toast({
        title: "Error",
        description: "Failed to update todo",
        variant: "destructive",
      });
    }
  };

  const deleteTodo = async (todoId: string) => {
    try {
      const response = await fetch(`/api/todos/${todoId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        fetchDashboardData();
        toast({
          title: "Success",
          description: "Todo deleted successfully",
        });
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
      toast({
        title: "Error",
        description: "Failed to delete todo",
        variant: "destructive",
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

  if (loading || !dashboardData) {
    return (
      <>
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
      />

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
                <Button variant="outline" size="sm" className="relative">
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
                    Add Todo
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Create New Todo</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <Input
                      placeholder="Todo title"
                      value={newTodo.title}
                      onChange={(e) =>
                        setNewTodo({ ...newTodo, title: e.target.value })
                      }
                    />
                    <Textarea
                      placeholder="Description (optional)"
                      value={newTodo.description}
                      onChange={(e) =>
                        setNewTodo({ ...newTodo, description: e.target.value })
                      }
                    />
                    <Select
                      value={newTodo.priority}
                      onValueChange={(value: never) =>
                        setNewTodo({ ...newTodo, priority: value })
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
                          value={newTodo.dueDate}
                          onChange={(e) =>
                            setNewTodo({ ...newTodo, dueDate: e.target.value })
                          }
                        />
                      </div>
                      <div>
                        <label className="text-sm font-medium">Reminder</label>
                        <Input
                          type="datetime-local"
                          value={newTodo.reminderTime}
                          onChange={(e) =>
                            setNewTodo({
                              ...newTodo,
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
                      >
                        Cancel
                      </Button>
                      <Button onClick={createTodo}>Create Todo</Button>
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
                    <p className="text-sm text-muted-foreground">Total Todos</p>
                    <p className="text-2xl font-bold">
                      {dashboardData.stats.totalTodos}
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
                      {dashboardData.stats.completedTodos}
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
                      {dashboardData.stats.pendingTodos}
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
                      {dashboardData.stats.totalChatSessions}
                    </p>
                  </div>
                  <Calendar className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Todos */}
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
                    Your Todos
                  </CardTitle>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="space-y-3">
                  {dashboardData.todos.length === 0 ? (
                    <div className="text-center py-8 text-muted-foreground">
                      No todos yet. Create your first one!
                    </div>
                  ) : (
                    dashboardData.todos.map((todo) => (
                      <div
                        key={todo.id}
                        className={`flex items-center justify-between p-3 rounded-lg border transition-colors ${
                          todo.completed
                            ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                            : "bg-card hover:bg-accent/50"
                        }`}
                      >
                        <div className="flex items-start gap-3 flex-1">
                          <button
                            onClick={() =>
                              toggleTodoComplete(todo.id, todo.completed)
                            }
                            className={`w-4 h-4 rounded-full border-2 mt-0.5 transition-colors ${
                              todo.completed
                                ? "bg-green-600 border-green-600"
                                : "border-muted-foreground hover:border-primary"
                            }`}
                          />
                          <div className="flex-1 min-w-0">
                            <h4
                              className={`font-medium text-sm ${
                                todo.completed
                                  ? "line-through text-muted-foreground"
                                  : "text-card-foreground"
                              }`}
                            >
                              {todo.title}
                            </h4>
                            {todo.description && (
                              <p className="text-xs text-muted-foreground mt-1 truncate">
                                {todo.description}
                              </p>
                            )}
                            {todo.dueDate && (
                              <div className="flex items-center gap-1 mt-1">
                                <Calendar className="w-3 h-3 text-muted-foreground" />
                                <span className="text-xs text-muted-foreground">
                                  {new Date(todo.dueDate).toLocaleDateString()}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge
                            className={getPriorityColor(todo.priority)}
                            variant="secondary"
                          >
                            {todo.priority}
                          </Badge>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => deleteTodo(todo.id)}
                            className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
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
                  {dashboardData.chatSessions.length === 0 ? (
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
