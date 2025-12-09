<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>책 소개 & 요약 만들기</title>
    <link rel="stylesheet" href="style.css" />
</head>
<body>

<div class="container">

    <div class="header">
        <img src="profile.png" alt="Profile" class="profile-img" />
        <h1>책 소개와 요약 만들기</h1>
    </div>

    <div class="input-group">
        <label for="title">책 제목</label>
        <input type="text" id="title" placeholder="예: 해리포터" />
    </div>

    <div class="input-group">
        <label for="author">작가 이름</label>
        <input type="text" id="author" placeholder="예: J.K. Rowling" />
    </div>

    <div class="row">
        <div>
            <label for="lang">언어 선택</label>
            <select id="lang">
                <option value="한국어">한국어</option>
                <option value="English">영어</option>
                <option value="日本語">일본어</option>
                <option value="中文">중국어</option>
            </select>
        </div>
        <div>
            <label for="tone">글 분위기 선택</label>
            <select id="tone">
                <option value="neutral">보통</option>
                <option value="fun">재미있게</option>
                <option value="serious">진지하게</option>
                <option value="simple">쉽고 간단하게</option>
            </select>
        </div>
    </div>

    <div class="input-group">
        <label for="num">요약 문장 수 (최대 20)</label>
        <input type="number" id="num" value="10" min="1" max="20" />
    </div>

    <button class="generate-btn" onclick="generate()">만들기</button>

    <div class="result-section">
        <h2>자동으로 만든 책 소개</h2>
        <p id="intro">아직 책 정보를 가져오지 않았어요.</p>
        <button class="copy-btn" onclick="copyText('intro')">소개 복사</button>
    </div>

    <div class="result-section">
        <h2>자동으로 만든 요약</h2>
        <p id="summary">아직 요약이 없어요.</p>
        <button class="copy-btn" onclick="copyText('summary')">요약 복사</button>
    </div>

</div>

<script src="script.js"></script>
</body>
</html>
