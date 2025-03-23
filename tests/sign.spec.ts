import { test, expect } from "@playwright/test";
import { SignPage } from "../pom/signPage";
import * as dotenv from "dotenv";
dotenv.config();

// 구글 계정
const existingEmail = process.env.GOOGLE_EXISTINGEMAIL as string;
const newEmail = process.env.GOOGLE_NEWEMAIL as string;
const pass = process.env.GOOGLE_PASSWORD as string;

// test("SIGN_001: 회원가입 정상 처리 확인", async ({ page }) => {
//   const signPage = new SignPage(page);

//   await signPage.goto();
//   await signPage.googleJoin("테스터 새 계정", "테스터 새 비밀번호");
//   await signPage.termsCheck();
//   await signPage.fillRequiredInfo("테스터");
//   await signPage.termsModal.waitFor({ state: "detached" });

//   expect(signPage.welcomeModal).toBeVisible();
// });

test("SIGN_002: 이미 가입된 계정으로 가입 시도 시, 중복 가입 방지 확인", async ({
  page,
}) => {
  const signPage = new SignPage(page);

  await signPage.goto();
  await signPage.googleJoin(existingEmail, pass);

  expect(signPage.profileButton).toBeVisible();
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
