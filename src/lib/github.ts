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

export interface GitHubActivity {
  username: string;
  recentEvents: number;
  publicRepos: number;
  followers: number;
  latestEvent: string | null;
  latestRepository: string | null;
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
  profileUrl: "https://github.com/ilyastorunn",
  fetchedAt: "fallback",
};

export function fallbackGitHubActivity(): GitHubActivity {
  return { ...FALLBACK };
}

export function normalizeGitHubData(profile: GitHubProfileResponse, events: unknown): GitHubActivity {
  const safeEvents = Array.isArray(events) ? events.filter((event): event is GitHubEventResponse => Boolean(event) && typeof event === "object") : [];
  const latest = safeEvents[0];
  return {
    username: "ilyastorunn",
    recentEvents: safeEvents.length,
    publicRepos: typeof profile.public_repos === "number" ? profile.public_repos : FALLBACK.publicRepos,
    followers: typeof profile.followers === "number" ? profile.followers : 0,
    latestEvent: typeof latest?.type === "string" ? latest.type : null,
    latestRepository: typeof latest?.repo?.name === "string" ? latest.repo.name : null,
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
    const [profileResponse, eventsResponse] = await Promise.all([
      fetcher("https://api.github.com/users/ilyastorunn", { headers, signal: controller.signal }),
      fetcher("https://api.github.com/users/ilyastorunn/events/public?per_page=30", { headers, signal: controller.signal }),
    ]);
    if (!profileResponse.ok || !eventsResponse.ok) throw new Error(`GitHub unavailable: ${profileResponse.status}/${eventsResponse.status}`);
    return normalizeGitHubData(await profileResponse.json(), await eventsResponse.json());
  } finally {
    clearTimeout(timeout);
  }
}
