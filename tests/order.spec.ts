import { test, expect } from "@playwright/test";
import { LoginPage } from "../pom/loginPage";
import { SearchPage } from "../pom/searchPage";
import { DesignPage } from "../pom/designPage";
import * as dotenv from "dotenv";
import { CartPage } from "../pom/cartPage";
import { OrderPage } from "../pom/orderPage";
dotenv.config();

// 구글 계정
const existingEmail = process.env.GOOGLE_EXISTINGEMAIL as string;
const pass = process.env.GOOGLE_PASSWORD as string;

test("ORDER_001: 신용카드 결제 정상 처리 확인", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const searchPage = new SearchPage(page);
  const designPage = new DesignPage(page);
  const cartPage = new CartPage(page);
  const orderPage = new OrderPage(page);

  // 로그인
  await loginPage.goto();
  await loginPage.googleLogin(existingEmail, pass);
  await loginPage.loginButton.waitFor({
    state: "detached",
  });

  // 상품 검색 및 선택
  await searchPage.searchItem("기본명함");
  await searchPage.searchResults.waitFor({
    state: "visible",
  });
  await searchPage.searchResultItem.click();
  await page.waitForURL(
    "https://www.bizhows.com/v/option?code1=5000&code2=200&code3=3501&mock=5000_200_3501_7&from=megamenu",
    { waitUntil: "commit" }
  );

  // 상품 디자인 진행 방식 선택
  await designPage.selectDesignFileMethod();
  await designPage.selectDesignFile();
  await page.waitForURL("https://www.bizhows.com/v/step3-cart", {
    waitUntil: "commit",
  });

  // 쿠폰 모달 닫기
  await cartPage.closeCouponModal();

  // 주문하기 클릭 및 주문 페이지로 이동
  await cartPage.orderButton.click({ trial: true });
  await cartPage.orderButton.click({ force: true });

  await page.waitForURL("https://www.bizhows.com/v/step4-address", {
    waitUntil: "commit",
  });

  // 주문 필수정보 입력
  await orderPage.fillUserInfo("01012345678");
  await orderPage.fillDeliveryInfo("01012345678");

  await orderPage.agreePayment.click();
  await orderPage.payButton.click();

  const [popup] = await Promise.all([
    page.context().waitForEvent("page", { timeout: 5000 }), // 1️⃣ 이벤트 등록
    orderPage.payButton.click(), // 2️⃣ 클릭 동시에 실행
  ]);

  expect(popup).toBeTruthy();
});

test("ORDER_002: 필수 입력값 누락 시 결제 불가 확인", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const searchPage = new SearchPage(page);
  const designPage = new DesignPage(page);
  const cartPage = new CartPage(page);
  const orderPage = new OrderPage(page);

  // 로그인
  await loginPage.goto();
  await loginPage.googleLogin(existingEmail, pass);
  await loginPage.loginButton.waitFor({
    state: "detached",
  });

  // 상품 검색 및 선택
  await searchPage.searchItem("기본명함");
  await searchPage.searchResults.waitFor({
    state: "visible",
  });
  await searchPage.searchResultItem.click();
  await page.waitForURL(
    "https://www.bizhows.com/v/option?code1=5000&code2=200&code3=3501&mock=5000_200_3501_7&from=megamenu",
    { waitUntil: "commit" }
  );

  // 상품 디자인 진행 방식 선택
  await designPage.selectDesignFileMethod();
  await designPage.selectDesignFile();
  await page.waitForURL("https://www.bizhows.com/v/step3-cart", {
    waitUntil: "commit",
  });

  // 쿠폰 모달 닫기
  await cartPage.closeCouponModal();

  // 주문하기 클릭 및 주문 페이지로 이동
  await cartPage.orderButton.click({ trial: true });
  await cartPage.orderButton.click({ force: true });

  await page.waitForURL("https://www.bizhows.com/v/step4-address", {
    waitUntil: "commit",
  });

  // 주문 필수정보 입력
  await orderPage.fillUserInfo(" ");
  await orderPage.fillDeliveryInfo("01012345678");

  await orderPage.agreePayment.click();
  await orderPage.payButton.click();

  await expect(orderPage.userPhoneEmptyIcon).toBeVisible();
});

test("ORDER_003: 주문내용 확인 및 결제동의 미선택 시 결제 불가 확인", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const searchPage = new SearchPage(page);
  const designPage = new DesignPage(page);
  const cartPage = new CartPage(page);
  const orderPage = new OrderPage(page);

  // 로그인
  await loginPage.goto();
  await loginPage.googleLogin(existingEmail, pass);
  await loginPage.loginButton.waitFor({
    state: "detached",
  });

  // 상품 검색 및 선택
  await searchPage.searchItem("기본명함");
  await searchPage.searchResults.waitFor({
    state: "visible",
  });
  await searchPage.searchResultItem.click();
  await page.waitForURL(
    "https://www.bizhows.com/v/option?code1=5000&code2=200&code3=3501&mock=5000_200_3501_7&from=megamenu",
    { waitUntil: "commit" }
  );

  // 상품 디자인 진행 방식 선택
  await designPage.selectDesignFileMethod();
  await designPage.selectDesignFile();
  await page.waitForURL("https://www.bizhows.com/v/step3-cart", {
    waitUntil: "commit",
  });

  // 쿠폰 모달 닫기
  await cartPage.closeCouponModal();

  // 주문하기 클릭 및 주문 페이지로 이동
  await cartPage.orderButton.click({ trial: true });
  await cartPage.orderButton.click({ force: true });

  await page.waitForURL("https://www.bizhows.com/v/step4-address", {
    waitUntil: "commit",
  });

  // 주문 필수정보 입력
  await orderPage.fillUserInfo("01012345678");
  await orderPage.fillDeliveryInfo("01012345678");

  await orderPage.payButton.click();

  const getAgreePaymentErrorMessage =
    await orderPage.agreePaymentErrorMessage.textContent();

  expect(orderPage.agreePaymentErrorMessage).toBeVisible();
  expect(getAgreePaymentErrorMessage).toContain(
    "결제 진행 시 필수사항을 동의해주세요"
  );
});
