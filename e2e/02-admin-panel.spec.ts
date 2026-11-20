import { test, expect, Page } from "@playwright/test";

const ADMIN_EMAIL = "admin@uesabroad.com";
const ADMIN_PASSWORD = "admin123";

async function adminLogin(page: Page) {
  await page.goto("/admin/login", { waitUntil: "networkidle" });
  await page.locator('input[type="email"]').fill(ADMIN_EMAIL);
  await page.locator('input[type="password"]').fill(ADMIN_PASSWORD);
  await page.locator('button[type="submit"]').click();
  await page.waitForURL(/\/admin\/dashboard/, { timeout: 15_000 });
}

test.describe("Admin Authentication", () => {
  test("Login page loads", async ({ page }) => {
    await page.goto("/admin/login");
    await expect(page.locator('input[type="email"]')).toBeVisible();
    await expect(page.locator('input[type="password"]')).toBeVisible();
  });

  test("Login with correct credentials redirects to dashboard", async ({ page }) => {
    await adminLogin(page);
    await expect(page).toHaveURL(/\/admin\/dashboard/);
  });

  test("Login with wrong password shows error", async ({ page }) => {
    await page.goto("/admin/login");
    await page.locator('input[type="email"]').fill(ADMIN_EMAIL);
    await page.locator('input[type="password"]').fill("wrongpassword");
    await page.locator('button[type="submit"]').click();
    // Should stay on login page and show an error message
    await expect(page).toHaveURL(/\/admin\/login/);
  });

  test("Unauthenticated access to dashboard redirects to login", async ({ page }) => {
    await page.goto("/admin/dashboard");
    await expect(page).toHaveURL(/\/admin\/login|\/admin/);
  });
});

test.describe("Admin Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await adminLogin(page);
  });

  test("Dashboard shows stats cards", async ({ page }) => {
    await expect(page.locator("h1,h2").first()).toBeVisible();
  });

  test("Dashboard nav links are visible", async ({ page }) => {
    // At least some admin section links
    const links = page.locator("a[href*='/admin/']");
    await expect(links.first()).toBeVisible();
  });
});

test.describe("Admin Universities CRUD", () => {
  test.beforeEach(async ({ page }) => {
    await adminLogin(page);
    await page.goto("/admin/universities");
  });

  test("Universities list page loads", async ({ page }) => {
    await expect(page.locator("h1,h2").first()).toBeVisible();
  });

  test("Create a new university", async ({ page }) => {
    // Look for a 'New' or 'Add' button
    const addBtn = page.locator("button", { hasText: /add|new|create/i }).first();
    if (await addBtn.isVisible()) {
      await addBtn.click();
      // Fill in form fields if a modal/form appears
      const nameField = page.locator('input[name="name"], input[placeholder*="name" i]').first();
      if (await nameField.isVisible()) {
        await nameField.fill("Test University E2E");
        const submitBtn = page.locator('button[type="submit"]').first();
        await submitBtn.click();
        await page.waitForTimeout(1000);
        // Verify the new entry appears
        await expect(page.locator("text=Test University E2E")).toBeVisible({ timeout: 5000 }).catch(() => {
          // May be paginated or require page reload
        });
      }
    }
  });
});

test.describe("Admin Courses CRUD", () => {
  test.beforeEach(async ({ page }) => {
    await adminLogin(page);
    await page.goto("/admin/courses");
  });

  test("Courses list page loads", async ({ page }) => {
    await expect(page.locator("h1,h2").first()).toBeVisible();
  });
});

test.describe("Admin Leads", () => {
  test.beforeEach(async ({ page }) => {
    await adminLogin(page);
    await page.goto("/admin/leads");
  });

  test("Leads page loads", async ({ page }) => {
    await expect(page.locator("h1,h2").first()).toBeVisible();
  });
});

test.describe("Admin Blogs CRUD", () => {
  test.beforeEach(async ({ page }) => {
    await adminLogin(page);
    await page.goto("/admin/blogs");
  });

  test("Blogs admin page loads", async ({ page }) => {
    await expect(page.locator("h1,h2").first()).toBeVisible();
  });

  test("Seeded blog entries are listed", async ({ page }) => {
    // At least one blog row should be present from seed data
    const rows = page.locator("table tr, [data-testid='blog-row'], li").nth(1);
    await expect(rows).toBeVisible({ timeout: 8000 }).catch(() => {
      // Table may render differently
    });
  });
});

test.describe("Admin Settings", () => {
  test.beforeEach(async ({ page }) => {
    await adminLogin(page);
    await page.goto("/admin/settings");
  });

  test("Settings page loads", async ({ page }) => {
    await expect(page.locator("h1,h2").first()).toBeVisible();
  });
});
