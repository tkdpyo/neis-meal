# 학교 급식 정보 조회 웹앱 - Netlify 배포 가이드

## 📋 목차
1. [사전 준비](#사전-준비)
2. [로컬 빌드 및 테스트](#로컬-빌드-및-테스트)
3. [Git 저장소 초기화](#git-저장소-초기화)
4. [Netlify 계정 설정](#netlify-계정-설정)
5. [배포](#배포)
6. [커스텀 도메인 설정 (선택)](#커스텀-도메인-설정-선택)

---

## 1️⃣ 사전 준비

### 필요한 것
- Node.js 18+ (LTS 권장)
- npm 또는 yarn
- Git
- GitHub 계정
- Netlify 계정 (https://netlify.com)

### 로컬 개발 환경 확인
```bash
node --version   # v18.x 이상
npm --version    # 9.x 이상
git --version    # 설치 확인
```

---

## 2️⃣ 로컬 빌드 및 테스트

### 환경 변수 설정
```bash
# .env.local 파일 생성 (로컬 개발용)
cp .env.example .env.local
```

`.env.local` 파일 내용:
```
VITE_NEIS_API_KEY=3aeace82f952472ab2151a44cf0e736b
```

### 의존성 설치
```bash
npm install
```

### 로컬 개발 서버 실행
```bash
npm run dev
# http://localhost:3000 에서 접속 가능
```

### 프로덕션 빌드 테스트
```bash
# dist 폴더에 빌드
npm run build

# 빌드 결과물 미리보기
npm run preview
```

✅ 모든 기능이 정상 작동하는지 확인하세요.

---

## 3️⃣ Git 저장소 초기화

### 1. 로컬 저장소 초기화
```bash
git init
git add .
git commit -m "Initial commit: NEIS 급식 조회 웹앱"
```

### 2. GitHub에서 저장소 생성
- https://github.com/new 접속
- Repository name: `school-meal-finder`
- Public/Private 선택 (권장: Public)
- "Create repository" 클릭

### 3. GitHub에 푸시
```bash
git remote add origin https://github.com/YOUR_USERNAME/school-meal-finder.git
git branch -M main
git push -u origin main
```

---

## 4️⃣ Netlify 계정 설정

### 1. Netlify 가입 및 로그인
- https://app.netlify.com/signup 접속
- GitHub 계정으로 로그인 (권장)

### 2. 새 사이트 생성
1. "Add new site" → "Import an existing project" 클릭
2. GitHub 연결 선택
3. 저장소 선택: `school-meal-finder`

### 3. 빌드 설정 확인
- **Build command**: `npm run build`
- **Publish directory**: `dist`
- 설정 후 "Deploy" 클릭

---

## 5️⃣ 배포

### 자동 배포 설정
Netlify에서 자동으로 감지되는 설정:
- `netlify.toml` 파일의 빌드 설정 적용
- `package.json`의 빌드 스크립트 실행
- 빌드 완료 후 `dist` 폴더 배포

### 환경 변수 설정 (중요!)

**Netlify 대시보드에서:**

1. Site settings → Build & deploy → Environment
2. "Edit variables" 클릭
3. 새 변수 추가:
   - **Key**: `VITE_NEIS_API_KEY`
   - **Value**: `3aeace82f952472ab2151a44cf0e736b`
4. "Save" 클릭

⚠️ **중요**: API 키가 노출될 수 있으니 정기적으로 확인하세요!

### 배포 확인
1. Netlify 대시보드에서 배포 상태 확인
2. 배포 완료 후 자동 생성된 URL 접속
   - 예: `https://school-meal-finder-abc123.netlify.app`

---

## 6️⃣ 커스텀 도메인 설정 (선택)

### 1. Netlify에서 도메인 설정
1. Site settings → Domain management
2. "Add domain" 클릭
3. 보유한 도메인 입력

### 2. DNS 레코드 수정
도메인 제공자 (가비아, AWS 등)에서:
- CNAME 레코드 추가
- 값: `your-site.netlify.app`

### 3. HTTPS 인증서 (자동)
- Netlify가 자동으로 Let's Encrypt 인증서 설정

---

## 📱 배포 후 테스트 항목

[ ] 앱 로딩 확인
[ ] 교육청 선택 가능
[ ] 학교 검색 작동
[ ] 급식 정보 조회 작동
[ ] 날짜 범위 필터링 작동
[ ] 모바일 반응형 디자인 확인

---

## 🔄 업데이트 배포

코드 수정 후 배포:
```bash
git add .
git commit -m "Update: [변경 내용]"
git push origin main
```
→ Netlify가 자동으로 배포 시작!

---

## 🆘 문제 해결

### 배포 실패
1. Netlify 대시보드 → Deploys 확인
2. 빌드 로그에서 에러 메시지 확인
3. 환경 변수 `VITE_NEIS_API_KEY` 설정 확인

### 학교 검색이 안 됨
1. NEIS API 상태 확인: https://open.neis.go.kr
2. 환경 변수 값 확인
3. 브라우저 개발자 도구 → Network 탭에서 API 요청 확인

### CORS 오류
- NEIS API는 공공 API로 CORS 정책이 있습니다
- 브라우저 콘솔에서 오류 메시지 확인
- Netlify 함수로 프록시 구현 필요시 문의

---

## 📞 추가 도움
- Netlify 문서: https://docs.netlify.com
- NEIS API: https://open.neis.go.kr
- Vite 문서: https://vitejs.dev
