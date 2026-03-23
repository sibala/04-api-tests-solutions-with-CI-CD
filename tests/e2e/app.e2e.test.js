import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto("/");
});


test("full flow: load posts and tags on start", async ({ page }) => {
  // await page.goto("/");

  //   same concept as document.querySelectorAll('.post-card:first-child')
  await expect(page.locator(".post-card").first()).toBeVisible();
  //   same concept as document.querySelectorAll('#tag-filter option')
  let options = page.locator("#tag-filter option");

  await expect(options.first()).toHaveText("Alla");
  expect(await options.count()).toBeGreaterThan(1);
});


test("Changing the tag dropdown filters the posts (verify that shown posts contain the selected tag)", async ({ page }) => {
  // await page.goto("/");

  //   same concept as document.querySelectorAll('.post-card:first-child')
  await expect(page.locator(".post-card").first()).toBeVisible();
  await page.selectOption("#tag-filter", "history");
  await expect(page.locator(".post-card").first()).toBeVisible();

  let tagText = await page.locator(".post-meta").first().textContent()
  expect(tagText).toContain("history")

  tagText = await page.locator(".post-meta").nth(10).textContent() // the 11th child
  expect(tagText).toContain("history")
});


