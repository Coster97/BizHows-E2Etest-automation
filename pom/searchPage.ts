import { Page, Locator } from "@playwright/test";

export class SearchPage {
  // 페이지
  readonly page: Page;
  // 검색 버튼
  readonly searchButton: Locator;
  // 검색창
  readonly searchInput: Locator;
  // 검색 결과 연결 버튼
  readonly searchResults: Locator;
  // 검색 결과 첫번째 상품
  readonly searchResultItem: Locator;
  // 상품 추가 요청 버튼
  readonly itemRequiredButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.searchButton = page.locator("button[data-f='CM-6bf7']");
    this.searchInput = page.locator("input[data-f='SI-5113']");
    this.searchResults = page.locator("a[data-f='CC-399d']");
    this.searchResultItem = page.locator("a[data-f='CC-7d7e']").nth(0);
    this.itemRequiredButton = page.locator("button[data-f='NM-fbc3']");
  }

  // 비즈하우스 홈페이지로 이동
  async goto() {
    await this.page.goto("https://www.bizhows.com/", {
      waitUntil: "commit",
    });
  }

  async searchItem(keyword: string) {
    await this.searchButton.waitFor({
      state: "visible",
    });
    await this.searchButton.click();
    await this.searchInput.fill(keyword);
  }
}
