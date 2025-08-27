"use client";

import type React from "react";

import { useEffect, useRef, useState } from "react";
import { Application } from "@splinetool/runtime";

interface SplineSceneProps {
  sceneUrl?: string;
  className?: string;
  fallbackContent?: React.ReactNode;
}

export function SplineScene({
  sceneUrl = "https://prod.spline.design/TiEcE1i3VzgzHdPK/scene.splinecode",
  className = "w-full h-full",
  fallbackContent,
}: SplineSceneProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const app = new Application(canvasRef.current);

    app
      .load(sceneUrl)
      .then(() => {
        setIsLoading(false);
        setError(null);
      })
      .catch((err) => {
        console.error("Failed to load Spline scene:", err);
        setError("Failed to load 3D scene");
        setIsLoading(false);
      });

    return () => {
      app.dispose();
    };
  }, [sceneUrl]);

  if (error) {
    return (
      <div
        className={`${className} flex items-center justify-center bg-muted rounded-lg`}
      >
        {fallbackContent || (
          <div className="text-center text-muted-foreground">
            <div className="text-sm">3D Scene Unavailable</div>
            <div className="text-xs mt-1">
              Interactive content will load here
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`${className} relative`}>
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-muted rounded-lg z-10">
          <div className="text-center text-muted-foreground">
            <div className="animate-spin w-6 h-6 border-2 border-primary border-t-transparent rounded-full mx-auto mb-2" />
            <div className="text-sm">Loading 3D Scene...</div>
          </div>
        </div>
      )}
      <canvas
        ref={canvasRef}
        className="w-full h-full rounded-lg"
        style={{ display: isLoading ? "none" : "block" }}
      />
    </div>
  );
}
