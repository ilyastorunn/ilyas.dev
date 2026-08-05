export interface GitHubProfileResponse {
  public_repos?: unknown;
  followers?: unknown;
  html_url?: unknown;
}

export interface GitHubEventResponse {
  id?: unknown;
  type?: unknown;
  created_at?: unknown;
  repo?: { name?: unknown };
}

export interface GitHubContribution {
  date: string;
  count: number;
  level: number;
}

export interface GitHubRepositoryActivity {
  name: string;
  count: number;
  url: string;
}

export interface GitHubActivity {
  username: string;
  recentEvents: number;
  publicRepos: number;
  followers: number;
  latestEvent: string | null;
  latestRepository: string | null;
  contributions: GitHubContribution[];
  totalContributions: number;
  topRepositories: GitHubRepositoryActivity[];
  profileUrl: string;
  fetchedAt: string;
}

const FALLBACK: GitHubActivity = {
  username: "ilyastorunn",
  recentEvents: 12,
  publicRepos: 24,
  followers: 0,
  latestEvent: null,
  latestRepository: null,
  contributions: [],
  totalContributions: 0,
  topRepositories: [],
  profileUrl: "https://github.com/ilyastorunn",
  fetchedAt: "fallback",
};

export function fallbackGitHubActivity(): GitHubActivity {
  return { ...FALLBACK };
}

export function parseContributionGraph(html: string): Pick<GitHubActivity, "contributions" | "totalContributions"> {
  const contributions: GitHubContribution[] = [];
  const dayPattern = /<td(?=[^>]*\bdata-date="([^"]+)")(?=[^>]*\bdata-level="([0-4])")[^>]*>\s*<\/td>\s*<tool-tip[^>]*>([^<]*)<\/tool-tip>/g;
  for (const match of html.matchAll(dayPattern)) {
    const countMatch = match[3]?.match(/([\d,]+) contributions?/i);
    contributions.push({
      date: match[1],
      count: countMatch ? Number(countMatch[1].replaceAll(",", "")) : 0,
      level: Number(match[2]),
    });
  }
  contributions.sort((a, b) => a.date.localeCompare(b.date));
  const totalMatch = html.match(/id="js-contribution-activity-description"[^>]*>\s*([\d,]+)\s+contributions/i);
  const calculatedTotal = contributions.reduce((total, day) => total + day.count, 0);
  return {
    contributions,
    totalContributions: totalMatch ? Number(totalMatch[1].replaceAll(",", "")) : calculatedTotal,
  };
}

export function normalizeGitHubData(profile: GitHubProfileResponse, events: unknown, contributionHtml = ""): GitHubActivity {
  const safeEvents = Array.isArray(events) ? events.filter((event): event is GitHubEventResponse => Boolean(event) && typeof event === "object") : [];
  const latest = safeEvents[0];
  const repositoryCounts = new Map<string, number>();
  safeEvents.forEach((event) => {
    if (typeof event.repo?.name === "string") repositoryCounts.set(event.repo.name, (repositoryCounts.get(event.repo.name) ?? 0) + 1);
  });
  const topRepositories = [...repositoryCounts.entries()]
    .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
    .slice(0, 3)
    .map(([repository, count]) => ({ name: repository.split("/").at(-1) ?? repository, count, url: `https://github.com/${repository}` }));
  const graph = parseContributionGraph(contributionHtml);
  return {
    username: "ilyastorunn",
    recentEvents: safeEvents.length,
    publicRepos: typeof profile.public_repos === "number" ? profile.public_repos : FALLBACK.publicRepos,
    followers: typeof profile.followers === "number" ? profile.followers : 0,
    latestEvent: typeof latest?.type === "string" ? latest.type : null,
    latestRepository: typeof latest?.repo?.name === "string" ? latest.repo.name : null,
    contributions: graph.contributions,
    totalContributions: graph.totalContributions,
    topRepositories,
    profileUrl: typeof profile.html_url === "string" ? profile.html_url : FALLBACK.profileUrl,
    fetchedAt: new Date().toISOString(),
  };
}

export async function fetchGitHubActivity(fetcher: typeof fetch = fetch, token?: string): Promise<GitHubActivity> {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "User-Agent": "ilyas-dev-portfolio",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  if (token) headers.Authorization = `Bearer ${token}`;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 4000);
  try {
    const [profileResponse, eventsResponse, contributionResponse] = await Promise.all([
      fetcher("https://api.github.com/users/ilyastorunn", { headers, signal: controller.signal }),
      fetcher("https://api.github.com/users/ilyastorunn/events/public?per_page=30", { headers, signal: controller.signal }),
      fetcher("https://github.com/users/ilyastorunn/contributions", {
        headers: { Accept: "text/html", "User-Agent": "ilyas-dev-portfolio" },
        signal: controller.signal,
      }),
    ]);
    if (!contributionResponse.ok) throw new Error(`GitHub contributions unavailable: ${contributionResponse.status}`);
    const profile = profileResponse.ok ? await profileResponse.json() : {};
    const events = eventsResponse.ok ? await eventsResponse.json() : [];
    return normalizeGitHubData(profile, events, await contributionResponse.text());
  } finally {
    clearTimeout(timeout);
  }
}
