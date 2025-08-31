"use client";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  ChevronLeft,
  ChevronRight,
  HistoryIcon,
  LogOut,
  Menu,
  MessageSquare,
  Plus,
  Search,
  Settings,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

/**
 * ChatSidebar
 * Encapsulates: animated desktop sidebar, mobile Sheet, user footer, and history placeholder.
 * Keeps all interactive state local to the sidebar.
 */
export function ChatSidebar() {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  return (
    <>
      {/* Desktop Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: open ? 280 : 72 }}
        transition={{ type: "spring", stiffness: 260, damping: 30 }}
        className="hidden md:flex flex-col border-r border-neutral-800 bg-neutral-900/60 backdrop-blur-sm"
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-3 h-14">
          <Link href="/chat" className="flex items-center gap-2">
            <div className="size-8 grid place-items-center rounded-md bg-neutral-800 text-neutral-200">
              <MessageSquare className="size-4" />
            </div>
            <AnimatePresence initial={false}>
              {open && (
                <motion.span
                  initial={{ opacity: 0, x: -6 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -6 }}
                  className="text-sm font-medium text-neutral-200"
                >
                  AICHAT
                </motion.span>
              )}
            </AnimatePresence>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="text-neutral-400 hover:text-neutral-100"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? (
              <ChevronLeft className="size-4" />
            ) : (
              <ChevronRight className="size-4" />
            )}
          </Button>
        </div>

        {/* New Chat */}
        <div className="px-3">
          <Link href="/chat">
            <motion.div
              whileHover={{ y: -1, scale: 1.01 }}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
              className="flex items-center gap-2 rounded-lg bg-neutral-800 hover:bg-neutral-700/80 px-3 py-2 cursor-pointer"
            >
              <div className="size-6 grid place-items-center rounded-md bg-neutral-700">
                <Plus className="size-4 text-neutral-100" />
              </div>
              {open && (
                <span className="text-sm text-neutral-100">New Chat</span>
              )}
            </motion.div>
          </Link>
        </div>

        {/* Quick actions */}
        <div className="px-3 mt-3 space-y-1">
          <SidebarItem
            icon={<Search className="size-4" />}
            label="Search"
            open={open}
          />
          <SidebarItem
            icon={<HistoryIcon className="size-4" />}
            label="History"
            open={open}
          />
          <SidebarItem
            icon={<Settings className="size-4" />}
            label="Settings"
            open={open}
          />
        </div>

        {/* History list */}
        <div className="mt-4 px-2 flex-1 overflow-y-auto">
          {/* TODO: Fetch and render user's chat history */}
          <EmptyHint open={open} />
        </div>

        {/* User footer */}
        <div className="px-3 py-3 border-t border-neutral-800">
          <div className="flex items-center gap-3">
            <Avatar className="size-8">
              <AvatarImage alt="User" src="https://i.pravatar.cc/100?img=5" />
              <AvatarFallback>UM</AvatarFallback>
            </Avatar>
            {open && (
              <div className="flex-1">
                <div className="text-sm font-medium">Ui Mahadi</div>
                <div className="text-xs text-neutral-400">
                  mahadi@example.com
                </div>
              </div>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="text-neutral-400 hover:text-neutral-100"
            >
              <LogOut className="size-4" />
            </Button>
          </div>
        </div>
      </motion.aside>

      {/* Mobile topbar + Sheet */}
      <div className="md:hidden fixed inset-x-0 top-0 h-12 z-30 bg-neutral-900/70 backdrop-blur-sm border-b border-neutral-800 flex items-center px-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="text-neutral-200">
              <Menu className="size-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="p-0 bg-neutral-900 text-neutral-100 w-80"
          >
            <SheetHeader className="px-4 py-3">
              <SheetTitle className="text-neutral-200">AICHAT</SheetTitle>
            </SheetHeader>
            <div className="px-4 pb-4 space-y-3">
              <Link href="/chat">
                <div className="flex items-center gap-2 rounded-lg bg-neutral-800 hover:bg-neutral-700/80 px-3 py-2">
                  <div className="size-6 grid place-items-center rounded-md bg-neutral-700">
                    <Plus className="size-4 text-neutral-100" />
                  </div>
                  <span className="text-sm text-neutral-100">New Chat</span>
                </div>
              </Link>
              <div className="space-y-1">
                <MobileLink
                  icon={<Search className="size-4" />}
                  label="Search"
                />
                <MobileLink
                  icon={<HistoryIcon className="size-4" />}
                  label="History"
                />
                <MobileLink
                  icon={<Settings className="size-4" />}
                  label="Settings"
                />
              </div>
              <div className="pt-2 border-t border-neutral-800">
                {/* TODO: Fetch and render user's chat history */}
                <div className="text-xs text-neutral-400">
                  No conversations yet.
                </div>
              </div>
              <div className="pt-3 border-t border-neutral-800 flex items-center gap-3">
                <Avatar className="size-8">
                  <AvatarImage
                    alt="User"
                    src="https://i.pravatar.cc/100?img=5"
                  />
                  <AvatarFallback>UM</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="text-sm font-medium">Ui Mahadi</div>
                  <div className="text-xs text-neutral-400">
                    mahadi@example.com
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-neutral-400 hover:text-neutral-100"
                >
                  <LogOut className="size-4" />
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
        <div className="ml-2 text-sm text-neutral-300">AICHAT</div>
        <div className="ml-auto text-xs text-neutral-500">
          {pathname?.replace("/", "")}
        </div>
      </div>
    </>
  );
}

function SidebarItem({
  icon,
  label,
  open,
}: {
  icon: React.ReactNode;
  label: string;
  open: boolean;
}) {
  return (
    <motion.div
      whileHover={{ x: 2 }}
      className="flex items-center gap-2 px-2 py-2 rounded-md text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800/70 cursor-pointer"
    >
      <span className="grid place-items-center">{icon}</span>
      <AnimatePresence initial={false}>
        {open && (
          <motion.span
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -6 }}
            className="text-sm"
          >
            {label}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

function EmptyHint({ open }: { open: boolean }) {
  return (
    <div className="rounded-lg border border-dashed border-neutral-800 p-4 text-center">
      <div className="text-xs text-neutral-400">
        No conversations yet — start a new one from the button above.
      </div>
      {open && (
        <div className="mt-2 text-[10px] text-neutral-500">
          Your chats will appear here.
        </div>
      )}
    </div>
  );
}

function MobileLink({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 px-2 py-2 rounded-md text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800/70">
      {icon}
      <span className="text-sm">{label}</span>
    </div>
  );
}
