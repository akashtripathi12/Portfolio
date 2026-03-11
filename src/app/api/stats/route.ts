import { NextResponse } from 'next/server';

const CF_HANDLE = 'akashtripathiak04';
const LC_USERNAME = 'akashtripathiak04';

export const revalidate = 3600; // ISR: revalidate every 1 hour

// --- Codeforces ---
async function fetchCodeforcesData() {
  try {
    const [infoRes, ratingRes, statusRes] = await Promise.all([
      fetch(`https://codeforces.com/api/user.info?handles=${CF_HANDLE}`, { next: { revalidate: 3600 } }),
      fetch(`https://codeforces.com/api/user.rating?handle=${CF_HANDLE}`, { next: { revalidate: 3600 } }),
      fetch(`https://codeforces.com/api/user.status?handle=${CF_HANDLE}&count=10000`, { next: { revalidate: 3600 } }),
    ]);

    const infoJson = await infoRes.json();
    const ratingJson = await ratingRes.json();
    const statusJson = await statusRes.json();

    if (infoJson.status !== 'OK') throw new Error('CF info failed');

    const user = infoJson.result[0];

    // Full rating history
    const ratingHistory: Array<{ contestName: string; newRating: number; ratingUpdateTimeSeconds: number }> =
      ratingJson.status === 'OK' ? ratingJson.result : [];

    // Count unique AC problems
    let problemsSolved = 0;
    if (statusJson.status === 'OK') {
      const solved = new Set<string>();
      for (const sub of statusJson.result) {
        if (sub.verdict === 'OK') {
          solved.add(`${sub.problem.contestId}-${sub.problem.index}`);
        }
      }
      problemsSolved = solved.size;
    }

    return {
      handle: user.handle,
      rating: user.rating ?? 0,
      maxRating: user.maxRating ?? 0,
      rank: user.rank ?? 'unrated',
      maxRank: user.maxRank ?? 'unrated',
      contestsCount: ratingHistory.length,
      problemsSolved,
      ratingHistory: ratingHistory.map((r) => ({
        rating: r.newRating,
        date: new Date(r.ratingUpdateTimeSeconds * 1000).toLocaleDateString('en-US', { month: 'short', year: '2-digit' }),
        contestName: r.contestName,
      })),
    };
  } catch {
    return null;
  }
}

// --- LeetCode GraphQL ---
async function fetchLeetCodeData() {
  const query = `
    query userProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile { ranking }
        submissionCalendar
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
      userContestRanking(username: $username) {
        rating
        globalRanking
        attendedContestsCount
      }
    }
  `;

  try {
    const res = await fetch('https://leetcode.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Referer': 'https://leetcode.com',
      },
      body: JSON.stringify({ query, variables: { username: LC_USERNAME } }),
      next: { revalidate: 3600 },
    });

    const json = await res.json();
    const data = json?.data;
    if (!data?.matchedUser) throw new Error('LeetCode user not found');

    const submissions: Array<{ difficulty: string; count: number }> = data.matchedUser.submitStatsGlobal.acSubmissionNum;
    const total = submissions.find((s) => s.difficulty === 'All')?.count ?? 0;
    const easy = submissions.find((s) => s.difficulty === 'Easy')?.count ?? 0;
    const medium = submissions.find((s) => s.difficulty === 'Medium')?.count ?? 0;
    const hard = submissions.find((s) => s.difficulty === 'Hard')?.count ?? 0;

    // Submission calendar: { "unix_timestamp": count }
    const calendarRaw: Record<string, number> = JSON.parse(data.matchedUser.submissionCalendar ?? '{}');

    // Get last 52 weeks worth of data
    const now = Math.floor(Date.now() / 1000);
    const oneYear = 52 * 7 * 24 * 3600;
    const calendar = Object.entries(calendarRaw)
      .filter(([ts]) => Number(ts) >= now - oneYear)
      .map(([ts, count]) => ({ ts: Number(ts), count }))
      .sort((a, b) => a.ts - b.ts);

    return {
      username: data.matchedUser.username,
      ranking: data.matchedUser.profile.ranking,
      totalSolved: total,
      easySolved: easy,
      mediumSolved: medium,
      hardSolved: hard,
      contestRating: Math.round(data.userContestRanking?.rating ?? 0),
      contestsAttended: data.userContestRanking?.attendedContestsCount ?? 0,
      calendar,
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const [cf, lc] = await Promise.all([fetchCodeforcesData(), fetchLeetCodeData()]);
  return NextResponse.json({ codeforces: cf, leetcode: lc });
}
