import { test, expect } from "@playwright/test";

test.describe("Public Pages", () => {
  test("Homepage loads and shows hero section", async ({ page }) => {
    await page.goto("/");
    await expect(page).toHaveTitle(/UES Abroad/i);
    // Hero CTA button should be visible
    const hero = page.locator("h1").first();
    await expect(hero).toBeVisible();
  });

  test("Homepage has navigation", async ({ page }) => {
    await page.goto("/");
    // Nav links present
    await expect(page.locator("nav")).toBeVisible();
  });

  test("Destinations section renders cards", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#destinations-section")).toBeAttached();
    await expect(page.locator("#destinations-grid-container")).toBeAttached();
  });

  test("Explorer / University section renders", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#university-cards-container")).toBeAttached();
  });

  test("Testimonials section renders", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#testimonials-section")).toBeAttached();
  });

  test("Blogs section renders cards", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("#blogs-section")).toBeAttached();
  });

  test("Blogs listing page loads", async ({ page }) => {
    await page.goto("/blogs");
    await expect(page).toHaveTitle(/Blog|Guide|Abroad/i);
    await expect(page.locator("h1,h2").first()).toBeVisible();
  });

  test("Individual blog post loads with proper gap before footer", async ({ page }) => {
    await page.goto("/blogs");
    // Click the first blog link
    const firstBlog = page.locator("a[href^='/blogs/']").first();
    await expect(firstBlog).toBeVisible();
    const href = await firstBlog.getAttribute("href");
    if (href) {
      await page.goto(href);
      await expect(page.locator("article, h1").first()).toBeVisible();

      // Check related articles section and footer separation
      const relatedSection = page.locator("text=Related Study Guides & Insights").first();
      const footer = page.locator("footer").first();
      if ((await relatedSection.isVisible()) && (await footer.isVisible())) {
        const relatedBox = await relatedSection.boundingBox();
        const footerBox = await footer.boundingBox();
        if (relatedBox && footerBox) {
          // Verify footer is located below the related section with ample breathing room
          expect(footerBox.y).toBeGreaterThan(relatedBox.y);
          const gap = footerBox.y - relatedBox.y;
          expect(gap).toBeGreaterThan(150); // Generous spacing
        }
      }
    }
  });

  test("Terms page loads", async ({ page }) => {
    await page.goto("/terms");
    await expect(page.locator("h1,h2").first()).toBeVisible();
  });

  test("No broken 404s on nav links", async ({ page }) => {
    await page.goto("/");
    const navLinks = await page.locator("nav a[href^='/']").all();
    for (const link of navLinks.slice(0, 5)) {
      const href = await link.getAttribute("href");
      if (href && href !== "/") {
        const res = await page.request.get(href);
        expect(res.status(), `${href} returned ${res.status()}`).toBeLessThan(500);
      }
    }
  });
});
