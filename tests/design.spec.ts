import { test, expect } from "@playwright/test";
import { LoginPage } from "../pom/loginPage";
import { DesignPage } from "../pom/designPage";
import * as dotenv from "dotenv";
dotenv.config();

// 구글 계정
const existingEmail = process.env.GOOGLE_EXISTINGEMAIL as string;
const pass = process.env.GOOGLE_PASSWORD as string;

test("DESIGN_001: '파일 업로드 방식' 옵션 선택 및 파일 삽입 정상 반영 확인", async ({
  page,
}) => {
  const loginPage = new LoginPage(page);
  const designPage = new DesignPage(page);

  await loginPage.goto();
  await loginPage.googleLogin(existingEmail, pass);
  await loginPage.loginButton.waitFor({
    state: "detached",
  });

  await page.goto(
    "https://www.bizhows.com/v/option?code1=5000&code2=200&code3=3501&mock=5000_200_3501_7&from=megamenu&selectedOptionList=119357%2C115832%2C115754%2C131903%2C115701%2C119341%2C115774%2C115721%2C115723%2C115752%2C115726%2C115728%2C115727%2C115738%2C115748%2C115750",
    { waitUntil: "commit" }
  );
  await designPage.selectDesignMethod();
  await designPage.selectDesignFile();
  await page.waitForURL("https://www.bizhows.com/v/step3-cart", {
    waitUntil: "load",
  });

  await expect(designPage.cartTitle).toBeVisible();
});
