import { test as setup, expect } from "@playwright/test";

setup("authenticate", async ({ request }) => {
  console.log(`USERNAME ${process.env.USER_NAME}, PASSWORD ${process.env.PASSWORD}`)
  // Perform the API login request
  const response = await request.post("auth/login", {
    data: {
      username: process.env.USER_NAME,
      password: process.env.PASSWORD
    },
  });
  console.log("api auth status " + response.status());
  expect(response.ok()).toBeTruthy();
  const responseBody = await response.json();
  process.env.API_TOKEN = responseBody.accessToken;
});
