"use client";

import { useEffect, useMemo, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  MoreHorizontal,
  CheckCircle2,
  MessageSquareText,
  FileText,
  BookOpen,
  Sparkles,
  Wand2,
  TrendingUp,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface User {
  name: string;
  email: string;
  image: string | null;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);
  const [loadingSession, setLoadingSession] = useState(true);

  useEffect(() => {
    const getUser = async () => {
      setLoadingSession(true);
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          setUser({
            name: session?.data.user.name || "User",
            email: session.data.user.email || "",
            image: session.data.user.image || null,
          });
        } else {
          setUser(null);
        }
      } catch (_) {
        setUser(null);
      } finally {
        setLoadingSession(false);
      }
    };
    getUser();
  }, []);

  const projects = useMemo(
    () => [
      {
        id: 1,
        title: "Contract Analysis",
        tasks: 10,
        progress: 96,
        members: 7,
        avatars: [
          "/diverse-person-portrait.png",
          "/diverse-group-conversation.png",
          "/diverse-group-meeting.png",
        ],
      },
      {
        id: 2,
        title: "Compliance Review",
        tasks: 12,
        progress: 40,
        members: 9,
        avatars: [
          "/diverse-group-meeting.png",
          "/diverse-group-five.png",
          "/diverse-group-meeting.png",
        ],
      },
      {
        id: 3,
        title: "Case Research",
        tasks: 22,
        progress: 73,
        members: 3,
        avatars: ["/diverse-group-meeting.png", "/diverse-group-meeting.png"],
      },
    ],
    []
  );

  const todayTasks = [
    {
      id: 1,
      title: "AI Chat Session",
      subtitle: "Brief on new client matter",
      completed: false,
    },
    {
      id: 2,
      title: "Draft Redlines",
      subtitle: "MSA limitation of liability",
      completed: false,
    },
    {
      id: 3,
      title: "Legal Research",
      subtitle: "Citations for arbitration clause",
      completed: true,
    },
  ];

  const calendarEvents = [
    {
      date: "Aug 24, 2025",
      time: "10:00",
      title: "Document Review",
      subtitle: "Vendor MSA",
      color: "bg-teal-100 text-teal-800 dark:bg-teal-900/30 dark:text-teal-300",
    },
    {
      date: "Aug 24, 2025",
      time: "13:20",
      title: "Draft Session",
      subtitle: "Comms Addendum",
      color:
        "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-300",
    },
    {
      date: "Aug 25, 2025",
      time: "10:00",
      title: "Research Task",
      subtitle: "Arbitration Analysis",
      color: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300",
    },
  ];

  const firstName = useMemo(
    () => user?.name?.split(" ")[0] || "Counsel",
    [user]
  );

  if (loadingSession) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-8"
      >
        <div className="flex items-center justify-between">
          <div className="h-8 w-48 bg-ds-skeleton rounded animate-pulse" />
          <div className="flex items-center gap-3">
            <div className="h-10 w-36 bg-ds-skeleton rounded animate-pulse" />
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="h-44 bg-ds-skeleton rounded-xl animate-pulse" />
          <div className="h-44 bg-ds-skeleton rounded-xl animate-pulse" />
          <div className="h-44 bg-ds-skeleton rounded-xl animate-pulse" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-72 bg-ds-skeleton rounded-xl animate-pulse" />
          <div className="h-72 bg-ds-skeleton rounded-xl animate-pulse" />
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="space-y-8"
    >
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.1 }}
        className="flex flex-col sm:flex-row sm:items-center justify-between gap-4"
      >
        <div>
          <h1 className="text-3xl font-bold text-ds-gold">
            Welcome back, {firstName}
          </h1>
          <p className="text-ds-muted mt-1">
            Here's a quick snapshot of your legal workspace.
          </p>
        </div>
        <motion.div
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center gap-3"
        >
          <Link href="/services/chat">
            <Button className="bg-ds-gold hover:bg-ds-gold/90 text-ds-surface shadow-lg hover-glow transition-all duration-200">
              <Sparkles className="w-4 h-4 mr-2" />
              Start AI Session
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link href="/services/chat" className="group">
            <Card className="hover-lift transition-all duration-200 border border-ds-border bg-ds-surface hover:bg-ds-teal/5">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <div className="text-sm text-ds-teal font-medium mb-1">
                    Quick Action
                  </div>
                  <div className="font-semibold text-ds-gold">Open AI Chat</div>
                </div>
                <div className="rounded-xl p-3 bg-ds-teal text-ds-surface shadow-md">
                  <MessageSquareText className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link href="/services/contract-review" className="group">
            <Card className="hover-lift transition-all duration-200 border border-ds-border bg-ds-surface hover:bg-ds-orange/5">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <div className="text-sm text-ds-orange font-medium mb-1">
                    Quick Action
                  </div>
                  <div className="font-semibold text-ds-gold">
                    Review Contract
                  </div>
                </div>
                <div className="rounded-xl p-3 bg-ds-orange text-ds-surface shadow-md">
                  <FileText className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>

        <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
          <Link href="/services/research" className="group">
            <Card className="hover-lift transition-all duration-200 border border-ds-border bg-ds-surface hover:bg-ds-teal/5">
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <div className="text-sm text-ds-teal font-medium mb-1">
                    Quick Action
                  </div>
                  <div className="font-semibold text-ds-gold">
                    Legal Research
                  </div>
                </div>
                <div className="rounded-xl p-3 bg-ds-teal text-ds-surface shadow-md">
                  <BookOpen className="w-6 h-6" />
                </div>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
            whileHover={{ scale: 1.02, y: -4 }}
          >
            <Card
              className={`${
                index === 0
                  ? "bg-ds-teal"
                  : index === 1
                  ? "bg-ds-orange"
                  : "bg-ds-accent"
              } text-ds-surface border-0 relative overflow-hidden shadow-lg hover-lift transition-all duration-200`}
            >
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex -space-x-2">
                    {project.avatars.map((avatar, avatarIndex) => (
                      <Avatar
                        key={avatarIndex}
                        className="w-8 h-8 border-2 border-ds-surface shadow-sm"
                      >
                        <AvatarImage src={avatar || "/placeholder.svg"} />
                        <AvatarFallback className="bg-ds-surface/20 text-ds-surface">
                          U
                        </AvatarFallback>
                      </Avatar>
                    ))}
                    <div className="w-8 h-8 bg-ds-surface/20 rounded-full flex items-center justify-center text-xs font-medium backdrop-blur-sm">
                      +{project.avatars.length}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-ds-surface hover:bg-ds-surface/20"
                  >
                    <MoreHorizontal className="w-5 h-5" />
                  </Button>
                </div>
                <h3 className="text-lg font-semibold mb-4 text-ds-gold">
                  {project.title}
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm opacity-90">
                    <span>{project.avatars.length} tasks</span>
                    <span>
                      {Math.floor((project.avatars.length / 30) * 100)}%
                    </span>
                  </div>
                  <Progress
                    value={Math.floor((project.avatars.length / 30) * 100)}
                    className="h-2 bg-ds-surface/20"
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="grid grid-cols-1 lg:grid-cols-3 gap-8"
      >
        <div className="lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-ds-gold">
              Today's Tasks
            </h2>
            <Badge
              variant="secondary"
              className="bg-ds-teal/10 text-ds-teal border-ds-teal/20"
            >
              {todayTasks.filter((t) => !t.completed).length} pending
            </Badge>
          </div>
          <div className="space-y-4">
            {todayTasks.map((task, index) => (
              <motion.div
                key={task.id}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                whileHover={{ x: 4 }}
              >
                <Card
                  className={`border-l-4 ${
                    task.id === 1
                      ? "border-l-ds-orange bg-ds-orange/5"
                      : task.id === 2
                      ? "border-l-ds-teal bg-ds-teal/5"
                      : "border-l-ds-accent bg-ds-accent/5"
                  } border-r-0 border-t border-b border-ds-border hover-lift transition-all duration-200`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-4">
                      <div className="flex-1">
                        <h4 className="font-medium text-ds-gold">
                          {task.title}
                        </h4>
                        <p className="text-sm text-ds-muted mt-1">
                          {task.subtitle}
                        </p>
                      </div>
                      {task.completed ? (
                        <CheckCircle2 className="w-6 h-6 text-ds-teal" />
                      ) : (
                        <div className="w-6 h-6 border-2 border-ds-border rounded-full hover:border-ds-gold transition-colors cursor-pointer"></div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="border border-ds-border shadow-lg bg-ds-surface">
              <CardHeader>
                <CardTitle className="text-lg font-semibold text-ds-gold">
                  Workspace Stats
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-ds-teal">28h</div>
                    <div className="text-sm text-ds-muted">Tracked</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-ds-orange">18</div>
                    <div className="text-sm text-ds-muted">Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="w-8 h-8 bg-ds-gold rounded-full mx-auto mb-1 flex items-center justify-center">
                      <TrendingUp className="w-4 h-4 text-ds-surface" />
                    </div>
                    <div className="text-sm text-ds-muted">Growth</div>
                  </div>
                </div>

                <div className="border-t border-ds-border pt-6">
                  <div className="flex items-start gap-4">
                    <div className="w-16 h-16 bg-ds-gold rounded-xl flex items-center justify-center shadow-lg">
                      <Wand2 className="w-8 h-8 text-ds-surface" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-lg font-bold text-ds-gold">
                          Pro Plan
                        </span>
                        <Badge className="bg-ds-gold text-ds-surface">
                          $9.99/mo
                        </Badge>
                      </div>
                      <div className="font-medium text-ds-ink mb-1">
                        Unlock Advanced Features
                      </div>
                      <div className="text-sm text-ds-muted">
                        Advanced AI agents, larger documents, and priority
                        support.
                      </div>
                    </div>
                  </div>
                  <Link href="/pricing">
                    <Button className="w-full mt-4 bg-ds-gold hover:bg-ds-gold/90 text-ds-surface hover-glow">
                      Upgrade Now
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="border border-ds-border shadow-lg bg-ds-surface">
              <CardHeader>
                <CardTitle className="text-lg font-semibold flex items-center gap-2 text-ds-gold">
                  <Calendar className="w-5 h-5" />
                  Upcoming Events
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {Object.entries(
                    calendarEvents.reduce((acc, event) => {
                      if (!acc[event.date]) acc[event.date] = [];
                      acc[event.date].push(event);
                      return acc;
                    }, {} as Record<string, typeof calendarEvents>)
                  ).map(([date, events]) => (
                    <div key={date}>
                      <h3 className="font-medium text-ds-gold mb-3">{date}</h3>
                      <div className="space-y-3">
                        {events.map((event, index) => (
                          <motion.div
                            key={index}
                            whileHover={{ x: 4 }}
                            className="flex gap-3 p-3 rounded-lg bg-ds-surface-soft/30 hover-lift transition-all"
                          >
                            <div className="text-sm font-medium text-ds-muted w-12">
                              {event.time}
                            </div>
                            <div className="flex-1">
                              <Badge
                                variant="secondary"
                                className={`${
                                  index % 3 === 0
                                    ? "bg-ds-teal/10 text-ds-teal"
                                    : index % 3 === 1
                                    ? "bg-ds-orange/10 text-ds-orange"
                                    : "bg-ds-accent/10 text-ds-ink"
                                } text-xs mb-1 border-0`}
                              >
                                {event.title}
                              </Badge>
                              <div className="text-sm text-ds-muted">
                                {event.subtitle}
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
  );
}
