import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000"; // Change this if your app runs on a different port

test.describe("Home Page UI Tests", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/`);
    });

    test("Should load the Home page", async ({ page }) => {
        await expect(page).toHaveURL(`${BASE_URL}/`);
        await expect(page.locator("text=Posts")).toBeVisible();
    });

    test("Should display posts", async ({ page }) => {
        await expect(page.locator("text=likes")).toBeVisible();
        await expect(page.locator("text=comments")).toBeVisible();
    });

    test("Should navigate to a single post when clicked", async ({ page }) => {
        const firstPost = page.locator(".grid.grid-cols-3 div").first();
        if (await firstPost.count() > 0) {
            await firstPost.click();
            await expect(page.locator("text=Post Details")).toBeVisible();

            // Close post
            await page.click('button:has-text("Close")');
            await expect(page.locator("text=Post Details")).not.toBeVisible();
        }
    });

    test("Should open and close the user menu", async ({ page }) => {
        await page.click("button:has-text('User Menu')");
        await expect(page.locator("text=Logout")).toBeVisible();

        // Close menu
        await page.click('button:has-text("Close")');
        await expect(page.locator("text=Logout")).not.toBeVisible();
    });

    test("Should allow liking a post", async ({ page }) => {
        await page.click("button:has-text('Like')");
        await expect(page.locator("text=1 Like")).toBeVisible();
    });

    test("Should allow commenting on a post", async ({ page }) => {
        await page.fill("textarea[name='comment']", "Nice post!");
        await page.click("button:has-text('Comment')");
        await expect(page.locator("text=Nice post!")).toBeVisible();
    });

    test("Should allow following a user", async ({ page }) => {
        await page.click("text=Follow");
        await expect(page.locator("text=Following")).toBeVisible();
    });

});
