# BizHows-E2Etest-automation 

## 📌 프로젝트 개요  
본 프로젝트는 비즈하우스 웹사이트의 핵심 사용자 플로우를 자동화 테스트하여 서비스 품질을 검증하기 위해 진행되었습니다.
Playwright(TypeScript)를 기반으로 회원가입, 로그인, 상품 검색, 옵션 선택, 장바구니, 주문 및 결제에 이르는 엔드 투 엔드(E2E) 테스트 자동화 구축이 목표이며,
Allure Report를 연동하여 테스트 결과를 시각적으로 확인할 수 있도록 구성하였습니다.

### 🔹 **초기 목표**  
- 실제 사용자 흐름에 기반한 전체 구매 플로우 자동화
- 테스트 신뢰성을 높이기 위한 POM 구조 설계 및 역할 분리

### 🔹 **발생한 문제**  
- 구글 소셜 로그인을 포함한 팝업 핸들링의 복잡성
- 비동기 UI 업데이트 타이밍 문제
- 유사하거나 중첩된 요소로 인해 셀렉터 정확도 저하

### 🔹 **대응 방향**  
- popup context 감지를 통한 제어 및 처리
- waitForFunction, waitForTimeout, state: 'detached' 등의 전략을 적절히 조합하여 안정적인 흐름 확보
- 중첩 요소 및 중복 셀렉터 문제는 :has(), .locator().locator() 방식으로 명확한 트리 탐색 구조 설계

### 🔹 **테스트 항목**  
- 회원가입 및 로그인 (Google)
- 상품 제작 > 상품 검색 및 선택
- 옵션(용지, 매수 등) 설정 및 반영 확인
- 디자인 파일 업로드 및 장바구니 담기 (데스크탑 파일)
- 장바구니 상품 제어
- 주문 정보 관리 및 주문 진행 (결제 직전까지)
---

## 🛠️ 기술 스택  
- **Test Automation:** Playwright (TypeScript)
- **Test Case Management:** Google Sheets  
- **Reporting:** Allure Report  

---

## ▶️ 실행 방법  
(구글 로그인 세션 및 상태 공유 이슈 문제가 존재하여 workers는 1로 실행할 것)

```sh
npm install
npx playwright install
npx playwright test --workers=1
npx allure generate allure-results --clean
npx allure open
```


## 📌 프로젝트를 통해 배운 점
- 실사용 흐름을 반영한 E2E 테스트 자동화 설계 및 구축 경험
- 소셜 로그인 (popup 기반)의 시나리오 처리 방법 익힘
- Allure Report를 활용한 테스트 결과 시각화
- 복잡한 DOM 구조의 요소를 정확하게 셀렉팅하기 위한 전략 습득
- 테스트 안정성을 위한 다양한 wait 전략 활용 경험
- POM 패턴 기반의 테스트 구조화 및 유지보수성 향상

