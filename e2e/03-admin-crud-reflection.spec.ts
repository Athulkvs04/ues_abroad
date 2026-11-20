import { test, expect } from "@playwright/test";

const ADMIN_EMAIL = "admin@uesabroad.com";
const ADMIN_PASSWORD = "admin123";

test.describe("Admin CRUD -> Public Site Live Reflection", () => {
  test("Adding a new blog in Admin Console reflects on /blogs public page", async ({ page }) => {
    const timestamp = Date.now().toString().slice(-4);
    const testBlogTitle = `Global Study Guide ${timestamp}`;
    const testBlogExcerpt = `Actionable step by step insights for overseas admissions ${timestamp}.`;
    const testBlogContent = `Full guide content for international students created dynamically by automated e2e suite.`;

    // 1. Login to Admin Console
    await page.goto("/admin/login", { waitUntil: "networkidle" });
    await page.locator('input[type="email"]').fill(ADMIN_EMAIL);
    await page.locator('input[type="password"]').fill(ADMIN_PASSWORD);
    await page.locator('button[type="submit"]').click();
    await page.waitForURL(/\/admin\/dashboard/, { timeout: 15_000 });

    // 2. Navigate to Admin Blogs
    await page.goto("/admin/blogs");
    await page.waitForLoadState("networkidle");

    // 3. Click 'Add New Article'
    const addBtn = page.locator("button", { hasText: /add new article/i });
    await expect(addBtn).toBeVisible({ timeout: 5000 });
    await addBtn.click();

    // 4. Fill in modal form
    await page.locator('input[placeholder*="Complete Guide" i]').fill(testBlogTitle);
    await page.locator('textarea[placeholder*="concise 1-2 sentence" i]').fill(testBlogExcerpt);
    await page.locator('textarea[placeholder*="Write the full guide" i]').fill(testBlogContent);

    // 5. Submit article
    const publishBtn = page.locator('button[type="submit"]', { hasText: /publish article/i });
    await publishBtn.click();
    await page.waitForTimeout(2000);

    // 6. Navigate to Public /blogs page
    await page.goto("/blogs");
    await page.waitForLoadState("networkidle");

    // 7. Verify the new blog is visible on the public website
    const newBlog = page.locator(`text=${testBlogTitle}`);
    await expect(newBlog).toBeVisible({ timeout: 10_000 });

    // 8. Clean up test blog to ensure spotless production database
    page.on("dialog", (dialog) => dialog.accept());
    await page.goto("/admin/blogs");
    await page.waitForLoadState("networkidle");
    const blogDeleteBtn = page
      .locator("div")
      .filter({ hasText: testBlogTitle })
      .locator('button[title*="Delete" i]')
      .first();
    if (await blogDeleteBtn.isVisible({ timeout: 5000 }).catch(() => false)) {
      await blogDeleteBtn.click();
      await page.waitForTimeout(1000);
    }
  });

  test("Adding a new university in Admin Console reflects on /universities public page", async ({ page }) => {
    const timestamp = Date.now().toString().slice(-4);
    const testUniName = `Global Tech Institute ${timestamp}`;

    // 1. Login to Admin Console
    await page.goto("/admin/login", { waitUntil: "networkidle" });
    await page.locator('input[type="email"]').fill(ADMIN_EMAIL);
    await page.locator('input[type="password"]').fill(ADMIN_PASSWORD);
    await page.locator('button[type="submit"]').click();
    await page.waitForURL(/\/admin\/dashboard/, { timeout: 15_000 });

    // 2. Navigate to Admin Universities
    await page.goto("/admin/universities");
    await page.waitForLoadState("networkidle");

    // 3. Click 'Add University'
    const addBtn = page.locator("button", { hasText: /add university/i });
    await expect(addBtn).toBeVisible({ timeout: 5000 });
    await addBtn.click();

    // 4. Fill in university form
    await page.getByPlaceholder("e.g. University of Manchester").fill(testUniName);
    await page.getByPlaceholder("e.g. Manchester", { exact: true }).fill("Tech Campus");
    await page.locator('textarea[placeholder*="comprehensive overview" i]').fill("Leading premier tech university.");

    // Select country if not yet selected
    const countrySelect = page.locator('select').first();
    const val = await countrySelect.inputValue();
    if (!val) {
      const options = await countrySelect.locator('option').all();
      if (options.length > 0) {
        const optionVal = await options[0].getAttribute('value');
        if (optionVal) await countrySelect.selectOption(optionVal);
      }
    }

    // 5. Save university
    const saveBtn = page.locator('button[type="submit"]', { hasText: /save university/i });
    await saveBtn.click();
    await page.waitForTimeout(2000);

    // 6. Navigate to Public /universities page
    await page.goto("/universities");
    await page.waitForLoadState("networkidle");

    // 7. Verify the new university appears on the public website
    const newUni = page.locator(`span:has-text("${testUniName}")`).first();
    await expect(newUni).toBeVisible({ timeout: 10_000 });

    // 8. Clean up test university to ensure spotless production database
    await page.goto("/admin/universities");
    await page.waitForLoadState("networkidle");
    const uniRow = page.locator("tr", { hasText: testUniName });
    const deleteUniBtn = uniRow.locator('button[title*="Delete" i]');
    if (await deleteUniBtn.isVisible()) {
      await deleteUniBtn.click();
      const confirmDelete = page.locator("button", { hasText: /^Delete$/i });
      if (await confirmDelete.isVisible()) {
        await confirmDelete.click();
        await page.waitForTimeout(1000);
      }
    }
  });
});
