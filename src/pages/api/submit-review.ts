import type { APIRoute } from "astro";
import { createClient } from "@sanity/client";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  const writeClient = createClient({
    projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
    dataset: import.meta.env.PUBLIC_SANITY_DATASET ?? "production",
    useCdn: false,
    apiVersion: "2024-01-01",
    token: import.meta.env.SANITY_WRITE_TOKEN,
  });

  let body: Record<string, unknown>;

  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: "Invalid request body." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const { name, role, company, text, rating, linkedinUrl, lang, accessToken } =
    body;

  // Token validation
  const validToken = import.meta.env.REVIEW_ACCESS_TOKEN;
  if (!validToken || accessToken !== validToken) {
    return new Response(JSON.stringify({ error: "Unauthorized." }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  // Required field validation
  if (!name || typeof name !== "string" || !name.trim()) {
    return new Response(JSON.stringify({ error: "Name is required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }
  if (!text || typeof text !== "string" || !text.trim()) {
    return new Response(JSON.stringify({ error: "Review text is required." }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  const sanitize = (val: unknown, max: number): string | undefined => {
    if (!val || typeof val !== "string") return undefined;
    const trimmed = val.trim();
    return trimmed.length > 0 ? trimmed.slice(0, max) : undefined;
  };

  const isEs = lang === "es";

  const doc: Record<string, unknown> & { _type: string } = {
    _type: "review",
    name: sanitize(name, 100)!,
    source: "direct",
    lang: isEs ? "es" : "en",
    published: false,
    // Save text and role in the correct language field
    ...(isEs
      ? {
          textEs: sanitize(text, 2000)!,
          roleEs: sanitize(role, 100),
        }
      : {
          text: sanitize(text, 2000)!,
          role: sanitize(role, 100),
        }),
  };

  const companyVal = sanitize(company, 100);
  if (companyVal) doc.company = companyVal;

  if (rating !== undefined && rating !== null) {
    const ratingNum = Number(rating);
    if (!isNaN(ratingNum) && ratingNum >= 1 && ratingNum <= 5) {
      doc.rating = ratingNum;
    }
  }

  const linkedinVal = sanitize(linkedinUrl, 300);
  if (linkedinVal) {
    // Basic URL validation
    if (
      linkedinVal.startsWith("https://") ||
      linkedinVal.startsWith("http://")
    ) {
      doc.linkedinUrl = linkedinVal;
    }
  }

  try {
    await writeClient.create(doc);

    return new Response(JSON.stringify({ success: true }), {
      status: 201,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Review submission error:", err);
    return new Response(
      JSON.stringify({ error: "Failed to submit review. Please try again." }),
      { status: 500, headers: { "Content-Type": "application/json" } },
    );
  }
};
