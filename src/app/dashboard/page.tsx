"use client";

import { useEffect, useState } from "react";
import { authClient } from "@/lib/auth-client";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Search,
  Bell,
  MoreHorizontal,
  CheckCircle2,
  Home,
  BarChart3,
  List,
  Clock,
  Settings,
} from "lucide-react";

interface User {
  name: string;
  email: string;
  image: string | null;
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const getUser = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user) {
          setUser({
            name: session?.data.user.name || "User",
            email: session.data.user.email || "",
            image: session.data.user.image || null,
          });
        }
      } catch (error) {
        console.log("No active session");
      }
    };
    getUser();
  }, []);

  const projects = [
    {
      id: 1,
      title: "Web Development",
      tasks: 10,
      progress: 96,
      members: 7,
      color: "bg-gradient-to-br from-purple-500 to-purple-700",
      avatars: [
        "/diverse-person-portrait.png",
        "/diverse-group-conversation.png",
        "/diverse-group-meeting.png",
      ],
    },
    {
      id: 2,
      title: "Mobile App Design",
      tasks: 12,
      progress: 40,
      members: 9,
      color: "bg-gradient-to-br from-teal-400 to-teal-600",
      avatars: [
        "/diverse-group-meeting.png",
        "/diverse-group-five.png",
        "/diverse-group-meeting.png",
      ],
    },
    {
      id: 3,
      title: "Facebook Brand UI Kit",
      tasks: 22,
      progress: 73,
      members: 3,
      color: "bg-gradient-to-br from-orange-400 to-orange-600",
      avatars: ["/diverse-group-meeting.png", "/diverse-group-meeting.png"],
    },
  ];

  const todayTasks = [
    {
      id: 1,
      title: "Mobile App",
      subtitle: "Prepare Figma file",
      color: "border-l-orange-500",
      completed: false,
    },
    {
      id: 2,
      title: "UX wireframes",
      subtitle: "Design UX wireframes",
      color: "border-l-purple-500",
      completed: false,
    },
    {
      id: 3,
      title: "Mobile App",
      subtitle: "Research",
      color: "border-l-teal-500",
      completed: true,
    },
  ];

  const calendarEvents = [
    {
      date: "Oct 20, 2021",
      time: "10:00",
      title: "Dribbble shot",
      subtitle: "Facebook Brand",
      color: "bg-teal-100 text-teal-800",
    },
    {
      date: "Oct 20, 2021",
      time: "13:20",
      title: "Design",
      subtitle: "Task Management",
      color: "bg-orange-100 text-orange-800",
    },
    {
      date: "Oct 21, 2021",
      time: "10:00",
      title: "UX Research",
      subtitle: "Sleep App",
      color: "bg-purple-100 text-purple-800",
    },
    {
      date: "Oct 21, 2021",
      time: "13:20",
      title: "Design",
      subtitle: "Task Management",
      color: "bg-orange-100 text-orange-800",
    },
    {
      date: "Oct 21, 2021",
      time: "10:00",
      title: "Dribbble Shot",
      subtitle: "Meet Up",
      color: "bg-teal-100 text-teal-800",
    },
    {
      date: "Oct 22, 2021",
      time: "10:00",
      title: "Dribbble Shot",
      subtitle: "Meet Up",
      color: "bg-teal-100 text-teal-800",
    },
    {
      date: "Oct 22, 2021",
      time: "11:00",
      title: "Design",
      subtitle: "Mobile App",
      color: "bg-orange-100 text-orange-800",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded"></div>
              <span className="font-semibold text-lg">Chaart</span>
            </div>

            <div className="flex flex-col items-center mb-8">
              <Avatar className="w-16 h-16 mb-3">
                <AvatarImage
                  src={
                    user?.image ||
                    "/placeholder.svg?height=64&width=64&query=user"
                  }
                />
                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
              </Avatar>
              <h3 className="font-medium">{user?.name || "Sarah Connor"}</h3>
              <p className="text-sm text-gray-500">
                {user?.email || "sarah@gmail.com"}
              </p>
              <Badge variant="secondary" className="mt-2">
                200
              </Badge>
            </div>

            <nav className="space-y-2">
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 text-gray-900 bg-gray-100 rounded-lg"
              >
                <Home className="w-5 h-5" />
                Dashboard
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <BarChart3 className="w-5 h-5" />
                Analytics
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <List className="w-5 h-5" />
                Task List
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <Clock className="w-5 h-5" />
                Tracking
              </a>
              <a
                href="#"
                className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                <Settings className="w-5 h-5" />
                Setting
              </a>
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex">
          <div className="flex-1 p-8">
            {/* Header */}
            <div className="flex items-center justify-between mb-8">
              <div>
                <h1 className="text-2xl font-semibold text-gray-900">
                  Hello, {user?.name?.split(" ")[0] || "Sara"}
                </h1>
                <p className="text-gray-500">
                  Today is Monday, 20 October 2021
                </p>
              </div>
              <div className="flex items-center gap-4">
                <Search className="w-5 h-5 text-gray-400" />
                <Button className="bg-gray-900 hover:bg-gray-800">
                  Add New Project
                </Button>
              </div>
            </div>

            {/* Project Cards */}
            <div className="grid grid-cols-3 gap-6 mb-8">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className={`${project.color} text-white border-0 relative overflow-hidden`}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex -space-x-2">
                        {project.avatars.map((avatar, index) => (
                          <Avatar
                            key={index}
                            className="w-8 h-8 border-2 border-white"
                          >
                            <AvatarImage src={avatar || "/placeholder.svg"} />
                            <AvatarFallback>U</AvatarFallback>
                          </Avatar>
                        ))}
                        <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center text-xs font-medium">
                          +{project.members}
                        </div>
                      </div>
                      <MoreHorizontal className="w-5 h-5" />
                    </div>
                    <h3 className="text-lg font-semibold mb-4">
                      {project.title}
                    </h3>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>{project.tasks} tasks</span>
                        <span>{project.progress}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <div
                          className="bg-white rounded-full h-2 transition-all duration-300"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-2 gap-8">
              {/* Tasks for today */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Tasks for today</h2>
                <div className="space-y-3">
                  {todayTasks.map((task) => (
                    <div
                      key={task.id}
                      className={`flex items-center gap-4 p-4 bg-white rounded-lg border-l-4 ${task.color}`}
                    >
                      <div className="flex-1">
                        <h4 className="font-medium">{task.title}</h4>
                        <p className="text-sm text-gray-500">{task.subtitle}</p>
                      </div>
                      {task.completed && (
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Statistics */}
              <div>
                <h2 className="text-lg font-semibold mb-4">Statistics</h2>
                <div className="bg-white rounded-lg p-6">
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <div className="text-2xl font-bold">28 h</div>
                      <div className="text-sm text-gray-500">Tracked time</div>
                    </div>
                    <div className="text-center">
                      <div className="text-2xl font-bold">18</div>
                      <div className="text-sm text-gray-500">
                        Finished tasks
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="w-8 h-8 bg-gray-900 rounded-full mx-auto mb-1"></div>
                      <div className="text-sm text-gray-500">New widget</div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <div className="text-2xl font-bold">
                          $9.99{" "}
                          <span className="text-sm font-normal text-gray-500">
                            p/m
                          </span>
                        </div>
                        <div className="font-medium">Pro Plan</div>
                        <div className="text-sm text-gray-500">
                          More productivity with premium!
                        </div>
                      </div>
                      <div className="w-20 h-16 bg-gradient-to-br from-orange-400 to-red-500 rounded-lg flex items-center justify-center">
                        <div className="w-8 h-8 bg-white/20 rounded"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Calendar Sidebar */}
          <div className="w-80 bg-white border-l border-gray-200 p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-lg font-semibold">Calendar</h2>
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-gray-400" />
                <MoreHorizontal className="w-5 h-5 text-gray-400" />
              </div>
            </div>

            <div className="space-y-6">
              {Object.entries(
                calendarEvents.reduce((acc, event) => {
                  if (!acc[event.date]) acc[event.date] = [];
                  acc[event.date].push(event);
                  return acc;
                }, {} as Record<string, typeof calendarEvents>)
              ).map(([date, events]) => (
                <div key={date}>
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-gray-900">{date}</h3>
                    <MoreHorizontal className="w-4 h-4 text-gray-400" />
                  </div>
                  <div className="space-y-3">
                    {events.map((event, index) => (
                      <div key={index} className="flex gap-3">
                        <div className="text-sm font-medium text-gray-900 w-12">
                          {event.time}
                        </div>
                        <div className="flex-1">
                          <Badge
                            variant="secondary"
                            className={`${event.color} text-xs mb-1`}
                          >
                            {event.title}
                          </Badge>
                          <div className="text-sm text-gray-600">
                            {event.subtitle}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
