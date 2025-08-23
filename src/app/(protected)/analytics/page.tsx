"use client";

import { Card, CardContent } from "@/components/ui/card";
import { GlowingEffect } from "@/components/ui/glowing-effect";
import { BarChart3, TrendingUp, Users, FileText } from "lucide-react";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  const stats = [
    {
      title: "Total Cases",
      value: "24",
      change: "+12%",
      icon: FileText,
      color: "text-blue-600",
    },
    {
      title: "Active Projects",
      value: "8",
      change: "+5%",
      icon: BarChart3,
      color: "text-green-600",
    },
    {
      title: "Team Members",
      value: "12",
      change: "+2%",
      icon: Users,
      color: "text-purple-600",
    },
    {
      title: "Success Rate",
      value: "94%",
      change: "+3%",
      icon: TrendingUp,
      color: "text-orange-600",
    },
  ];

  return (
    <div className="space-y-8">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold tracking-tight text-foreground flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          Analytics
        </h1>
        <p className="text-muted-foreground mt-2">
          Track your legal work performance and insights
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.1 }}
          >
            <Card className="relative overflow-hidden">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={2}
              />
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {stat.title}
                    </p>
                    <p className="text-2xl font-bold text-foreground">
                      {stat.value}
                    </p>
                    <p className="text-sm text-green-600">{stat.change}</p>
                  </div>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
