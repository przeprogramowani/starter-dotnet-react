import {expect, test} from "@playwright/test";

async function cleanTestDatabase() {
  const response = await fetch("http://localhost:3001/test/cleanup", {
    method: "DELETE",
  });

  if (!response.ok) {
    console.warn("Test database cleanup failed:", await response.text());
  }
}

// Clean before all tests
test.beforeAll(async () => {
  await cleanTestDatabase();
});

// Clean after all tests
test.afterAll(async () => {
  await cleanTestDatabase();
});

test("smoke test", async ({page}) => {
  await page.goto("http://localhost:3000/");

  await expect(page.getByRole("link", {name: "Flashcards App"})).toBeVisible();
});
