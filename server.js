require('dotenv').config();
const express = require('express');
const path = require('path');

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.static('.'));

// API: Get book description from Google Books
app.post('/api/book', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { title, author } = req.body;

    try {
        const q = encodeURIComponent(`${title} ${author}`);
        const url = `https://www.googleapis.com/books/v1/volumes?q=${q}&key=${process.env.GOOGLE_KEY}&maxResults=1`;

        const apiRes = await fetch(url);
        const data = await apiRes.json();

        if (!data.items || data.items.length === 0) {
            return res.status(200).json({ description: '' });
        }

        const info = data.items[0].volumeInfo;
        return res.status(200).json({ description: info.description || '' });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

// API: Generate summary using OpenAI
app.post('/api/summary', async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    if (req.method === 'OPTIONS') return res.status(200).end();

    const { title, author, description, tone, lang, num } = req.body;

    const prompt = `
언어: ${lang}
톤: ${tone}
문장 수: 정확히 ${num}문장으로 요약해주세요. 반드시 ${num}개의 문장을 작성해야 합니다.

다음 책 설명을 바탕으로 요약해줘.
제목: ${title}
저자: ${author}

설명:
${description}

중요: 요약은 반드시 정확히 ${num}개의 문장으로 구성되어야 합니다. 더 짧거나 길게 작성하지 마세요.
`;

    try {
        const apiRes = await fetch('https://api.openai.com/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${process.env.OPENAI_KEY}`
            },
            body: JSON.stringify({
                model: 'gpt-4o-mini',
                messages: [{ role: 'user', content: prompt }]
            })
        });

        const data = await apiRes.json();
        const output = data.choices?.[0]?.message?.content || '';

        return res.status(200).json({ summary: output });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
});
