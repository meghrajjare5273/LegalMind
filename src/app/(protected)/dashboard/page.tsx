"use client";

import { useMemo } from "react";
import { useSession } from "@/contexts/session-context";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { MoreHorizontal, CheckCircle2, Sparkles, Calendar } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import CardNav from "@/components/react-bits/CardNav";

export default function DashboardPage() {
  const { user, loading } = useSession();

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
          href: "/services/review",
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
          label: "Projects",
          href: "/dashboard/projects",
          ariaLabel: "Projects Dashboard",
        },
        {
          label: "Analytics",
          href: "/dashboard/analytics",
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

  const projects = useMemo(
    () => [
      {
        id: 1,
        title: "Contract Analysis",
        tasks: 8,
        progress: 65,
        members: 4,
        avatars: [
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

  if (loading) {
    return (
      <>
        <CardNav
          logo="/logo.svg"
          logoAlt="LegalMind Logo"
          items={navItems}
          className="fixed top-0 left-0 right-0 z-50"
          baseColor="#fff"
          menuColor="#000"
          buttonBgColor="#111"
          buttonTextColor="#fff"
          ease="power3.out"
        />
        <div
          className="min-h-screen w-full max-w-7xl top-56 mx-auto p-6 md:p-8 lg:p-12 pt-32"
          style={{ paddingTop: "92px" }}
        >
          <div className="flex flex-col gap-6">
            <div className="h-7 w-48 bg-muted rounded animate-pulse" />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="h-40 bg-muted rounded-xl animate-pulse" />
              <div className="h-40 bg-muted rounded-xl animate-pulse" />
              <div className="h-40 bg-muted rounded-xl animate-pulse" />
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
      {/* {/* Fixed Navigation */}
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

      {/* Main Content with top padding to account for fixed navbar */}
      <div
        className="min-h-screen w-full max-w-7xl mx-auto p-6  md:p-8 lg:p-12 pt-32"
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
            <div className="flex-1 top-56">
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
            <motion.div
              layout
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3"
            >
              <Link href="/services/chat">
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg transition-all duration-200">
                  <Sparkles className="w-4 h-4 mr-2" />
                  Start AI Session
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Projects Overview */}
            <motion.div
              layout
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="lg:col-span-2"
            >
              <Card className="relative overflow-hidden">
                <GlowingEffect
                  spread={60}
                  glow={true}
                  disabled={false}
                  proximity={80}
                  inactiveZone={0.01}
                  borderWidth={1}
                />
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle className="text-xl font-semibold">
                    Active Projects
                  </CardTitle>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="w-4 h-4" />
                  </Button>
                </CardHeader>
                <CardContent className="flex flex-col gap-4">
                  {projects.map((project, index) => (
                    <motion.div
                      layout
                      key={project.id}
                      initial={{ x: -20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="flex items-center justify-between p-4 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-medium text-card-foreground">
                            {project.title}
                          </h3>
                          <Badge variant="secondary" className="text-xs">
                            {project.tasks} tasks
                          </Badge>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="flex-1">
                            <Progress
                              value={project.progress}
                              className="h-2"
                            />
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {project.progress}%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 ml-4">
                        <div className="flex -space-x-2">
                          {project.avatars.slice(0, 3).map((avatar, i) => (
                            <Avatar
                              key={i}
                              className="w-6 h-6 border-2 border-background"
                            >
                              <AvatarImage src={avatar || "/placeholder.svg"} />
                              <AvatarFallback className="text-xs">
                                U
                              </AvatarFallback>
                            </Avatar>
                          ))}
                        </div>
                        {project.members > 3 && (
                          <span className="text-xs text-muted-foreground">
                            +{project.members - 3}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>

            {/* Today's Tasks & Calendar */}
            <motion.div
              layout
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex flex-col gap-6"
            >
              {/* Today's Tasks */}
              <Card className="relative overflow-hidden">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={1}
                />
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Today&apos;s Tasks
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  {todayTasks.map((task, index) => (
                    <motion.div
                      layout
                      key={task.id}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className={`flex items-start gap-3 p-3 rounded-lg border transition-colors ${
                        task.completed
                          ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                          : "bg-card hover:bg-accent/50"
                      }`}
                    >
                      <div
                        className={`w-4 h-4 rounded-full border-2 mt-0.5 ${
                          task.completed
                            ? "bg-green-600 border-green-600"
                            : "border-muted-foreground"
                        }`}
                      />
                      <div className="flex-1">
                        <h4
                          className={`font-medium text-sm ${
                            task.completed
                              ? "line-through text-muted-foreground"
                              : "text-card-foreground"
                          }`}
                        >
                          {task.title}
                        </h4>
                        <p className="text-xs text-muted-foreground mt-1">
                          {task.subtitle}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>

              {/* Upcoming Events */}
              <Card className="relative overflow-hidden">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={1}
                />
                <CardHeader>
                  <CardTitle className="text-lg font-semibold flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-blue-600" />
                    Upcoming
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col gap-3">
                  {calendarEvents.map((event, index) => (
                    <motion.div
                      layout
                      key={index}
                      initial={{ x: 20, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="flex items-start gap-3 p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors"
                    >
                      <div className="text-xs text-muted-foreground min-w-0 flex-shrink-0">
                        <div>{event.date}</div>
                        <div className="font-medium">{event.time}</div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-card-foreground truncate">
                          {event.title}
                        </h4>
                        <p className="text-xs text-muted-foreground truncate">
                          {event.subtitle}
                        </p>
                      </div>
                      <Badge className={`text-xs ${event.color}`}>
                        {event.title.split(" ")[0]}
                      </Badge>
                    </motion.div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
}
