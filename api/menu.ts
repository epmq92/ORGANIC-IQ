import type { VercelRequest, VercelResponse } from '@vercel/node';

// This serverless function reads/writes `menu-store.json` in your GitHub repo.
// Required environment variables (set in Vercel):
// - GITHUB_TOKEN : a personal access token with `repo` scope
// - GITHUB_REPO  : owner/repo (e.g. epmq92/ORGANIC-IQ)

const GITHUB_API = 'https://api.github.com';

async function getFile(repo: string, path: string, token: string) {
  const url = `${GITHUB_API}/repos/${repo}/contents/${encodeURIComponent(path)}`;
  const res = await fetch(url, {
    headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' },
  });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub GET failed: ${res.status}`);
  return res.json();
}

async function putFile(repo: string, path: string, token: string, content: string, sha?: string) {
  const url = `${GITHUB_API}/repos/${repo}/contents/${encodeURIComponent(path)}`;
  const body: any = {
    message: `Update menu-store.json via site admin`,
    content: Buffer.from(content, 'utf8').toString('base64'),
    committer: { name: 'Site Admin', email: 'site@example.com' },
    author: { name: 'Site Admin', email: 'site@example.com' },
  };
  if (sha) body.sha = sha;
  const res = await fetch(url, {
    method: 'PUT',
    headers: { Authorization: `token ${token}`, Accept: 'application/vnd.github.v3+json' },
    body: JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(`GitHub PUT failed: ${res.status} ${data?.message || ''}`);
  return data;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const repo = process.env.GITHUB_REPO;
  const token = process.env.GITHUB_TOKEN;
  const path = 'menu-store.json';

  if (req.method === 'GET') {
    if (!repo || !token) {
      return res.status(404).json({ success: false, message: 'Not configured on server' });
    }
    try {
      const file = await getFile(repo, path, token);
      if (!file) return res.json({ success: true, data: null });
      const content = Buffer.from(file.content, 'base64').toString('utf8');
      return res.json({ success: true, data: JSON.parse(content) });
    } catch (e: any) {
      console.error('GET /api/menu error', e);
      return res.status(500).json({ success: false, message: String(e) });
    }
  }

  if (req.method === 'POST') {
    if (!repo || !token) {
      return res.status(404).json({ success: false, message: 'Server not configured: set GITHUB_REPO and GITHUB_TOKEN in Vercel' });
    }
    const body = req.body;
    if (!body) return res.status(400).json({ success: false, message: 'Missing body' });
    try {
      const existing = await getFile(repo, path, token);
      const content = JSON.stringify(body, null, 2);
      const result = await putFile(repo, path, token, content, existing?.sha);
      return res.json({ success: true, data: body, commit: result?.commit });
    } catch (e: any) {
      console.error('POST /api/menu error', e);
      return res.status(500).json({ success: false, message: String(e) });
    }
  }

  res.setHeader('Allow', 'GET, POST');
  res.status(405).end('Method Not Allowed');
}
