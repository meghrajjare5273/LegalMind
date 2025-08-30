"use client";
import { cn } from "@/lib/utils";
import type React from "react";
import { useState, createContext, useContext, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import { IconMenu2, IconX } from "@tabler/icons-react";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...(props as React.ComponentProps<"div">)} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof motion.div>) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px] shrink-0",
          className
        )}
        animate={{
          width: animate ? (open ? "300px" : "60px") : "300px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
        {...props}
      >
        {children}
      </motion.div>
    </>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    if (open) {
      document.documentElement.style.overflow = "hidden";
      window.addEventListener("keydown", onKeyDown);
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, setOpen]);

  return (
    <>
      <div
        className={cn(
          "fixed top-5 left-0 right-82 z-50 h-12 px-4 flex flex-row md:hidden items-center justify-between bg-neutral-100 dark:bg-transparent",
          className
        )}
        {...props}
      >
        <div className="flex justify-end z-20 w-full">
          <button
            type="button"
            aria-label="Open menu"
            aria-controls="mobile-sidebar-panel"
            aria-expanded={open}
            className="p-2 -m-2 rounded-md hover:bg-neutral-200/60 dark:hover:bg-neutral-700/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setOpen(!open)}
          >
            <IconMenu2 className="text-neutral-800 dark:text-neutral-200" />
          </button>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ x: "-100%", opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: "-100%", opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="fixed inset-0 z-[100]"
            >
              <div
                className="absolute inset-0 bg-black/50"
                aria-hidden="true"
                onClick={() => setOpen(false)}
              />
              <motion.aside
                id="mobile-sidebar-panel"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
                className={cn(
                  "absolute left-0 top-0 h-full w-full bg-white dark:bg-neutral-900 p-6 md:p-10 flex flex-col justify-between overflow-y-auto overscroll-contain",
                  className
                )}
              >
                <div className="absolute right-6 top-6 z-50">
                  <button
                    type="button"
                    aria-label="Close menu"
                    className="p-2 -m-2 rounded-md hover:bg-neutral-200/60 dark:hover:bg-neutral-700/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring text-neutral-800 dark:text-neutral-200"
                    onClick={() => setOpen(false)}
                  >
                    <IconX />
                  </button>
                </div>
                {children}
              </motion.aside>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
};

export const SidebarLink = ({
  link,
  className,
  ...props
}: {
  link: Links;
  className?: string;
}) => {
  const { open, animate } = useSidebar();
  return (
    <a
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-2 group/sidebar py-2",
        className
      )}
      {...props}
    >
      {link.icon}

      <motion.span
        animate={{
          display: animate ? (open ? "inline-block" : "none") : "inline-block",
          opacity: animate ? (open ? 1 : 0) : 1,
        }}
        className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </a>
  );
};
