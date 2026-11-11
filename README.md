# 모바일 청첩장

VS Code + GitHub + Vercel로 사용하는 개인용 모바일 청첩장입니다.

## 가장 먼저 수정할 것

### 1. 메인 사진
`images/main.jpg`

### 2. 갤러리 사진
`images/gallery/01.jpg` ~ `09.jpg`

### 3. 지도
`images/map.png`

권장 지도 이미지 크기: **401 × 333px**

### 4. 배경음악
`music/wedding.mp3`

### 5. 이름/날짜/장소/계좌
`index.html`에서 `##`로 표시된 부분을 찾아 수정합니다.

### 6. 카운트다운 날짜
`script.js`에서 다음을 수정합니다.

```js
const WEDDING_DATE = "2027-05-15T12:30:00+09:00";
const WEDDING_YEAR = 2027;
const WEDDING_MONTH = 5;
const WEDDING_DAY = 15;
```

## 로컬에서 확인

VS Code에서 `index.html`을 열어 Live Server 확장 프로그램으로 실행하거나,
간단한 정적 서버를 사용하면 됩니다.

## GitHub / Vercel

이 프로젝트는 별도의 빌드 과정이 없는 HTML/CSS/JS 정적 사이트입니다.

GitHub에 업로드한 뒤 Vercel에서 해당 저장소를 Import하면 됩니다.

Vercel 설정:
- Framework Preset: Other
- Build Command: 비워두기
- Output Directory: `.`

## 주의

`##`는 실제 청첩장에 표시하려는 문자가 아니라,
사용자가 수정해야 하는 위치를 찾기 위한 표시입니다.
