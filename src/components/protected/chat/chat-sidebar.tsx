/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Bell,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileText,
  LayoutDashboard,
  LogOut,
  Menu,
  MessageSquare,
  Plus,
  Search,
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";

import { AnimatedThemeToggler } from "@/components/ui/magicui/animated-theme-toggler";
import { useToast } from "@/hooks/use-toast";
import { useSession } from "@/contexts/session-context";
import { authClient } from "@/lib/auth-client";

export type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
  tokenCount?: number;
};

export type ChatSession = {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  messages: Message[];
};

type NavigationItem = {
  label: string;
  icon: React.ComponentType<any>;
  href: string;
  hasChildren?: boolean;
  badge?: number;
};

// NAV DATA from JSON brief
const MAIN_ITEMS: NavigationItem[] = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
    hasChildren: true,
  },
  { label: "Contracts", icon: FileText, href: "/contracts" },
  { label: "Payments", icon: CreditCard, href: "/payments" },
  { label: "Notifications", icon: Bell, href: "/notifications", badge: 5 },
] as const;

const DASHBOARD_CHILDREN = [
  { label: "Project", href: "/dashboard/project" },
  { label: "Revenue", href: "/dashboard/revenue" },
  { label: "Insights", href: "/dashboard/insights" },
];

export function ChatSidebar() {
  const [open, setOpen] = React.useState(false);
  const [sessions, setSessions] = React.useState<ChatSession[]>([]);
  const [isLoadingSessions, setIsLoadingSessions] = React.useState(true);

  const pathname = usePathname();
  const router = useRouter();
  const { user } = useSession();
  const { toast } = useToast();

  // fetch sessions on user available
  React.useEffect(() => {
    if (user) fetchChatSessions();
  }, [user]);

  React.useEffect(() => {
    if (user) fetchChatSessions();
  }, [pathname]);

  React.useEffect(() => {
    const onFocus = () => fetchChatSessions();
    const onCustom = () => fetchChatSessions();
    const onStorage = (e: StorageEvent) => {
      if (e.key === "chat:sessions:refresh") fetchChatSessions();
    };
    window.addEventListener("focus", onFocus);
    window.addEventListener(
      "chat:sessions-refresh" as any,
      onCustom as EventListener
    );
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener(
        "chat:sessions-refresh" as any,
        onCustom as EventListener
      );
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const fetchChatSessions = async () => {
    try {
      setIsLoadingSessions(true);
      const response = await fetch("/api/chat/sessions");
      if (response.ok) {
        const data = await response.json();
        setSessions(data.sessions || []);
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
      toast({
        title: "Error",
        variant: "destructive",
        description: "Failed to load chat history.",
      });
    } finally {
      setIsLoadingSessions(false);
    }
  };

  const deleteSession = async (sessionId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const res = await fetch(`/api/chat/${sessionId}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete session");
      setSessions((prev) => prev.filter((s) => s.id !== sessionId));
      toast({
        title: "Chat deleted",
        description: "Chat session has been deleted.",
      });
      if (pathname === `/services/chat/${sessionId}`)
        router.push("/services/chat");
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        variant: "destructive",
        description: "Failed to delete chat session.",
      });
    }
  };

  const handleLogout = async () => {
    try {
      await authClient.signOut();
      router.push("/");
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
    } catch (err) {
      toast({
        title: "Error",
        variant: "destructive",
        description: "Failed to logout. Please try again.",
      });
    }
  };

  const userInitials =
    user?.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase() || "U";

  // local UI state
  const [dashOpen, setDashOpen] = React.useState(true);

  return (
    <>
      {/* Desktop Sidebar */}
      <TooltipProvider delayDuration={200}>
        <motion.aside
          role="navigation"
          aria-label="Primary"
          initial={false}
          animate={{ width: open ? 256 : 64 }} // 16rem vs 4rem
          transition={{ type: "tween", duration: 0.2, ease: "easeInOut" }}
          className="hidden md:flex fixed md:static top-0 left-0 h-screen md:h-auto flex-col border-r bg-white/90 dark:bg-neutral-900/70 backdrop-blur-sm border-gray-200 dark:border-neutral-800 rounded-[1.25rem] md:rounded-none"
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          {/* Logo + Toggle */}
          <div className="flex items-center gap-2 justify-between h-14 px-3">
            {open ? (
              <Link
                href="/services/chat"
                aria-label="New chat"
                className="flex items-center gap-2"
              >
                <div className="size-8 grid place-items-center rounded-md bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-neutral-100">
                  <Plus className="size-4" />
                </div>
                <span className="text-sm font-medium text-gray-700 dark:text-neutral-300">
                  New Chat
                </span>
              </Link>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    href="/services/chat"
                    aria-label="New chat"
                    className="size-8 grid place-items-center rounded-md bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-neutral-100"
                  >
                    <Plus className="size-4" />
                  </Link>
                </TooltipTrigger>
                <TooltipContent side="right">New chat</TooltipContent>
              </Tooltip>
            )}

            <AnimatePresence initial={false}>
              {open && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  className="text-lg font-semibold tracking-tight text-gray-900 dark:text-neutral-100"
                >
                  LegalMind
                </motion.span>
              )}
            </AnimatePresence>

            <Button
              variant="ghost"
              size="icon"
              aria-label={open ? "Collapse sidebar" : "Expand sidebar"}
              className="h-8 w-8 rounded-md border border-gray-200 dark:border-neutral-800 text-gray-500 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-neutral-100"
              onClick={() => setOpen((v) => !v)}
            >
              {open ? (
                <ChevronLeft className="size-4" />
              ) : (
                <ChevronRight className="size-4" />
              )}
            </Button>
          </div>

          {/* Search */}
          <div className="px-3">
            {open ? (
              <div className="relative">
                <Search className="size-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-neutral-500" />
                <Input
                  aria-label="Search"
                  placeholder="Search"
                  className="pl-9 h-9 rounded-lg bg-gray-50 dark:bg-neutral-800 text-gray-900 dark:text-neutral-100 placeholder:text-gray-400 dark:placeholder:text-neutral-500 focus-visible:ring-1 focus-visible:ring-[#007BFF] dark:focus-visible:ring-[#63B3ED]"
                />
                <div className="absolute right-2 top-1/2 -translate-y-1/2">
                  <kbd className="px-1.5 py-0.5 text-[10px] rounded bg-white border text-gray-500 border-gray-200 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400">
                    S
                  </kbd>
                </div>
              </div>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="w-full">
                    <Search className="size-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">Search</TooltipContent>
              </Tooltip>
            )}
          </div>

          {/* Sections */}
          <div
            className={`mt-3 px-2 flex-1 ${
              open ? "overflow-y-auto" : "overflow-y-hidden"
            }`}
          >
            <AnimatedThemeToggler />

            {/* MAIN */}
            <SectionLabel open={open}>MAIN</SectionLabel>
            <nav className="space-y-1">
              {MAIN_ITEMS.map((item) => {
                const Icon = item.icon;
                const isActive =
                  item.href &&
                  pathname?.startsWith(item.href) &&
                  !item.hasChildren;
                // Dashboard special case
                if (item.hasChildren) {
                  if (open) {
                    return (
                      <div key={item.label} className="px-1">
                        <button
                          aria-expanded={dashOpen}
                          onClick={() => setDashOpen((v) => !v)}
                          className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-xl transition-colors ${
                            pathname?.startsWith("/dashboard")
                              ? "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-neutral-100"
                              : "text-gray-700 hover:bg-gray-50 dark:text-neutral-300 dark:hover:bg-neutral-800/70"
                          }`}
                        >
                          <div className="size-6 grid place-items-center rounded-md bg-gray-100 dark:bg-neutral-800">
                            <Icon className="size-4" />
                          </div>
                          <span className="text-sm font-medium">Dashboard</span>
                          <ChevronDown
                            className={`ml-auto size-4 transition-transform ${
                              dashOpen ? "" : "-rotate-90"
                            }`}
                          />
                        </button>

                        <AnimatePresence initial={false}>
                          {dashOpen && (
                            <motion.ul
                              initial={{ height: 0, opacity: 0 }}
                              animate={{ height: "auto", opacity: 1 }}
                              exit={{ height: 0, opacity: 0 }}
                              className="ml-8 mt-1 space-y-1 overflow-hidden"
                            >
                              {DASHBOARD_CHILDREN.map((child) => {
                                const activeChild = pathname === child.href;
                                return (
                                  <li key={child.href}>
                                    <Link
                                      href={child.href}
                                      className={`block text-sm rounded-lg px-2.5 py-1.5 ${
                                        activeChild
                                          ? "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-neutral-100"
                                          : "text-gray-600 hover:bg-gray-50 dark:text-neutral-400 dark:hover:bg-neutral-800/70"
                                      }`}
                                    >
                                      {child.label}
                                    </Link>
                                  </li>
                                );
                              })}
                            </motion.ul>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  }
                  // Collapsed: show popover with child links
                  return (
                    <Tooltip key={item.label}>
                      <TooltipTrigger asChild>
                        <Popover>
                          <PopoverTrigger asChild>
                            <button
                              aria-label="Dashboard"
                              className={`w-full flex items-center justify-center p-2 rounded-xl transition-colors ${
                                pathname?.startsWith("/dashboard")
                                  ? "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-neutral-100"
                                  : "text-gray-600 hover:bg-gray-50 dark:text-neutral-300 dark:hover:bg-neutral-800/70"
                              }`}
                            >
                              <Icon className="size-5" />
                            </button>
                          </PopoverTrigger>
                          <PopoverContent
                            align="start"
                            side="right"
                            className="w-48 p-2 bg-white shadow-md dark:bg-neutral-900"
                          >
                            <div className="text-xs text-gray-500 dark:text-neutral-400 px-1 pb-1">
                              Dashboard
                            </div>
                            <div className="space-y-1">
                              {DASHBOARD_CHILDREN.map((child) => (
                                <Link
                                  key={child.href}
                                  href={child.href}
                                  className={`block rounded-md px-2 py-1.5 text-sm ${
                                    pathname === child.href
                                      ? "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-neutral-100"
                                      : "text-gray-700 hover:bg-gray-50 dark:text-neutral-400 dark:hover:bg-neutral-800/70"
                                  }`}
                                >
                                  {child.label}
                                </Link>
                              ))}
                            </div>
                          </PopoverContent>
                        </Popover>
                      </TooltipTrigger>
                      <TooltipContent side="right">Dashboard</TooltipContent>
                    </Tooltip>
                  );
                }

                // Regular items
                return open ? (
                  <Link
                    key={item.label}
                    href={item.href!}
                    aria-label={item.label}
                  >
                    <div
                      className={`flex items-center gap-3 px-2.5 py-2 rounded-xl transition-colors ${
                        isActive
                          ? "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-neutral-100"
                          : "text-gray-700 hover:bg-gray-50 dark:text-neutral-300 dark:hover:bg-neutral-800/70"
                      }`}
                    >
                      <div className="size-6 grid place-items-center rounded-md bg-gray-100 dark:bg-neutral-800">
                        <Icon className="size-4" />
                      </div>
                      <span className="text-sm font-medium">{item.label}</span>
                      {"badge" in item && item.badge ? (
                        <span className="ml-auto text-[10px] px-1.5 py-0.5 rounded-full bg-[#007BFF]/10 text-[#007BFF]">
                          {item.badge}
                        </span>
                      ) : null}
                    </div>
                  </Link>
                ) : (
                  <Tooltip key={item.label}>
                    <TooltipTrigger asChild>
                      <Link href={item.href!} aria-label={item.label}>
                        <div
                          className={`flex items-center justify-center p-2 rounded-xl transition-colors ${
                            isActive
                              ? "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-neutral-100"
                              : "text-gray-600 hover:bg-gray-50 dark:text-neutral-300 dark:hover:bg-neutral-800/70"
                          }`}
                        >
                          <Icon className="size-5" />
                        </div>
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent side="right">{item.label}</TooltipContent>
                  </Tooltip>
                );
              })}
            </nav>

            {/* RECENT */}
            <SectionLabel className="mt-4" open={open}>
              RECENT
            </SectionLabel>
            <div className="px-1">
              {isLoadingSessions ? (
                <ChatHistorySkeleton open={open} />
              ) : sessions.length ? (
                <RecentList
                  sessions={sessions}
                  open={open}
                  pathname={pathname || null}
                  deleteSession={deleteSession}
                />
              ) : open ? (
                <EmptyHint open={open} />
              ) : null}
            </div>
          </div>

          {/* Footer User Card */}
          {user && (
            <div className="px-3 py-3">
              {open ? (
                <div className="flex items-center gap-3 rounded-2xl border bg-white dark:bg-neutral-900 border-gray-200 dark:border-neutral-800 px-3 py-2">
                  <Avatar className="size-9">
                    <AvatarImage
                      src={(user.image as string) || "/placeholder.svg"}
                      alt={user.name || "User"}
                    />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-gray-900 dark:text-neutral-100 truncate">
                      {user.name || "User"}
                    </div>
                    <div className="text-[10px] text-gray-500 dark:text-neutral-400 truncate">
                      {user.email || "DESIGNER"}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Logout"
                    className="text-gray-500 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-neutral-100"
                    onClick={handleLogout}
                  >
                    <LogOut className="size-4" />
                  </Button>
                </div>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      aria-label="Account"
                      className="w-full p-1.5 rounded-2xl border bg-white dark:bg-neutral-900"
                    >
                      <Avatar className="size-8 mx-auto">
                        <AvatarImage
                          src={(user.image as string) || "/placeholder.svg"}
                          alt={user.name || "User"}
                        />
                        <AvatarFallback>{userInitials}</AvatarFallback>
                      </Avatar>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <div className="text-sm">{user.name || "User"}</div>
                    <Separator className="my-1" />
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLogout}
                      className="h-7"
                    >
                      <LogOut className="size-3 mr-1.5" />
                      Logout
                    </Button>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          )}
        </motion.aside>
      </TooltipProvider>

      {/* Mobile Topbar + Drawer */}
      <div className="md:hidden fixed inset-x-0 top-0 h-12 z-30 bg-white/80 dark:bg-neutral-900/70 backdrop-blur-sm border-b border-gray-200 dark:border-neutral-800 flex items-center px-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Open menu">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 bg-white dark:bg-neutral-900 w-80"
          >
            <SheetHeader className="px-4 py-3">
              <SheetTitle>LegalMind</SheetTitle>
            </SheetHeader>
            <div className="px-4 pb-4 space-y-3 h-full flex flex-col">
              <Link href="/services/chat">
                <div className="flex items-center gap-2 rounded-lg bg-gray-100 dark:bg-neutral-800 hover:bg-gray-50 dark:hover:bg-neutral-800/70 px-3 py-2">
                  <div className="size-6 grid place-items-center rounded-md bg-white dark:bg-neutral-900">
                    <Plus className="size-4" />
                  </div>
                  <span className="text-sm">New Chat</span>
                </div>
              </Link>

              <div className="space-y-1">
                {MAIN_ITEMS.filter((i) => !i.hasChildren).map((i) => {
                  const Icon = i.icon;
                  return (
                    <Link
                      key={i.label}
                      href={i.href!}
                      className="flex items-center gap-3 px-2 py-2 rounded-md hover:bg-gray-50 dark:hover:bg-neutral-800/70"
                    >
                      <Icon className="size-4" />
                      <span className="text-sm">{i.label}</span>
                    </Link>
                  );
                })}
              </div>

              <div className="pt-2 border-t border-gray-200 dark:border-neutral-800 flex-1 overflow-y-auto">
                {isLoadingSessions ? (
                  <div className="space-y-2">
                    {Array.from({ length: 3 }).map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full rounded" />
                    ))}
                  </div>
                ) : (
                  <RecentList
                    sessions={sessions}
                    open={true}
                    pathname={pathname}
                    deleteSession={deleteSession}
                  />
                )}
              </div>

              {user && (
                <div className="pt-3 border-t border-gray-200 dark:border-neutral-800 flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarImage
                      src={(user.image as string) || "/placeholder.svg"}
                      alt={user.name || "User"}
                    />
                    <AvatarFallback>{userInitials}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">
                      {user.name || "User"}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-neutral-400 truncate">
                      {user.email}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleLogout}
                    aria-label="Logout"
                  >
                    <LogOut className="size-4" />
                  </Button>
                </div>
              )}
            </div>
          </SheetContent>
        </Sheet>
        <div className="ml-2 text-sm">LegalMind</div>
        <div className="ml-auto text-xs text-gray-500 dark:text-neutral-400">
          {pathname?.replace("/", "")}
        </div>
      </div>
    </>
  );
}

