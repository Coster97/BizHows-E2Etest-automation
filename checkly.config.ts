import { defineConfig } from 'checkly';

export default defineConfig({
  projectName: 'BizHows-E2E',
  logicalId: 'bizhows-e2e',
  repoUrl: 'https://github.com/너의계정명/BizHows-E2Etest-automation',
  checks: [
    {
      name: 'E2E Tests',
      type: 'browser',
      locations: ['ap-northeast-2'], // 한국 리전
      frequency: 60, // 60분마다 실행
      code: {
        entrypoint: './tests/fullflow.spec.ts',
      },
    },
  ],
});
