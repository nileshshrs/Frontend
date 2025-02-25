import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000"; // Update this if your app runs on a different port

test.describe("Forgot Password Page UI Tests", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/forgot-password`);
    });

    test("Should load the Forgot Password page", async ({ page }) => {
        await expect(page).toHaveURL(`${BASE_URL}/forgot-password`);
        await expect(page.locator("text=Trouble logging in?")).toBeVisible();
        await expect(page.locator("text=Enter your email, phone, or username")).toBeVisible();
    });

    test("Should validate empty email input", async ({ page }) => {
        await page.click("button:has-text('send')");
        await expect(page.locator("text=email cannot be empty")).toBeVisible();
    });

    test("Should validate invalid email format", async ({ page }) => {
        await page.fill("input[type='email']", "invalid-email");
        await page.click("button:has-text('send')");
        await expect(page.locator("text=email is invalid")).toBeVisible();
    });

    test("Should display error for non-existent email", async ({ page }) => {
        await page.fill("input[type='email']", "nonexistent@example.com");
        await page.click("button:has-text('send')");

        // Simulate API response (assuming backend returns this error message)
        await expect(page.locator("text=Email not found.")).toBeVisible();
    });

    test("Should successfully send password reset email", async ({ page }) => {
        await page.fill("input[type='email']", "validuser@example.com");
        await page.click("button:has-text('send')");

        // Simulate success message
        await expect(page.locator("text=Password reset email has been sent successfully.")).toBeVisible();
        await expect(page.locator("text=sign in")).toBeVisible();
    });

    test("Should navigate to sign-in page", async ({ page }) => {
        await page.click("text=sign in");
        await expect(page).toHaveURL(`${BASE_URL}/sign-in`);
    });

});
