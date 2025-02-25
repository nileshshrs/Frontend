import { test, expect } from "@playwright/test";

const API_URL = "http://localhost:6278/api/v1"; // Change this based on your backend

test.describe("Full API Test Suite", () => {

    // ✅ Authentication
    test("Should register a new user", async ({ request }) => {
        const response = await request.post(`${API_URL}/auth/sign-up`, {
            headers: { "Content-Type": "application/json" },
            data: { username: "testuser", email: "test@example.com", password: "password123" },
        });

        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty("_id");
    });

    test("Should log in a user", async ({ request }) => {
        const response = await request.post(`${API_URL}/auth/sign-in`, {
            headers: { "Content-Type": "application/json" },
            data: { email: "test@example.com", password: "password123" },
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty("accessToken");
    });

    test("Should log out a user", async ({ request }) => {
        const response = await request.get(`${API_URL}/auth/logout`, {
            headers: { Authorization: "Bearer mockToken" },
        });

        expect(response.status()).toBe(200);
    });

    // ✅ User Profile
    test("Should fetch user profile", async ({ request }) => {
        const response = await request.get(`${API_URL}/user/profile`, {
            headers: { Authorization: "Bearer mockToken" },
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty("username");
    });

    test("Should update user profile", async ({ request }) => {
        const response = await request.patch(`${API_URL}/user/update`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer mockToken",
            },
            data: { username: "updatedUser" },
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(responseBody.message).toBe("Profile updated successfully");
    });

    // ✅ Posts
    test("Should create a new post", async ({ request }) => {
        const response = await request.post(`${API_URL}/post/create`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer mockToken",
            },
            data: { content: "This is a Playwright API test post" },
        });

        expect(response.status()).toBe(201);
        const responseBody = await response.json();
        expect(responseBody).toHaveProperty("_id");
    });

    test("Should fetch all posts", async ({ request }) => {
        const response = await request.get(`${API_URL}/post/get`, {
            headers: { Authorization: "Bearer mockToken" },
        });

        expect(response.status()).toBe(200);
        const responseBody = await response.json();
        expect(Array.isArray(responseBody)).toBeTruthy();
    });

    test("Should fetch a post by ID", async ({ request }) => {
        const response = await request.get(`${API_URL}/post/get/mockPostId`, {
            headers: { Authorization: "Bearer mockToken" },
        });

        expect(response.status()).toBe(200);
    });

    test("Should delete a post", async ({ request }) => {
        const response = await request.delete(`${API_URL}/post/delete/mockPostId`, {
            headers: { Authorization: "Bearer mockToken" },
        });

        expect(response.status()).toBe(200);
    });

    // ✅ Likes
    test("Should like a post", async ({ request }) => {
        const response = await request.post(`${API_URL}/likes/toggle-likes`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer mockToken",
            },
            data: { userID: "mockUserId", postID: "mockPostId" },
        });

        expect(response.status()).toBe(201);
    });

    test("Should fetch likes for a post", async ({ request }) => {
        const response = await request.get(`${API_URL}/likes/likes-by-post/mockPostId`, {
            headers: { Authorization: "Bearer mockToken" },
        });

        expect(response.status()).toBe(200);
    });

    // ✅ Comments
    test("Should create a comment", async ({ request }) => {
        const response = await request.post(`${API_URL}/comment/create`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer mockToken",
            },
            data: { post: "mockPostId", comment: "This is a Playwright test comment" },
        });

        expect(response.status()).toBe(201);
    });

    test("Should fetch comments on a post", async ({ request }) => {
        const response = await request.get(`${API_URL}/comment/get/mockPostId`, {
            headers: { Authorization: "Bearer mockToken" },
        });

        expect(response.status()).toBe(200);
    });

    test("Should delete a comment", async ({ request }) => {
        const response = await request.delete(`${API_URL}/comment/delete/mockCommentId`, {
            headers: { Authorization: "Bearer mockToken" },
        });

        expect(response.status()).toBe(200);
    });

    // ✅ Conversations
    test("Should fetch user conversations", async ({ request }) => {
        const response = await request.get(`${API_URL}/conversation/get`, {
            headers: { Authorization: "Bearer mockToken" },
        });

        expect(response.status()).toBe(200);
    });

    test("Should send a message", async ({ request }) => {
        const response = await request.post(`${API_URL}/messages/create/mockConversationId`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer mockToken",
            },
            data: { recipient: "mockRecipientId", content: "Hello, test message" },
        });

        expect(response.status()).toBe(201);
    });

    // ✅ Followers
    test("Should follow a user", async ({ request }) => {
        const response = await request.post(`${API_URL}/follow/mockUserId`, {
            headers: { Authorization: "Bearer mockToken" },
        });

        expect(response.status()).toBe(201);
    });

    test("Should unfollow a user", async ({ request }) => {
        const response = await request.delete(`${API_URL}/follow/unfollow/mockFollowId`, {
            headers: { Authorization: "Bearer mockToken" },
        });

        expect(response.status()).toBe(200);
    });

});