function SectionLabel({
  children,
  open,
  className = "",
}: {
  children: React.ReactNode;
  open: boolean;
  className?: string;
}) {
  return open ? (
    <div
      className={`px-2 py-2 text-[10px] tracking-wider text-gray-500 dark:text-neutral-500 ${className}`}
    >
      {children}
    </div>
  ) : (
    <div className={`flex items-center justify-center py-2 ${className}`}>
      <div className="h-6 w-[2px] rounded-full bg-gray-200 dark:bg-neutral-800" />
    </div>
  );
}

function ChatHistorySkeleton({ open }: { open: boolean }) {
  return (
    <div className="space-y-2">
      {Array.from({ length: 4 }).map((_, i) => (
        <div
          key={i}
          className={`flex items-center gap-2 ${open ? "px-2.5" : "px-0"} py-2`}
        >
          <Skeleton className="size-4 rounded" />
          {open && <Skeleton className="h-4 flex-1 rounded" />}
        </div>
      ))}
    </div>
  );
}

function RecentList({
  sessions,
  open,
  pathname,
  deleteSession,
}: {
  sessions: ChatSession[];
  open: boolean;
  pathname: string | null;
  deleteSession: (sessionId: string, e: React.MouseEvent) => void;
}) {
  if (!sessions.length) return null;
  if (open) {
    return (
      <div className="space-y-1">
        {sessions.slice(0, 8).map((s) => {
          const active = pathname === `/services/chat/${s.id}`;
          return (
            <div
              key={s.id}
              className={`group flex items-center gap-2 px-2.5 py-2 rounded-xl ${
                active
                  ? "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-neutral-100"
                  : "text-gray-700 hover:bg-gray-50 dark:text-neutral-300 dark:hover:bg-neutral-800/70"
              }`}
            >
              <Link
                href={`/services/chat/${s.id}`}
                className="flex items-center gap-2 min-w-0 flex-1"
                aria-label={s.title}
              >
                <MessageSquare className="size-4 shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-sm truncate">{s.title}</div>
                  <div className="text-xs text-gray-400 dark:text-neutral-500">
                    {new Date(s.updatedAt).toLocaleDateString()}
                  </div>
                </div>
              </Link>
              <Button
                variant="ghost"
                size="icon"
                className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => deleteSession(s.id, e)}
                aria-label="Delete chat"
              >
                <Plus className="size-3 rotate-45" />
              </Button>
            </div>
          );
        })}
      </div>
    );
  }

  // closed state (icons only with tooltip)
  return (
    <div className="space-y-1">
      {sessions.slice(0, 8).map((s) => {
        const active = pathname === `/services/chat/${s.id}`;
        return (
          <Tooltip key={s.id}>
            <TooltipTrigger asChild>
              <Link
                href={`/services/chat/${s.id}`}
                className={`flex items-center justify-center p-2 rounded-xl ${
                  active
                    ? "bg-gray-100 dark:bg-neutral-800 text-gray-900 dark:text-neutral-100"
                    : "text-gray-600 hover:bg-gray-50 dark:text-neutral-300 dark:hover:bg-neutral-800/70"
                }`}
                aria-label={s.title}
              >
                <MessageSquare className="size-5" />
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right" className="max-w-56">
              <div className="text-sm truncate">{s.title}</div>
              <div className="text-xs text-gray-400 dark:text-neutral-500">
                {new Date(s.updatedAt).toLocaleDateString()}
              </div>
            </TooltipContent>
          </Tooltip>
        );
      })}
    </div>
  );
}

function EmptyHint({ open }: { open: boolean }) {
  return (
    <div className="rounded-xl border border-dashed border-gray-200 dark:border-neutral-800 p-4 text-center">
      <div className="text-xs text-gray-500 dark:text-neutral-400">
        No conversations yet — start a new one.
      </div>
      {open && (
        <div className="mt-2 text-[10px] text-gray-400 dark:text-neutral-500">
          Your chats will appear here.
        </div>
      )}
    </div>
  );
}
