const API_BOOK = "https://hayoonmin.vercel.app/api/book";
const API_SUMMARY = "https://hayoonmin.vercel.app/api/summary";

async function generate() {
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const lang = document.getElementById("lang").value;
    const tone = document.getElementById("tone").value;
    const numInput = document.getElementById("num").value;
    const num = parseInt(numInput, 10) || 10;  // 숫자가 아니면 10으로 기본 설정

    if (!title) {
        alert("책 제목을 꼭 입력해 주세요.");
        return;
    }

    document.getElementById("intro").innerText = "책 정보를 가져오는 중이에요...";
    document.getElementById("summary").innerText = "요약을 만드는 중이에요...";

    try {
        // 책 정보 받아오기
        const introRes = await fetch(API_BOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, author })
        });

        if (!introRes.ok) {
            throw new Error("책 정보를 가져오는 데 실패했어요.");
        }

        const introData = await introRes.json();
        const intro = introData.description || "책 소개가 없어요.";
        document.getElementById("intro").innerText = intro;

        // 요약 만들기 요청
        const sumRes = await fetch(API_SUMMARY, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                author,
                description: intro,
                tone,
                lang,
                num
            })
        });

        if (!sumRes.ok) {
            throw new Error("요약을 만드는 데 실패했어요.");
        }

        const sumData = await sumRes.json();
        document.getElementById("summary").innerText = sumData.summary || "요약이 없어요.";

    } catch (error) {
        document.getElementById("intro").innerText = "책 정보를 가져오는 데 문제가 생겼어요.";
        document.getElementById("summary").innerText = "";
        alert(error.message);
    }
}

function copyText(id) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text)
        .then(() => alert("복사했어요!"))
        .catch(() => alert("복사에 실패했어요."));
}
