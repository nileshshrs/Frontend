import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000"; // Update this if your app runs on a different port

test.describe("Login Page UI Tests", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/sign-in`);
    });

    test("Should load the Login page", async ({ page }) => {
        await expect(page).toHaveURL(`${BASE_URL}/sign-in`);
        await expect(page.locator("text=login")).toBeVisible();
    });

    test("Should validate empty login fields", async ({ page }) => {
        await page.click("button:has-text('login')");
        await expect(page.locator("text=username or email is required")).toBeVisible();
        await expect(page.locator("text=password is required")).toBeVisible();
    });

    test("Should validate incorrect login credentials", async ({ page }) => {
        await page.fill("input[id='email']", "invaliduser@example.com");
        await page.fill("input[id='password']", "wrongpassword");
        await page.click("button:has-text('login')");

        // Simulate API response (assuming backend returns this error message)
        await expect(page.locator("text=Invalid credentials. Please try again.")).toBeVisible();
    });

    test("Should successfully log in a valid user", async ({ page }) => {
        await page.fill("input[id='email']", "validuser@example.com");
        await page.fill("input[id='password']", "password123");
        await page.click("button:has-text('login')");

        // Simulate successful login redirection to home page
        await expect(page).toHaveURL(`${BASE_URL}/`);
    });

    test("Should navigate to forgot password page", async ({ page }) => {
        await page.click("text=forgot password?");
        await expect(page).toHaveURL(`${BASE_URL}/forgot-password`);
    });

    test("Should navigate to sign-up page", async ({ page }) => {
        await page.click("text=sign up");
        await expect(page).toHaveURL(`${BASE_URL}/sign-up`);
    });

});
