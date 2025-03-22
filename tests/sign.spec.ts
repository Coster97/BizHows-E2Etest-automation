import { test, expect } from "@playwright/test";
import { SignPage } from "../pom/signPage";
import * as dotenv from "dotenv";
dotenv.config();

// 구글 계정
const existingEmail = process.env.GOOGLE_EXISTIINGEMAIL as string;
const newEmail = process.env.GOOGLE_NEWEMAIL as string;
const pass = process.env.GOOGLE_PASS as string;

// ---------- 회원가입 > 구글 ----------

// test("SIGN_001: 회원가입 정상 처리 확인", async ({ page }) => {
//   const signPage = new SignPage(page);

//   await signPage.goto();
//   await signPage.googleJoin(newEmail, pass);
//   await signPage.termsCheck();
//   await signPage.fillRequiredInfo("테스터");

//   expect(signPage.termsCheckGuide).toHaveText("필수 항목에 동의해 주세요");
// });

test("SIGN_002: 이미 가입된 계정으로 가입 시도 시, 중복 가입 방지 확인", async ({
  page,
}) => {
  const signPage = new SignPage(page);

  await signPage.goto();
  await signPage.googleJoin(existingEmail, pass);

  expect(page.locator("button[data-f='MB-b42d']").nth(5)).toBeVisible();
});

test("SIGN_003: 필수 이용약관 미동의 시 회원가입 불가 확인", async ({
  page,
}) => {
  const signPage = new SignPage(page);

  await signPage.goto();
  await signPage.googleJoin(newEmail, pass);
  await signPage.termsNoCheck();
  await signPage.getTermsCheckGuid();

  expect(signPage.termsCheckGuide).toHaveText("필수 항목에 동의해 주세요");
});

test("SIGN_004: 필수 정보 누락 시 회원가입 불가 확인", async ({ page }) => {
  const signPage = new SignPage(page);

  await signPage.goto();
  await signPage.googleJoin(newEmail, pass);
  await signPage.termsCheck();
  await signPage.fillRequiredInfo(" ");
  await signPage.getRequiredInfoGuide();

  expect(signPage.requiredInfo).toHaveText("필수 입력 항목입니다.");
});
