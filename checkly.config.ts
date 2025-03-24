import { defineConfig } from "checkly";
import { Frequency } from "checkly/constructs";

export default defineConfig({
  projectName: "비즈하우스 e2e 자동화 테스트 모니터링",
  logicalId: "website-monitoring-1",
  repoUrl: "https://github.com/Coster97/BizHows-E2Etest-automation",
  checks: {
    activated: true,
    muted: false,
    runtimeId: "2022.10",
    frequency: Frequency.EVERY_5M,
    locations: ["ap-northeast-2"],
    tags: ["bizhows", "e2e", "automation"],
    checkMatch: "**/__checks__/**/*.check.ts",
    ignoreDirectoriesMatch: [],
    browserChecks: {
      frequency: Frequency.EVERY_10M,
      testMatch: "**/checks/**/*.spec.ts",
    },
  },
  cli: {
    runLocation: "ap-northeast-2", // CLI 테스트 실행 시 사용할 위치
  },
});
