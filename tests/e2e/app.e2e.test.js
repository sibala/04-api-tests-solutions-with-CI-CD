import { test, expect } from "@playwright/test";

test("full flow: load posts and tags on start", async ({ page }) => {
  await page.goto("/");

  //   same concept as document.querySelectorAll('.post-card:first-child')
  await expect(page.locator(".post-card").first()).toBeVisible();
  //   same concept as document.querySelectorAll('#tag-filter option')
  let options = page.locator("#tag-filter option");

  await expect(options.first()).toHaveText("Alla");
  expect(await options.count()).toBeGreaterThan(1);
});