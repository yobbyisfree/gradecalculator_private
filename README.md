# gradcal

고려대 졸업 로드맵 스타일의 4년 수강계획 보드입니다.

## 파일 구성

- `index.html`: 현재 서비스의 유일한 메인 페이지
- `style.css`: 전체 스타일
- `script.js`: 데이터, 계산, 상호작용 로직

## 로컬에서 보기

`index.html`을 브라우저에서 열면 됩니다.

## GitHub Pages 배포

이 프로젝트는 `.github/workflows/deploy-pages.yml`을 통해 `main` 브랜치 푸시 시 자동 배포됩니다.

배포 주소 예시:

`https://<github-username>.github.io/<repository-name>/`

## 참고

- 사용자 데이터는 브라우저 `localStorage`에 저장됩니다.
- 로그인이나 기기 간 동기화 기능은 아직 없습니다.
