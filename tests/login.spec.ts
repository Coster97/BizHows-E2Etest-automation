import { test, expect } from "@playwright/test";
import { LoginPage } from "../pom/loginPage";
import * as dotenv from "dotenv";
dotenv.config();

// 구글 계정
const existingEmail = process.env.GOOGLE_EXISTINGEMAIL as string;
const newEmail = process.env.GOOGLE_NEWEMAIL as string;
const pass = process.env.GOOGLE_PASSWORD as string;

// ---------- 구글 로그인 ----------

test("LOGIN_001: 로그인 정상 처리 확인", async ({ page }) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.googleLogin(existingEmail, pass);

  await expect(loginPage.loginButton).toHaveCount(0);
});

test("LOGIN_002: 미가입 계정으로 로그인 시도 시 회원가입 절차로 이동 확인", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);

  await loginPage.goto();
  await loginPage.googleLogin(newEmail, pass);

  expect(loginPage.termsModal).toBeVisible();
});
