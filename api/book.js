export default async function handler(req, res) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();
    if (req.method !== 'POST') return res.status(405).json({ error: 'POST only' });

    const { title, author } = req.body;

    try {
        const q = encodeURIComponent(`${title} ${author}`);
        const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&key=${process.env.GOOGLE_KEY}&maxResults=1`;

        const apiRes = await fetch(url);
        const data = await apiRes.json();

        if (!data.items || data.items.length === 0) return res.status(200).json({ description: '' });

        const info = data.items[0].volumeInfo;
        return res.status(200).json({ description: info.description || '' });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}
