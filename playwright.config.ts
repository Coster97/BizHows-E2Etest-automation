import { defineConfig } from "@playwright/test";

export default defineConfig({
  use: {
    headless: false, // 브라우저를 headless 모드에서 실행
    launchOptions: {
      args: [
        "--disable-notifications",
        "--disable-gpu",
        "--disable-setuid-sandbox",
        "--deterministic-fetch",
        "--disable-features=IsolateOrigins,site-per-process",
        "--disable-site-isolation-trials",
        "--disable-web-security", // ✅ 보안 정책 우회
      ],
    },
    viewport: { width: 1280, height: 720 }, // 기본 뷰포트 설정
    baseURL: "https://www.bizhows.com", // 테스트할 기본 URL
    trace: "on-first-retry", // 실패 시 트레이스 기능 활성화
    video: "retain-on-failure", // 실패한 경우에만 영상 저장
    screenshot: "only-on-failure", // 실패한 경우에만 스크린샷 저장
  },
  reporter: [["list"], ["allure-playwright"]], // ⬅️ Allure Report 추가
  projects: [
    // {
    //   name: "chromium",
    //   use: { browserName: "chromium" },
    // },
    // {
    //   name: "firefox",
    //   use: { browserName: "firefox" },
    // },
    {
      name: "webkit",
      use: { browserName: "webkit" },
    },
  ],
});
