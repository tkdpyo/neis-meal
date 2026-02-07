# 🚀 Netlify 배포 체크리스트

## ✅ 코드 수정 완료 항목
- [x] `constants.ts` - API 키를 환경 변수로 이동
- [x] `vite.config.ts` - Netlify 배포 최적화 설정
- [x] `package.json` - 버전 및 메타데이터 업데이트
- [x] `.env.example` - 환경 변수 템플릿 생성
- [x] `.gitignore` - 환경 변수 파일 보호
- [x] `netlify.toml` - Netlify 빌드 설정

---

## 📋 배포 전 체크리스트

### 1. 로컬 테스트 (필수)
```bash
# 1. 환경 변수 설정
cp .env.example .env.local
# .env.local 파일에서 API 키 확인

# 2. 의존성 설치
npm install

# 3. 개발 서버 테스트
npm run dev
# http://localhost:3000 에서 모든 기능 테스트

# 4. 프로덕션 빌드 테스트
npm run build
npm run preview
```

### 2. Git 준비 (필수)
```bash
# GitHub에 push 하기 전 확인
git status  # 구성되지 않은 파일 확인
git add .
git commit -m "Netlify 배포 준비"
git push origin main
```

### 3. Netlify 설정 (필수)
- [ ] Netlify 계정 생성 (https://netlify.com)
- [ ] GitHub 저장소 연결
- [ ] Site settings → Build & deploy → Environment 에서 환경 변수 설정:
  - **Key**: `VITE_NEIS_API_KEY`
  - **Value**: API 키 입력
- [ ] 자동 배포 활성화 확인

### 4. 배포 후 테스트
- [ ] 배포 완료 URL 접속
- [ ] 페이지 로드 확인
- [ ] 학교 검색 기능 테스트
- [ ] 급식 정보 조회 테스트
- [ ] 모바일 화면 반응형 확인

---

## 📂 변경된 파일 구조

```
school-meal-finder/
├── .env.example                    # NEW: 환경 변수 템플릿
├── .gitignore                      # UPDATED: .env 파일 보호
├── netlify.toml                    # NEW: Netlify 배포 설정
├── DEPLOYMENT_GUIDE.md             # NEW: 상세 배포 가이드
├── constants.ts                    # UPDATED: 환경 변수 사용
├── vite.config.ts                  # UPDATED: 배포 최적화
├── package.json                    # UPDATED: 메타데이터
├── App.tsx
├── index.tsx
├── index.html
├── types.ts
├── tsconfig.json
├── components/
│   ├── Header.tsx
│   ├── MealCard.tsx
│   ├── SchoolSelectModal.tsx
│   └── SearchForm.tsx
└── services/
    └── neisService.ts
```

---

## 🔑 환경 변수 설명

### VITE_NEIS_API_KEY
- **설명**: NEIS 공공 API 키
- **현재 값**: `3aeace82f952472ab2151a44cf0e736b`
- **보안**: 
  - 로컬`.env.local` 파일은 `.gitignore`에 의해 Git에서 제외됨
  - Netlify 대시보드에서 환경 변수로 안전하게 관리됨

---

## 🌐 배포 아키텍처

```
GitHub Repository
       ↓ (push)
    ┌──────┐
    │ Main │
    └──┬───┘
       ↓ (감지)
   Netlify CI/CD
    ├─ npm install
    ├─ npm run build      → dist/ 생성
    └─ 배포

결과: https://school-meal-finder-xxx.netlify.app
```

---

## ⚡ 빠른 시작 명령어

```bash
# 1. 저장소 클론 (처음 한 번)
git clone https://github.com/YOUR_USERNAME/school-meal-finder.git
cd school-meal-finder

# 2. 환경 설정
cp .env.example .env.local

# 3. 로컬 실행
npm install
npm run dev

# 4. 빌드 테스트
npm run build
npm run preview

# 5. GitHub에 푸시 (Netlify 자동 배포)
git add .
git commit -m "메시지"
git push origin main
```

---

## 📚 참고 문서

- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - 상세 배포 가이드
- [Netlify 공식 문서](https://docs.netlify.com)
- [Vite 공식 문서](https://vitejs.dev)
- [NEIS API](https://open.neis.go.kr)

---

**✨ 행운을 빕니다! 배포 후 문제가 생기면 DEPLOYMENT_GUIDE.md의 "🆘 문제 해결" 섹션을 참고하세요.**
