import { test, expect } from "@playwright/test";

const BASE_URL = "http://localhost:3000"; // Change this if your app runs on a different port

test.describe("Messages Page UI Tests", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/messages`);
    });

    test("Should load the Messages page", async ({ page }) => {
        await expect(page).toHaveURL(`${BASE_URL}/messages`);
        await expect(page.locator("text=Create Chat")).toBeVisible();
    });

    test("Should display conversations if available", async ({ page }) => {
        const conversationExists = await page.locator(".min-h-[90px]").count() > 0;

        if (conversationExists) {
            await expect(page.locator(".min-h-[90px]")).toBeVisible();
        } else {
            console.log("No conversations available for testing.");
        }
    });

    test("Should open and close Create Chat modal", async ({ page }) => {
        await page.click("button:has-text('Create Chat')");
        await expect(page.locator("text=Start a new conversation")).toBeVisible();

        // Close modal
        await page.click('button:has-text("Close")');
        await expect(page.locator("text=Start a new conversation")).not.toBeVisible();
    });

    test("Should navigate to a conversation when clicked", async ({ page }) => {
        const firstConversation = page.locator(".min-h-[90px]").first();

        if (await firstConversation.count() > 0) {
            await firstConversation.click();
            await expect(page).toHaveURL(/messages\/.*/); // Ensure the URL changes to a conversation
        }
    });

    test("Should display correct user and last message", async ({ page }) => {
        const firstConversation = page.locator(".min-h-[90px]").first();

        if (await firstConversation.count() > 0) {
            await expect(firstConversation.locator(".font-semibold")).toBeVisible();
            await expect(firstConversation.locator(".text-muted-foreground")).toBeVisible();
        }
    });

});

