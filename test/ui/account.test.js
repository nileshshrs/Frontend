import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000"; // Update this if your app runs on a different port

test.describe("Account Page UI Tests", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/account`);
    });

    test("Should load the account page", async ({ page }) => {
        await expect(page).toHaveURL(`${BASE_URL}/account`);
        await expect(page.locator("text=Edit Profile")).toBeVisible();
    });

    test("Should open and close edit profile modal", async ({ page }) => {
        await page.click("text=Edit Profile");
        await expect(page.locator("text=Save Changes")).toBeVisible();

        // Close modal (assuming there's a close button)
        await page.click('button:has-text("Close")');
        await expect(page.locator("text=Save Changes")).not.toBeVisible();
    });

    test("Should toggle followers modal", async ({ page }) => {
        await page.click("text=followers");
        await expect(page.locator("text=Your Followers")).toBeVisible();
        
        // Close modal
        await page.click('button:has-text("Close")');
        await expect(page.locator("text=Your Followers")).not.toBeVisible();
    });

    test("Should toggle following modal", async ({ page }) => {
        await page.click("text=following");
        await expect(page.locator("text=Following List")).toBeVisible();
        
        // Close modal
        await page.click('button:has-text("Close")');
        await expect(page.locator("text=Following List")).not.toBeVisible();
    });

    test("Should display the correct number of posts", async ({ page }) => {
        const postCount = await page.locator(".font-bold").nth(0).innerText(); // Assuming post count is in the first .font-bold element
        expect(Number(postCount)).toBeGreaterThanOrEqual(0);
    });

    test("Should open and close single post view", async ({ page }) => {
        const firstPost = page.locator(".grid.grid-cols-3 div").first();
        if (await firstPost.count() > 0) {
            await firstPost.click();
            await expect(page.locator("text=Post Details")).toBeVisible();

            // Close post
            await page.click('button:has-text("Close")');
            await expect(page.locator("text=Post Details")).not.toBeVisible();
        }
    });

    test("Should display placeholder when no posts exist", async ({ page }) => {
        if (await page.locator(".grid.grid-cols-3").count() === 0) {
            await expect(page.locator("text=Share Moments")).toBeVisible();
        }
    });

});
