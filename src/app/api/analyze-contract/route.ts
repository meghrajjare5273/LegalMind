// src/app/api/analyze-contract/route.ts
// Note: Create this file if it doesn't exist, or replace the boilerplate in your predefined route.

import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000/api/v1"; // Set this in .env

export async function POST(req: NextRequest) {
  try {
    // Parse the form data
    const formData = await req.formData();
    const file = formData.get("file") as File;

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    // Create new FormData to send to backend
    const backendFormData = new FormData();
    backendFormData.append("file", file);

    // Forward to backend
    const response = await fetch(`${BACKEND_URL}/contract-analysis/analyze`, {
      method: "POST",
      body: backendFormData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      return NextResponse.json(
        { error: errorData.detail || "Backend error" },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error in analyze-contract route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
