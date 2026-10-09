import { NextRequest, NextResponse } from "next/server";
import { createSessionToken, SESSION_COOKIE_NAME } from "@/lib/auth";
import { recordActivity } from "@/lib/store";

export async function POST(req: NextRequest) {
  try {
    const { username, password } = await req.json();

    const expectedUser = process.env.ADMIN_USERNAME || "admin";
    const expectedPass = process.env.ADMIN_PASSWORD || "Electra@Solar2026!";

    if (username !== expectedUser || password !== expectedPass) {
      return NextResponse.json(
        { success: false, message: "Invalid administrator credentials" },
        { status: 401 }
      );
    }

    const token = createSessionToken({
      username,
      role: "superadmin",
      loginAt: new Date().toISOString(),
    });

    recordActivity("Admin Login", "Auth", `Administrator '${username}' logged in successfully.`, username);

    const isLocalhost = req.headers.get("host")?.includes("localhost");

    const response = NextResponse.json({
      success: true,
      message: "Authentication successful",
      user: { username, role: "superadmin" },
      token,
    });

    response.cookies.set({
      name: SESSION_COOKIE_NAME,
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" && !isLocalhost,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (err: any) {
    return NextResponse.json(
      { success: false, message: "Login processing failed" },
      { status: 500 }
    );
  }
}
