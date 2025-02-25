import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000"; // Update this if your app runs on a different port
const TEST_USER_ID = "65fb5d1287a1c0001b2e1a67"; // Replace with a valid user ID

test.describe("UserProfile Page UI Tests", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/user/${TEST_USER_ID}`);
    });

    test("Should load the User Profile page", async ({ page }) => {
        await expect(page).toHaveURL(`${BASE_URL}/user/${TEST_USER_ID}`);
        await expect(page.locator("text=Posts")).toBeVisible();
    });

    test("Should display user details", async ({ page }) => {
        await expect(page.locator("img[alt='Profile']")).toBeVisible();
        await expect(page.locator("text=followers")).toBeVisible();
        await expect(page.locator("text=following")).toBeVisible();
    });

    test("Should allow following a user", async ({ page }) => {
        const followButton = page.locator("button:has-text('follow')");
        if (await followButton.count() > 0) {
            await followButton.click();
            await expect(page.locator("button:has-text('unfollow')")).toBeVisible();
        }
    });

    test("Should allow unfollowing a user", async ({ page }) => {
        const unfollowButton = page.locator("button:has-text('unfollow')");
        if (await unfollowButton.count() > 0) {
            await unfollowButton.click();
            await expect(page.locator("button:has-text('follow')")).toBeVisible();
        }
    });

    test("Should display user posts", async ({ page }) => {
        const posts = page.locator(".grid.grid-cols-3 img");
        if (await posts.count() > 0) {
            await expect(posts.first()).toBeVisible();
        } else {
            console.log("No posts available for this user.");
        }
    });

    test("Should open single post view when a post is clicked", async ({ page }) => {
        const firstPost = page.locator(".grid.grid-cols-3 img").first();
        if (await firstPost.count() > 0) {
            await firstPost.click();
            await expect(page.locator("text=Post Details")).toBeVisible();

            // Close post
            await page.click('button:has-text("Close")');
            await expect(page.locator("text=Post Details")).not.toBeVisible();
        }
    });

    test("Should open and close Followers modal", async ({ page }) => {
        await page.click("button:has-text('followers')");
        await expect(page.locator("text=Followers")).toBeVisible();

        // Close modal
        await page.click('button:has-text("Close")');
        await expect(page.locator("text=Followers")).not.toBeVisible();
    });

    test("Should open and close Following modal", async ({ page }) => {
        await page.click("button:has-text('following')");
        await expect(page.locator("text=Following")).toBeVisible();

        // Close modal
        await page.click('button:has-text("Close")');
        await expect(page.locator("text=Following")).not.toBeVisible();
    });

});
