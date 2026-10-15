import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = process.env.PROJECT_ROOT || path.resolve(__dirname, "../../../../");

console.log("=========================================");
console.log("   UES Abroad SEO & Metadata Audit Tool  ");
console.log("=========================================\n");

const appDir = path.join(projectRoot, "src/app");
const pagesMissingMetadata = [];
const pagesWithMetadata = [];

function scanPages(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanPages(fullPath);
    } else if (entry.name === "page.tsx") {
      const relPath = path.relative(projectRoot, fullPath);
      // Skip admin dashboard pages for public SEO
      if (relPath.includes("admin")) continue;

      const content = fs.readFileSync(fullPath, "utf8");
      const hasStaticMetadata = /export\s+const\s+metadata\s*:\s*Metadata/.test(content);
      const hasDynamicMetadata = /export\s+(async\s+)?function\s+generateMetadata/.test(content);

      if (hasStaticMetadata || hasDynamicMetadata) {
        pagesWithMetadata.push({ path: relPath, type: hasDynamicMetadata ? "Dynamic" : "Static" });
      } else {
        pagesMissingMetadata.push(relPath);
      }
    }
  }
}

scanPages(appDir);

console.log(`[1] Page-Level Metadata Coverage:`);
console.log(`    - Covered Pages: ${pagesWithMetadata.length}`);
pagesWithMetadata.forEach((p) => console.log(`      ✓ ${p.path} (${p.type})`));

if (pagesMissingMetadata.length > 0) {
  console.log(`    - Pages Missing Dedicated Metadata (${pagesMissingMetadata.length}):`);
  pagesMissingMetadata.forEach((p) => console.log(`      ⚠ ${p} (falls back to RootLayout defaults)`));
} else {
  console.log(`    ✓ All public pages have explicit metadata!`);
}

// Check Sitemap coverage
console.log(`\n[2] Sitemap Completeness Check:`);
const sitemapFile = path.join(projectRoot, "src/app/sitemap.ts");
if (fs.existsSync(sitemapFile)) {
  const sitemapContent = fs.readFileSync(sitemapFile, "utf8");
  const blogsDataFile = path.join(projectRoot, "src/data/blogs.ts");
  
  if (fs.existsSync(blogsDataFile)) {
    const blogsContent = fs.readFileSync(blogsDataFile, "utf8");
    const slugMatches = [...blogsContent.matchAll(/slug:\s*["']([^"']+)["']/g)].map(m => m[1]);
    const isDynamic = sitemapContent.includes("getAllBlogs");

    if (isDynamic) {
      console.log(`    ✓ Sitemap dynamically imports and generates routes for all ${slugMatches.length} blog slugs via getAllBlogs()!`);
    } else {
      const missingSlugs = slugMatches.filter(slug => !sitemapContent.includes(slug));
      if (missingSlugs.length > 0) {
        console.log(`    ⚠ Sitemap does not dynamically include individual blog slugs (${missingSlugs.length} missing):`);
        missingSlugs.slice(0, 5).forEach(s => console.log(`      - /blogs/${s}`));
        if (missingSlugs.length > 5) console.log(`      ... and ${missingSlugs.length - 5} more.`);
      } else {
        console.log(`    ✓ All blog slugs are listed in sitemap.ts!`);
      }
    }
  }
} else {
  console.log(`    ✗ sitemap.ts not found!`);
}

// Check Robots.txt
console.log(`\n[3] Robots.txt Configuration:`);
const robotsFile = path.join(projectRoot, "src/app/robots.ts");
if (fs.existsSync(robotsFile)) {
  const robotsContent = fs.readFileSync(robotsFile, "utf8");
  const disallowsAdmin = robotsContent.includes("/admin");
  const hasSitemap = robotsContent.includes("sitemap");
  console.log(`    ${disallowsAdmin ? "✓" : "⚠"} Admin routes disallowed: ${disallowsAdmin}`);
  console.log(`    ${hasSitemap ? "✓" : "⚠"} Sitemap reference included: ${hasSitemap}`);
} else {
  console.log(`    ✗ robots.ts not found!`);
}

// Check Image Formats
console.log(`\n[4] Image Asset Modern Format Check:`);
const publicDir = path.join(projectRoot, "public");
const nonWebpImages = [];
let webpCount = 0;

function scanImages(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      scanImages(fullPath);
    } else {
      const ext = path.extname(entry.name).toLowerCase();
      if (ext === ".webp") {
        webpCount++;
      } else if (/\.(jpg|jpeg|png)$/i.test(entry.name)) {
        // Exclude system icons like apple-touch-icon.png or icon-*.png
        if (!/^(icon-|apple-touch|favicon)/i.test(entry.name)) {
          nonWebpImages.push(path.relative(publicDir, fullPath));
        }
      }
    }
  }
}

if (fs.existsSync(publicDir)) {
  scanImages(publicDir);
  console.log(`    - Total WebP Images: ${webpCount}`);
  if (nonWebpImages.length > 0) {
    console.log(`    ⚠ Legacy JPG/PNG images found (${nonWebpImages.length}):`);
    nonWebpImages.forEach(f => console.log(`      - public/${f}`));
  } else {
    console.log(`    ✓ All content/hero images are modern .webp!`);
  }
}

console.log("\n=========================================");
console.log("Audit complete. Run this audit anytime to maintain 100% SEO health.");
