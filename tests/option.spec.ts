import { test, expect } from "@playwright/test";
import { SearchPage } from "../pom/searchPage";
import { OptionPage } from "../pom/optionPage";

test("OPTION_001: 상품 옵션 변경 및 변경 사항 반영 확인 ", async ({
  page,
}) => {
  const searchPage = new SearchPage(page);
  const optionPage = new OptionPage(page);

  await searchPage.goto();
  await searchPage.searchItem("기본명함");
  await searchPage.searchResults.waitFor({
    state: "visible",
  });
  await searchPage.searchResultItem.click();
  const selectedText = await optionPage.selectOption("용지", "코팅스노우 219g");
  expect(selectedText).toContain("코팅스노우 219g");
});
