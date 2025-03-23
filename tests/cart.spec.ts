import { test, expect } from "@playwright/test";
import { LoginPage } from "../pom/loginPage";
import { SearchPage } from "../pom/searchPage";
import { OptionPage } from "../pom/optionPage";
import { DesignPage } from "../pom/designPage";
import * as dotenv from "dotenv";
import { CartPage } from "../pom/cartPage";
import { OrderPage } from "../pom/orderPage";
dotenv.config();

// 구글 계정
const existingEmail = process.env.GOOGLE_EXISTINGEMAIL as string;
const pass = process.env.GOOGLE_PASSWORD as string;

test("CART_001: 상품 정보 정상 표시 확인", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const searchPage = new SearchPage(page);
  const optionPage = new OptionPage(page);
  const designPage = new DesignPage(page);
  const cartPage = new CartPage(page);

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
    { waitUntil: "load" }
  );

  // 상품 옵션 선택

  await optionPage.selectOption("용지", "코팅스노우 219g");

  // 상품 디자인 진행 방식 선택
  await designPage.selectDesignFileMethod();
  await designPage.selectDesignFile();
  await page.waitForURL("https://www.bizhows.com/v/step3-cart", {
    waitUntil: "load",
  });

  // 장바구니 내 상품 정보 확인
  const itemInfo = await cartPage.firstItemInfo();

  expect(itemInfo).toContain(
    "기본 명함 원단 : 코팅스노우 219g 파일주문 10,600원"
  );
});

test("CART_002: 상품 주문 절차 정상 동작 확인", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const searchPage = new SearchPage(page);
  const optionPage = new OptionPage(page);
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
    { waitUntil: "load" }
  );

  // 상품 옵션 선택

  await optionPage.selectOption("용지", "코팅스노우 219g");

  // 상품 디자인 진행 방식 선택
  await designPage.selectDesignFileMethod();
  await designPage.selectDesignFile();
  await page.waitForURL("https://www.bizhows.com/v/step3-cart", {
    waitUntil: "load",
  });

  // 주문하기 클릭 및 주문 페이지로 이동
  await cartPage.orderButton.click();
  await page.waitForURL("https://www.bizhows.com/v/step4-address", {
    waitUntil: "load",
  });

  // 주문 페이지 내 첫번째 상품 정보 확인
  const itemInfo = await orderPage.firstItemInfo();

  expect(itemInfo).toContain(
    "기본 명함 원단 : 코팅스노우 219g 파일 주문 10,600원"
  );
});

test.only("CART_003: 상품 전체 선택 및 부분 선택 동작 확인", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const cartPage = new CartPage(page);
  const orderPage = new OrderPage(page);

  // 로그인
  await loginPage.goto();
  await loginPage.googleLogin(existingEmail, pass);
  await loginPage.loginButton.waitFor({
    state: "detached",
  });

  // 장바구니로 이동
  await page.goto("https://www.bizhows.com/v/step3-cart", {
    waitUntil: "load",
  });

  // 전체 상품 개수
  const itemCount = await cartPage.countItems();

  // 전체 상품 선택
  await cartPage.selectAllCheckBox();

  // 첫번째 상품의 선택 해제
  await cartPage.firstCheckBox.click();

  // 주문하기 클릭 및 주문 페이지로 이동
  await cartPage.orderButton.click();
  await page.waitForURL("https://www.bizhows.com/v/step4-address", {
    waitUntil: "load",
  });

  const orderItemsCount = await orderPage.orderItemCounting();

  expect(Number(orderItemsCount)).toBe(itemCount - 1);
});

test("CART_004: 장바구니 내 상품 삭제 처리 확인", async ({ page }) => {
  const loginPage = new LoginPage(page);
  const searchPage = new SearchPage(page);
  const optionPage = new OptionPage(page);
  const designPage = new DesignPage(page);
  const cartPage = new CartPage(page);

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
    { waitUntil: "load" }
  );

  // 상품 옵션 선택

  await optionPage.selectOption("용지", "코팅스노우 219g");

  // 상품 디자인 진행 방식 선택
  await designPage.selectDesignFileMethod();
  await designPage.selectDesignFile();
  await page.waitForURL("https://www.bizhows.com/v/step3-cart", {
    waitUntil: "load",
  });

  // 전체 선택 및 삭제
  await cartPage.selectAllCheckBox();
  await cartPage.deleteCheckedBox();

  await expect(cartPage.emptyCartText).toHaveText(
    "장바구니에 담긴 상품이 없어요."
  );
  await expect(cartPage.addItemButton).toBeVisible();
});
