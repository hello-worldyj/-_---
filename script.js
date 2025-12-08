// 네가 실제 사용하는 도메인으로 바꿔야 해!
// 예: 커스텀 도메인 사용 시
const API_BOOK = "https://hayoonmin.vercel.app/api/book";
const API_SUMMARY = "https://hayoonmin.vercel.app/api/summary";

// 만약 기본 도메인 쓴다면 아래처럼 바꿔도 돼
// const API_BOOK = "https://hayoon-p9rdn1el5-byeongmins-projects.vercel.app/api/book";
// const API_SUMMARY = "https://hayoon-p9rdn1el5-byeongmins-projects.vercel.app/api/summary";

async function generate() {
    const title = document.getElementById("title").value.trim();
    const author = document.getElementById("author").value.trim();
    const lang = document.getElementById("lang").value;
    const tone = document.getElementById("tone").value;
    const num = document.getElementById("num").value;

    if (!title) {
        alert("책 제목을 입력해주세요.");
        return;
    }

    document.getElementById("intro").innerText = "Google Books에서 불러오는 중...";
    document.getElementById("summary").innerText = "생성 중...";

    try {
        // 1) Google Books API → 설명 가져오기
        const introRes = await fetch(API_BOOK, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ title, author })
        });
        const introData = await introRes.json();

        const intro = introData.description || "설명이 없습니다.";
        document.getElementById("intro").innerText = intro;

        // 2) ChatGPT API → 서머리 생성
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

        const sumData = await sumRes.json();
        document.getElementById("summary").innerText = sumData.summary || "서머리 생성 실패";

    } catch (error) {
        document.getElementById("intro").innerText = "책 설명을 불러오는 데 실패했습니다.";
        document.getElementById("summary").innerText = "서머리 생성 중 오류가 발생했습니다.";
        console.error(error);
        alert("오류가 발생했습니다. 콘솔을 확인해주세요.");
    }
}

function copyText(id) {
    const text = document.getElementById(id).innerText;
    navigator.clipboard.writeText(text).then(() => {
        alert("복사 완료!");
    }).catch(() => {
        alert("복사에 실패했습니다.");
    });
}
