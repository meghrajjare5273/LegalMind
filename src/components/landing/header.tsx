"use client";

import type React from "react";
import { useState, useEffect, useRef } from "react";
import {
  Menu,
  FileText,
  Users,
  Shield,
  BookOpen,
  User,
  LogOut,
  Settings,
  ChevronDown,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { User as UserType } from "@/lib/types";
import { useRouter } from "next/navigation";

const Shimmer = ({ className = "" }: { className?: string }) => (
  <div
    className={`animate-pulse bg-gray-300 dark:bg-gray-700 rounded ${className}`}
    aria-hidden="true"
  />
);

const useSession = () => {
  const [session, setSession] = useState<UserType | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSession = async () => {
      // setLoading(true)
      const session = await authClient.getSession();
      if (session.data) {
        setSession(session.data);
        setLoading(false);
      } else {
        setSession(null);
        setLoading(false);
      }
    };
    getSession();
  }, []);

  return { data: session, loadingUser: loading };
};

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const { data: session, loadingUser: loadingUser } = useSession();
  const router = useRouter();
  // const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const openMenu = (key: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    setHoveredItem(key);
  };

  const scheduleClose = (key: string) => {
    if (hoverTimeoutRef.current) clearTimeout(hoverTimeoutRef.current);
    hoverTimeoutRef.current = setTimeout(() => {
      setHoveredItem((prev) => (prev === key ? null : prev));
    }, 140); // 100–200ms feels good
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const services = [
    {
      title: "Contract Analysis",
      description: "AI-powered contract review and risk scoring",
      href: "/services/contract-review",
      icon: <FileText className="h-5 w-5" />,
    },
    {
      title: "Legal Chat",
      description: "Comprehensive citations and extractions",
      href: "/services/chat",
      icon: <BookOpen className="h-5 w-5" />,
    },
    {
      title: "Compliance Monitoring",
      description: "Automated compliance and regulation tracking",
      href: "/services/compliance",
      icon: <Shield className="h-5 w-5" />,
    },
    {
      title: "Case Management",
      description: "Organize and streamline case workflows",
      href: "/services/cases",
      icon: <Users className="h-5 w-5" />,
    },
  ];

  const resources = [
    {
      title: "Documentation",
      description: "Developer & user guides",
      href: "/docs",
    },
    {
      title: "Templates",
      description: "Ready-to-use legal templates",
      href: "/templates",
    },
    {
      title: "Case Studies",
      description: "Real-world success stories",
      href: "/case-studies",
    },
    {
      title: "Blog",
      description: "Insights & updates from LegalMind",
      href: "/blog",
    },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-4 px-6 md:px-12 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md border-b border-gray-200"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center gap-0 justify-center">
            <Link href="/" className="group flex items-center">
              <span
                className="font-bold text-3xl tracking-tighter font-space"
                style={{ color: "#b08d28" }}
              >
                Legal
              </span>
              <span
                className={`font-bold text-3xl tracking-tighter font-space transition-colors space-x-0.5 duration-300 ${
                  isScrolled ? "text-gray-900" : "text-white"
                }`}
              >
                Mind
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Services Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openMenu("services")}
              onMouseLeave={() => scheduleClose("services")}
            >
              <Link
                href="#services"
                className={`transition-all duration-300 font-space flex items-center gap-1 text-base font-medium ${
                  isScrolled
                    ? "text-gray-900 hover:text-gray-700"
                    : "text-white hover:opacity-80"
                }`}
              >
                Services
                <ChevronDown className="w-4 h-4 ml-1" />
              </Link>

              {hoveredItem === "services" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[600px] bg-white border border-gray-200 rounded-lg shadow-xl p-4 animate-fadeIn">
                  <div className="grid grid-cols-2 gap-3">
                    {services.map((service) => (
                      <Link
                        key={service.title}
                        href={service.href}
                        className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-transparent hover:border-gray-200"
                      >
                        <div
                          className="p-2 rounded-md"
                          style={{
                            color: "#b08d28",
                            backgroundColor: "rgba(176, 141, 40, 0.1)",
                          }}
                        >
                          {service.icon}
                        </div>
                        <div>
                          <div className="text-gray-900 font-semibold text-base font-space mb-1">
                            {service.title}
                          </div>
                          <p className="text-gray-600 text-sm leading-relaxed font-space">
                            {service.description}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Resources Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => openMenu("resources")}
              onMouseLeave={() => scheduleClose("resources")}
            >
              <Link
                href="#resources"
                className={`transition-all duration-300 font-space flex items-center gap-1 text-base font-medium ${
                  isScrolled
                    ? "text-gray-900 hover:text-gray-700"
                    : "text-white hover:opacity-80"
                }`}
              >
                Resources
                <ChevronDown className="w-4 h-4 ml-1" />
              </Link>

              {hoveredItem === "resources" && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[500px] bg-white border border-gray-200 rounded-lg shadow-xl p-4 animate-fadeIn">
                  <div className="grid grid-cols-2 gap-3">
                    {resources.map((resource) => (
                      <Link
                        key={resource.title}
                        href={resource.href}
                        className="block p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200 border border-transparent hover:border-gray-200"
                      >
                        <div className="text-gray-900 font-semibold text-base font-space mb-1">
                          {resource.title}
                        </div>
                        <p className="text-gray-600 text-sm font-space">
                          {resource.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Simple Links */}
            <Link
              href="/pricing"
              className={`transition-all duration-300 font-space text-base font-medium ${
                isScrolled
                  ? "text-gray-900 hover:text-gray-700"
                  : "text-white hover:opacity-80"
              }`}
            >
              Pricing
            </Link>
            <Link
              href="/about"
              className={`transition-all duration-300 font-space text-base font-medium ${
                isScrolled
                  ? "text-gray-900 hover:text-gray-700"
                  : "text-white hover:opacity-80"
              }`}
            >
              About
            </Link>

            {loadingUser}
            {/* Session-based Avatar/Sign In */}
            {loadingUser ? (
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full p-0"
                disabled
              >
                <div className="h-10 w-10 rounded-full">
                  <Shimmer className="h-10 w-10 rounded-full" />
                </div>
              </Button>
            ) : session ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full p-0"
                  >
                    <Avatar className="h-10 w-10 border-2 border-gray-700">
                      <AvatarImage
                        src={session.user.image || "/default-avatar.png"}
                        alt={session.user?.name || "User"}
                      />
                      <AvatarFallback className="bg-gray-800 text-white">
                        {session.user?.name?.charAt(0) || "U"}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  className="w-56 bg-white"
                  align="end"
                  forceMount
                >
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none text-gray-900">
                        {session.user?.name}
                      </p>
                      <p className="text-xs leading-none text-gray-600">
                        {session.user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/settings"
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Button
                      variant="link"
                      onClick={async () => {
                        await authClient.signOut();
                        router.refresh();
                        window.location.reload();
                      }}
                      className="flex items-center gap-2 text-gray-700"
                    >
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button
                asChild
                className="bg-white hover:bg-gray-100 text-black px-6 py-2 rounded-full transition-all duration-300 transform hover:scale-105 font-space font-medium"
              >
                <Link href="/sign-in">Sign In</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-white hover:bg-white/10"
                >
                  <Menu size={24} />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[300px] p-0 mobile-bg-white text-gray-900 border-gray-200 dark:bg-black dark:text-white dark:border-gray-800"
              >
                <div className="flex flex-col h-full">
                  {/* Header */}
                  <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <Link
                      href="/"
                      className="flex items-center space-x-1"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      <span
                        className="font-bold text-xl text-gold tracking-tighter font-space"
                        // style={{ color: "#b08d28" }}
                      >
                        Legal
                      </span>
                      <span className="text-gray-900 font-bold text-xl tracking-tighter font-space">
                        Mind
                      </span>
                    </Link>
                  </div>

                  {/* Content */}
                  <div className="flex-1 overflow-y-auto p-6">
                    <div className="flex flex-col space-y-6">
                      {/* Mobile Services */}
                      <div className="space-y-3">
                        <div className="text-gray-900 font-semibold font-space text-lg border-b border-gray-800 pb-2">
                          Services
                        </div>
                        {services.map((service) => (
                          <Link
                            key={service.title}
                            href={service.href}
                            className="flex items-center gap-3 px-2 py-3 text-gray-800 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-300 font-space"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <div
                              className="p-2 rounded"
                              style={{
                                color: "#b08d28",
                                backgroundColor: "rgba(176, 141, 40, 0.1)",
                              }}
                            >
                              {service.icon}
                            </div>
                            <span className="text-base">{service.title}</span>
                          </Link>
                        ))}
                      </div>

                      {/* Mobile Resources */}
                      <div className="space-y-3">
                        <div className="text-gray-900 font-semibold font-space text-lg border-b border-gray-800 pb-2">
                          Resources
                        </div>
                        {resources.map((resource) => (
                          <Link
                            key={resource.title}
                            href={resource.href}
                            className="block px-2 py-3 text-gray-800 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-300 font-space text-base"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            {resource.title}
                          </Link>
                        ))}
                      </div>

                      <Link
                        href="/pricing"
                        className="text-gray-900 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-300 py-3 px-2 font-space text-base"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        Pricing
                      </Link>
                      <Link
                        href="/about"
                        className="text-gray-900 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-300 py-3 px-2 font-space text-base"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        About
                      </Link>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="p-6 border-t border-gray-800">
                    {session ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 px-2 py-2">
                          <Avatar className="h-10 w-10 border-2 border-gray-700">
                            <AvatarImage
                              src={session.user?.image || "/default-avatar.png"}
                              alt={session.user?.name || "User"}
                            />
                            <AvatarFallback className="bg-gray-800 text-white">
                              {session.user?.name?.charAt(0) || "U"}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-gray-900 font-semibold text-base font-space">
                              {session.user?.name}
                            </p>
                            <p className="text-gray-500 text-sm font-space">
                              {session.user?.email}
                            </p>
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Link
                            href="/profile"
                            className="flex items-center gap-3 px-2 py-2 text-gray-900 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-300 font-space text-base"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <User className="h-4 w-4" />
                            Profile
                          </Link>
                          <Link
                            href="/settings"
                            className="flex items-center gap-3 px-2 py-2 text-gray-900 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-300 font-space text-base"
                            onClick={() => setIsMenuOpen(false)}
                          >
                            <Settings className="h-4 w-4" />
                            Settings
                          </Link>
                          <Button
                            className="flex items-center gap-3 px-2 py-2 text-gray-900 hover:text-white hover:bg-gray-800/50 rounded-lg transition-colors duration-300 font-space text-base bg-transparent border-0"
                            variant={"link"}
                            onClick={() => {
                              setIsMenuOpen(false);
                              authClient.signOut();
                            }}
                          >
                            <LogOut className="h-4 w-4" />
                            Sign Out
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <Button
                        asChild
                        className="bg-white hover:bg-gray-100 text-black px-6 py-3 rounded-full transition-all duration-300 w-full font-space font-medium text-base"
                      >
                        <Link
                          href="/sign-in"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          Sign In
                        </Link>
                      </Button>
                    )}
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
