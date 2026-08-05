import { describe, expect, it, vi } from "vitest";
import { fallbackGitHubActivity, fetchGitHubActivity, normalizeGitHubData, parseContributionGraph } from "./github";

const contributionHtml = `
  <h2 id="js-contribution-activity-description">7 contributions in the last year</h2>
  <td data-date="2026-08-05" data-level="2"></td>
  <tool-tip>3 contributions on August 5th.</tool-tip>
  <td data-level="0" data-date="2026-08-04"></td>
  <tool-tip>No contributions on August 4th.</tool-tip>
`;

describe("normalizeGitHubData", () => {
  it("normalizes public profile and recent events", () => {
    const result = normalizeGitHubData(
      { public_repos: 9, followers: 14, html_url: "https://github.com/ilyastorunn" },
      [{ type: "PushEvent", repo: { name: "ilyastorunn/quiet-app" } }, { type: "CreateEvent" }], contributionHtml,
    );
    expect(result).toMatchObject({ recentEvents: 2, publicRepos: 9, followers: 14, latestEvent: "PushEvent", latestRepository: "ilyastorunn/quiet-app", totalContributions: 7 });
    expect(result.topRepositories[0]).toMatchObject({ name: "quiet-app", count: 1 });
  });

  it("uses safe values for malformed data", () => {
    expect(normalizeGitHubData({ public_repos: "many" }, { nope: true })).toMatchObject({ recentEvents: 0, publicRepos: 24, followers: 0 });
  });
});

describe("parseContributionGraph", () => {
  it("extracts, counts, and sorts contribution days", () => {
    expect(parseContributionGraph(contributionHtml)).toEqual({
      totalContributions: 7,
      contributions: [
        { date: "2026-08-04", count: 0, level: 0 },
        { date: "2026-08-05", count: 3, level: 2 },
      ],
    });
  });
});

describe("fetchGitHubActivity", () => {
  it("throws when GitHub is rate limited", async () => {
    const fetcher = vi.fn().mockResolvedValue(new Response("rate limited", { status: 403 }));
    await expect(fetchGitHubActivity(fetcher as typeof fetch)).rejects.toThrow("GitHub contributions unavailable");
  });

  it("keeps the live heatmap when REST rate limits are exhausted", async () => {
    const fetcher = vi.fn().mockImplementation(async (input: RequestInfo | URL) => {
      if (String(input).includes("/contributions")) return new Response(contributionHtml);
      return new Response("rate limited", { status: 403 });
    });
    await expect(fetchGitHubActivity(fetcher as typeof fetch)).resolves.toMatchObject({ totalContributions: 7, recentEvents: 0 });
  });

  it("provides a stable fallback snapshot", () => {
    expect(fallbackGitHubActivity()).toMatchObject({ username: "ilyastorunn", recentEvents: 12, profileUrl: "https://github.com/ilyastorunn" });
  });
});
