import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || process.env.API_URL || "https://abrar_portfolio_backend.vercel.app";
    const response = await fetch(`${backendUrl.replace(/\/$/, "")}/api/leads`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    });

    const contentType = response.headers.get("content-type") || "";
    const responseText = await response.text();
    let parsedBody: unknown = null;

    if (contentType.includes("application/json") && responseText) {
      try {
        parsedBody = JSON.parse(responseText);
      } catch {
        parsedBody = null;
      }
    }

    if (!response.ok) {
      const backendMessage = parsedBody && typeof parsedBody === "object" && "message" in parsedBody
        ? (parsedBody as { message?: string }).message
        : responseText || "Submission failed";

      return NextResponse.json(
        {
          success: false,
          message: backendMessage || "Submission failed"
        },
        { status: response.status }
      );
    }

    if (parsedBody && typeof parsedBody === "object") {
      return NextResponse.json(parsedBody, { status: response.status });
    }

    return NextResponse.json({ success: true, message: responseText || "Submission successful" }, { status: response.status });
  } catch (error) {
    console.error("Proxy lead submission failed", error);
    return NextResponse.json(
      {
        success: false,
        message: "Unable to submit your request right now. Please try again later."
      },
      { status: 502 }
    );
  }
}
