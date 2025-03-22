import { test, expect } from "@playwright/test";
import { SearchPage } from "../pom/searchPage";

test("SEARCH_001: 상품 검색 및 선택 정상 처리 확인", async ({ page }) => {
  const searchPage = new SearchPage(page);

  await searchPage.goto();
  await searchPage.searchItem("기본명함");
  await searchPage.searchResults.waitFor({
    state: "visible",
  });
  await searchPage.searchResultItem.click();

  await expect(page).toHaveURL(
    "https://www.bizhows.com/v/option?code1=5000&code2=200&code3=3501&mock=5000_200_3501_7&from=megamenu"
  );
});

test("SEARCH_002: 존재하지 않는 상품 키워드 검색 시 미출력 확인", async ({
  page,
}) => {
  const searchPage = new SearchPage(page);

  await searchPage.goto();
  await searchPage.searchItem("!@#$");

  await expect(searchPage.itemRequiredButton).toBeVisible();
});
