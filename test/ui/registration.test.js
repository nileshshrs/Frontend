import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000"; // Change this if your app runs on a different port

test.describe("Registration Page UI Tests", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/sign-up`);
    });

    test("Should load the Registration page", async ({ page }) => {
        await expect(page).toHaveURL(`${BASE_URL}/sign-up`);
        await expect(page.locator("text=sign up")).toBeVisible();
    });

    test("Should validate empty registration fields", async ({ page }) => {
        await page.click("button:has-text('sign up')");
        await expect(page.locator("text=email cannot be empty")).toBeVisible();
        await expect(page.locator("text=4-24 characters")).toBeVisible();
        await expect(page.locator("text=8-24 characters")).toBeVisible();
    });

    test("Should validate incorrect email format", async ({ page }) => {
        await page.fill("input[placeholder='email']", "invalid-email");
        await page.click("button:has-text('sign up')");
        await expect(page.locator("text=email is invalid")).toBeVisible();
    });

    test("Should validate username constraints", async ({ page }) => {
        await page.fill("input[placeholder='username']", "ab");
        await page.click("button:has-text('sign up')");
        await expect(page.locator("text=4-24 characters")).toBeVisible();
    });

    test("Should validate password constraints", async ({ page }) => {
        await page.fill("input[placeholder='password']", "weakpass");
        await page.click("button:has-text('sign up')");
        await expect(page.locator("text=8-24 characters")).toBeVisible();
    });

    test("Should display error for already registered email", async ({ page }) => {
        await page.fill("input[placeholder='email']", "existing@example.com");
        await page.fill("input[placeholder='username']", "validUser123");
        await page.fill("input[placeholder='password']", "StrongPass1");

        await page.click("button:has-text('sign up')");

        // Simulate API response (assuming backend returns this error message)
        await expect(page.locator("text=Email is already in use")).toBeVisible();
    });

    test("Should successfully register a new user", async ({ page }) => {
        await page.fill("input[placeholder='email']", "newuser@example.com");
        await page.fill("input[placeholder='username']", "NewUser123");
        await page.fill("input[placeholder='password']", "SecurePass1");

        await page.click("button:has-text('sign up')");

        // Simulate success message
        await expect(page.locator("text=Sign Up Successful. Please verify email!")).toBeVisible();

        // Ensure redirection to sign-in page
        await page.waitForTimeout(3000); // Wait for toast message timeout
        await expect(page).toHaveURL(`${BASE_URL}/sign-in`);
    });

    test("Should navigate to sign-in page", async ({ page }) => {
        await page.click("text=sign in");
        await expect(page).toHaveURL(`${BASE_URL}/sign-in`);
    });

});
