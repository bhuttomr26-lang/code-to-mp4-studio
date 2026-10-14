export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Use POST" });
  }
  const base = process.env.COLAB_BACKEND_URL;
  const token = process.env.BACKEND_TOKEN;
  if (!base || !token) {
    return res.status(503).json({ error: "Backend is not configured. Set COLAB_BACKEND_URL and BACKEND_TOKEN in Vercel." });
  }
  try {
    const upstream = await fetch(new URL("/render", base), {
      method: "POST",
      headers: { "Content-Type": "application/json", "X-Backend-Token": token },
      body: JSON.stringify(req.body || {}),
      signal: AbortSignal.timeout(240000)
    });
    const text = await upstream.text();
    res.setHeader("Content-Type", upstream.headers.get("content-type") || "application/json");
    return res.status(upstream.status).send(text);
  } catch (error) {
    return res.status(502).json({ error: "Colab backend unreachable. Make sure the notebook and tunnel are running.", detail: error.message });
  }
}
