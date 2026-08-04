import type { APIRoute } from "astro";
import { fallbackGitHubActivity, fetchGitHubActivity } from "../../lib/github";

export const prerender = false;

export const GET: APIRoute = async () => {
  let activity = fallbackGitHubActivity();
  let source = "fallback";
  try {
    activity = await fetchGitHubActivity(fetch);
    source = "github";
  } catch {
    // The card intentionally keeps its calm fallback state.
  }
  return new Response(JSON.stringify({ ...activity, source }), {
    headers: {
      "Content-Type": "application/json; charset=utf-8",
      "Cache-Control": "public, max-age=300, s-maxage=3600, stale-while-revalidate=86400",
    },
  });
};
