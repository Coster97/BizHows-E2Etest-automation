import { test, expect } from "@playwright/test";
import { LoginPage } from "../pom/loginPage";
import { SearchPage } from "../pom/searchPage";
import { OptionPage } from "../pom/optionPage";
import { DesignPage } from "../pom/designPage";
import { CartPage } from "../pom/cartPage";
import { OrderPage } from "../pom/orderPage";
import * as dotenv from "dotenv";
dotenv.config();

// 구글 계정
const existingEmail = process.env.GOOGLE_EXISTINGEMAIL as string;
const pass = process.env.GOOGLE_PASSWORD as string;

// test("FULLFLOW_001", async ({ page }) => {
//   const loginPage = new LoginPage(page);
//   const searchPage = new SearchPage(page);
//   const optionPage = new OptionPage(page);
//   const designPage = new DesignPage(page);
//   const cartPage = new CartPage(page);
//   const orderPage = new OrderPage(page);

//   console.log("테스트 시작");

//   // 로그인
//   await loginPage.goto();
//   await loginPage.googleLogin(existingEmail, pass);
//   await loginPage.loginButton.waitFor({
//     state: "detached",
//   });

//   await expect(loginPage.loginButton).toHaveCount(0);
//   console.log("구글 로그인 테스트 통과");

//   // 상품 검색 및 선택
//   await searchPage.searchItem("기본명함");
//   await searchPage.searchResults.waitFor({
//     state: "visible",
//   });
//   await searchPage.searchResultItem.click();
//   await page.waitForURL(
//     "https://www.bizhows.com/v/option?code1=5000&code2=200&code3=3501&mock=5000_200_3501_7&from=megamenu",
//     { waitUntil: "commit" }
//   );

//   // 기본 명함 상세페이지
//   await expect(page).toHaveURL(
//     "https://www.bizhows.com/v/option?code1=5000&code2=200&code3=3501&mock=5000_200_3501_7&from=megamenu"
//   );
//   console.log("상품 검색 및 상세페이지 접근 통과");

//   // 상품 옵션 변경
//   const selectedText = await optionPage.selectOption("용지", "코팅스노우 219g");
//   expect(selectedText).toContain("코팅스노우 219g");
//   console.log("상품 옵션 변경 통과");

//   // 상품 디자인 진행 방식 선택
//   await designPage.selectDesignFileMethod();
//   await designPage.selectDesignFile();
//   await page.waitForURL("https://www.bizhows.com/v/step3-cart", {
//     waitUntil: "commit",
//   });

//   await expect(cartPage.firstItemDesignOption).toHaveText("파일주문");
//   console.log("상품 디자인 진행 방식(데스크탑 파일 업로드) 설정 통과");

//   // 장바구니 내 상품 정보 확인

//   const cartItemInfo = await cartPage.firstItemInfo();
//   expect(cartItemInfo).toContain(
//     "기본 명함 원단 : 코팅스노우 219g 파일주문 10,600원"
//   );
//   console.log("장바구니 내 상품 정보 정상 반영 통과");

//   // 쿠폰 모달 닫기
//   await cartPage.closeCouponModal();

//   // 주문하기 클릭 및 주문 페이지로 이동
//   await cartPage.orderButton.click({ trial: true });
//   await cartPage.orderButton.click({ force: true });

//   await page.waitForURL("https://www.bizhows.com/v/step4-address", {
//     waitUntil: "commit",
//   });

//   // 장바구니 내 상품 정보 확인
//   const orderItemInfo = await orderPage.firstItemInfo();
//   expect(orderItemInfo).toContain(
//     "기본 명함 원단 : 코팅스노우 219g 파일 주문 10,600원"
//   );
//   console.log("주문 페이지 내 상품 정보 정상 반영 통과");

//   // 주문 필수정보 입력
//   await orderPage.fillUserInfo("01012345678");
//   await orderPage.fillDeliveryInfo("01012345678");
//   await orderPage.agreePayment.click();

//   const [popup] = await Promise.all([
//     page.context().waitForEvent("page", { timeout: 5000 }), // 1️⃣ 이벤트 등록
//     orderPage.payButton.click(), // 2️⃣ 클릭 동시에 실행
//   ]);

//   if (popup) {
//     console.log(
//       "주문 필수 정보 입력에 따른 유효성 검증 및 신용카드 결제 팝업 확인 통과"
//     );
//   }

//   expect(popup).toBeTruthy(); // 진짜 팝업이 떴는지만 확인
// });
