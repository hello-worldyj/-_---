export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ error: "POST only" });
    }

    const { title, author, description, tone, lang, num } = req.body;

    const prompt = `
언어: ${lang}
톤: ${tone}
문장 수: 최대 ${num}

다음 책의 설명을 기반으로 서머리를 작성하라.
제목: ${title}
저자: ${author}

설명:
${description}
`;

    try {
        const apiRes = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${process.env.OPENAI_KEY}`
            },
            body: JSON.stringify({
                model: "gpt-4o-mini",
                messages: [{ role: "user", content: prompt }]
            })
        });

        const data = await apiRes.json();
        const output = data.choices?.[0]?.message?.content ?? "";

        return res.status(200).json({ summary: output });

    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
}
