import { expect, test } from "@playwright/test";

test("desktop portfolio interactions and layout", async ({ page }) => {
  const errors: string[] = [];
  await page.route("https://formspree.io/f/xwleobob", async (route) => {
    await route.fulfill({ status: 200, contentType: "application/json", body: '{"ok":true}' });
  });
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.emulateMedia({ colorScheme: "dark" });
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto("/", { waitUntil: "networkidle" });

  await expect(page).toHaveTitle("Aditya Kumar | AI/ML Engineer & Full-Stack Developer");
  await expect(page.getByRole("heading", { name: /Building intelligent systems/ })).toBeVisible();
  await expect(page.getByText("Ments, IIT Madras")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Selected Projects" })).toBeVisible();
  await expect(page.getByRole("link", { name: "Contact Aditya on WhatsApp" })).toHaveAttribute(
    "href",
    "https://wa.me/918766382326?text=Hi%20Aditya%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20connect.",
  );

  await page.getByRole("button", { name: "Switch to light theme" }).click();
  await expect(page.locator("html")).toHaveAttribute("data-theme", "light");
  await expect(page.locator("body")).toHaveCSS("background-color", "rgb(244, 247, 243)");
  await page.reload({ waitUntil: "networkidle" });
  await expect(page.getByRole("button", { name: "Switch to dark theme" })).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);

  await page.getByRole("button", { name: /View Details/ }).first().click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByRole("heading", { name: "Overview" })).toBeVisible();
  await expect(dialog.getByText("0.81+ Kaggle leaderboard score")).toBeVisible();
  await page.keyboard.press("Escape");
  await expect(dialog).toBeHidden();

  await page.locator("#contact").scrollIntoViewIfNeeded();
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByText("Please enter your name.")).toBeVisible();
  await expect(page.getByText("Enter a valid email address.")).toBeVisible();
  await expect(page.getByText("Please add a little more detail.")).toBeVisible();

  await page.getByLabel("Name").fill("Portfolio Visitor");
  await page.getByLabel("Email").fill("visitor@example.com");
  await page.getByLabel("Message").fill("I would like to discuss a suitable engineering opportunity.");
  await page.getByRole("button", { name: "Send Message" }).click();
  await expect(page.getByRole("status")).toContainText("message has been sent successfully");

  const [download] = await Promise.all([
    page.waitForEvent("download"),
    page.getByRole("link", { name: "Download Resume" }).last().click(),
  ]);
  expect(download.suggestedFilename()).toBe("aditya-kumar-resume.pdf");

  const github = page.getByRole("link", { name: /github.com\/kraditya0/ });
  await expect(github).toHaveAttribute("href", "https://github.com/kraditya0");
  expect(errors).toEqual([]);
  await page.screenshot({ path: "/tmp/aditya-portfolio-desktop.png", fullPage: true });
});

test("mobile menu, project layout, and reduced motion", async ({ page }) => {
  const errors: string[] = [];
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));

  await page.emulateMedia({ reducedMotion: "reduce", colorScheme: "dark" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/", { waitUntil: "networkidle" });

  const menu = page.getByRole("button", { name: "Open navigation" });
  await menu.click();
  await expect(page.getByRole("link", { name: /03 Experience/ })).toBeVisible();
  await page.getByRole("link", { name: /05 Projects/ }).click();
  await expect(page.locator("#projects")).toBeInViewport();
  await expect(page.getByRole("button", { name: "Open navigation" })).toBeVisible();

  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  expect(overflow).toBeLessThanOrEqual(1);
  await expect(page.locator("html")).toHaveCSS("scroll-behavior", "auto");

  await page.getByRole("button", { name: /View Details/ }).nth(1).click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Close project details" }).click();
  await expect(page.getByRole("dialog")).toBeHidden();

  expect(errors).toEqual([]);
  await page.screenshot({ path: "/tmp/aditya-portfolio-mobile.png", fullPage: true });
});
