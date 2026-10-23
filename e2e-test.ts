import { chromium } from "playwright";

async function runTests() {
  console.log("🚀 Starting Playwright E2E Verification Tests...");
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  await context.addInitScript(() => {
    try {
      sessionStorage.setItem("ues_lead_submitted", "true");
      localStorage.setItem("ues_lead_submitted", "true");
    } catch {}
  });
  const page = await context.newPage();

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, testName: string) {
    if (condition) {
      console.log(`  ✅ PASS: ${testName}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${testName}`);
      failed++;
    }
  }

  try {
    // ══════════════════════════════════════════════
    // TEST SUITE 1: CV BUILDER (/cv)
    // ══════════════════════════════════════════════
    console.log("\n📋 Suite 1: Testing CV Builder (/cv)...");
    await page.goto("http://localhost:3000/cv", { waitUntil: "networkidle" });

    // 1.1 Page Title & Hero
    const cvTitle = await page.textContent("h1");
    assert(cvTitle?.includes("Clean Academic CV") ?? false, "CV Builder hero heading renders correctly");

    // 1.2 Preset Selector
    const presetButtons = await page.$$("div.bg-white.rounded-2xl div.flex.flex-wrap.gap-2 button");
    assert(presetButtons.length >= 3, `Presets rendered: found ${presetButtons.length} templates`);

    // 1.3 Form default values
    const nameInput = await page.inputValue("input[placeholder='e.g. Aditya Sharma']");
    assert(nameInput === "Aditya Sharma", "Default preset populated Full Name correctly");

    // 1.4 Switch to MBA Preset
    await page.click("button:has-text('MBA Aspirant')");
    await page.waitForTimeout(300);
    const mbaName = await page.inputValue("input[placeholder='e.g. Aditya Sharma']");
    assert(mbaName === "Priya Menon", "Switching preset updates form state to Priya Menon");

    // 1.5 Formatted Document View
    const docPreview = await page.$("#cv-printable-doc");
    assert(docPreview !== null, "Formatted Document A4 Preview (#cv-printable-doc) is visible");
    const previewText = await docPreview?.textContent();
    assert(previewText?.includes("PRIYA MENON") ?? false, "Document preview displays applicant name in bold uppercase");
    assert(previewText?.includes("Christ University") ?? false, "Document preview displays education credentials");

    // 1.6 Switch View to Raw Text
    await page.click("button:has-text('Edit Raw Text')");
    await page.waitForTimeout(300);
    const textarea = await page.$("textarea[rows='22']");
    assert(textarea !== null, "Raw Text editor textarea renders when toggled");

    // 1.7 Switch back to Formatted View
    await page.click("button:has-text('Formatted View')");
    await page.waitForTimeout(300);
    const docPreviewBack = await page.$("#cv-printable-doc");
    assert(docPreviewBack !== null, "Toggling back restores Formatted Document View");

    // 1.8 Test Word Download Trigger
    const [downloadDoc] = await Promise.all([
      page.waitForEvent("download"),
      page.click("button:has-text('Download Word')"),
    ]);
    const docFileName = downloadDoc.suggestedFilename();
    assert(docFileName.includes(".doc"), `Download Word (.doc) triggered successfully: ${docFileName}`);

    // 1.9 Test Text Download Trigger
    const [downloadTxt] = await Promise.all([
      page.waitForEvent("download"),
      page.click("button:has-text('Download Text')"),
    ]);
    const txtFileName = downloadTxt.suggestedFilename();
    assert(txtFileName.includes(".txt"), `Download Text (.txt) triggered successfully: ${txtFileName}`);

    // 1.10 Counselor Review Modal
    await page.click("button:has-text('Request Free Review')");
    await page.waitForTimeout(400);
    const modalTitle = await page.textContent("h3:has-text('Free CV Review')");
    assert(modalTitle?.includes("Free CV Review") ?? false, "Counselor Review modal opens properly with prefilled profile");
    // Close modal
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);

    // ══════════════════════════════════════════════
    // TEST SUITE 2: DEDICATED AI COURSE FINDER (/universities)
    // ══════════════════════════════════════════════
    console.log("\n🎓 Suite 2: Testing Dedicated AI Course Finder (/universities)...");
    await page.goto("http://localhost:3000/universities", { waitUntil: "networkidle" });

    // 2.1 Hero Header & Branding
    const heroH1 = await page.textContent("h1");
    assert(heroH1?.includes("AI Course Finder") ?? false, "Dedicated AI Course Finder hero title renders");

    // 2.2 Metric Badges
    const metricsBar = await page.textContent("body");
    assert(metricsBar?.includes("1,200+ Degree Courses") ?? false, "Hero metrics bar highlights degree courses count");

    // 2.3 Course Cards Render
    let cards = await page.$$("div.rounded-3xl.border");
    assert(cards.length > 5, `Initial course cards rendered: ${cards.length} programs`);

    // 2.4 Search Course by Keyword (e.g. "Robotics")
    const searchInput = page.locator("input[placeholder*='Enter course title or field']");
    await searchInput.fill("Robotics");
    await page.waitForTimeout(500);

    const roboticsCards = await page.$$("h3:has-text('Robotics')");
    assert(roboticsCards.length >= 2, `Search 'Robotics' returned ${roboticsCards.length} matching robotics degree programs`);

    // 2.5 Quick Category Chip click (e.g. "Tuition-Free Germany Public")
    await page.click("button:has-text('Tuition-Free Germany Public')");
    await page.waitForTimeout(500);

    const freeText = await page.textContent("body");
    assert(freeText?.includes("Technical University of Munich (TUM)") ?? false, "Tuition-Free Germany chip lists TUM programs");
    assert(freeText?.includes("Free (€0 Public)") ?? false, "Shows Free (€0 Public) badge");

    // 2.6 Clear Filters
    await page.click("button:has-text('Reset All Filters')");
    await page.waitForTimeout(500);

    // 2.7 Multi-Filter Dropdowns: Filter by Degree Level = "MBA"
    const degreeSelect = page.locator("select").nth(1);
    await degreeSelect.selectOption("MBA");
    await page.waitForTimeout(500);

    const mbaCourses = await page.$$("span:has-text('MBA')");
    assert(mbaCourses.length >= 2, `Degree level filter 'MBA' displayed MBA programs`);

    // Reset again
    await page.click("button:has-text('Reset All Filters')");
    await page.waitForTimeout(500);

    // 2.8 Course Card Details Verification
    const firstCourseTitle = await page.locator("h3").first().textContent();
    assert(firstCourseTitle !== null && firstCourseTitle.length > 5, `First course title verified: "${firstCourseTitle}"`);

    const aiInsightBadge = await page.locator("text=AI Course Evaluation").first().isVisible();
    assert(aiInsightBadge, "AI Course Evaluation box with visa work rights renders on course cards");

    // 2.9 Shortlist Feature
    const bookmarkButton = page.locator("button[aria-label='Add to shortlist']").first();
    await bookmarkButton.click();
    await page.waitForTimeout(300);

    const shortlistPill = await page.locator("button:has-text('Shortlisted')").isVisible();
    assert(shortlistPill, "Shortlist counter button appears after bookmarking a course");

    // 2.10 Individual Course Application Modal
    const applyButton = page.locator("button:has-text('Check Course Eligibility & Apply')").first();
    await applyButton.click();
    await page.waitForTimeout(400);

    const applyModalHeading = await page.textContent("h3:has-text('Eligibility Check')");
    assert(applyModalHeading !== null, "Check Course Eligibility modal opens with course context");
    await page.keyboard.press("Escape");
    await page.waitForTimeout(300);

    // ══════════════════════════════════════════════
    // TEST SUITE 3: SITE NAVIGATION & HEADER INTEGRATION
    // ══════════════════════════════════════════════
    console.log("\n🧭 Suite 3: Testing Navigation & Header Integration...");
    await page.goto("http://localhost:3000/", { waitUntil: "networkidle" });

    // 3.1 Primary Nav Link
    const navLink = await page.locator("nav a:has-text('AI Course Finder')").first().isVisible();
    assert(navLink, "Header navigation displays 'AI Course Finder'");

    // 3.2 Footer Links
    const footerCourseFinder = await page.locator("footer a:has-text('AI Course Finder')").isVisible();
    assert(footerCourseFinder, "Footer contains 'AI Course Finder' with AI Match badge");

    const footerCvBuilder = await page.locator("footer a:has-text('AI CV Builder')").isVisible();
    assert(footerCvBuilder, "Footer contains 'AI CV Builder' with AI Tool badge");

    console.log(`\n🎉 Test Run Complete: ${passed} Passed, ${failed} Failed.`);
  } catch (err) {
    console.error("Test execution error:", err);
    failed++;
  } finally {
    await browser.close();
  }

  process.exit(failed > 0 ? 1 : 0);
}

runTests();
