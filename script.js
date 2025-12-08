async function generate() {
    const title = document.getElementById("titleInput").value;
    const author = document.getElementById("authorInput").value;
    const lang = document.getElementById("langSelect").value;

    document.getElementById("introBox").innerText = "Google Books에서 불러오는 중...";
    document.getElementById("summaryBox").innerText = "생성 중...";

    // GitHub Pages → Vercel 서버 호출
    const res = await fetch("https://YOUR-VERCEL-APP.vercel.app/api/summary", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, lang })
    });

    const data = await res.json();

    document.getElementById("introBox").innerText = data.intro;
    document.getElementById("summaryBox").innerText = data.summary;
}
