import { describe, expect, it, vi } from "vitest";
import { fallbackGitHubActivity, fetchGitHubActivity, normalizeGitHubData } from "./github";

describe("normalizeGitHubData", () => {
  it("normalizes public profile and recent events", () => {
    const result = normalizeGitHubData(
      { public_repos: 9, followers: 14, html_url: "https://github.com/ilyastorunn" },
      [{ type: "PushEvent", repo: { name: "ilyastorunn/quiet-app" } }, { type: "CreateEvent" }],
    );
    expect(result).toMatchObject({ recentEvents: 2, publicRepos: 9, followers: 14, latestEvent: "PushEvent", latestRepository: "ilyastorunn/quiet-app" });
  });

  it("uses safe values for malformed data", () => {
    expect(normalizeGitHubData({ public_repos: "many" }, { nope: true })).toMatchObject({ recentEvents: 0, publicRepos: 24, followers: 0 });
  });
});

describe("fetchGitHubActivity", () => {
  it("throws when GitHub is rate limited", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response("rate limited", { status: 403 }));
    await expect(fetchGitHubActivity(fetcher as typeof fetch)).rejects.toThrow("GitHub unavailable");
  });

  it("provides a stable fallback snapshot", () => {
    expect(fallbackGitHubActivity()).toMatchObject({ username: "ilyastorunn", recentEvents: 12, profileUrl: "https://github.com/ilyastorunn" });
  });
});
