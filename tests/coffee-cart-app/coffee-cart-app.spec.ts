import { test, expect } from "@playwright/test";

test("redirect to coffe-cart main page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL("/");
});

test("add espresso to cart", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-test="Espresso"]').click();
  await expect(page.locator('[data-test="checkout"]')).toContainText(
    "Total: $10.00",
  );
  // Check correct redirect to cart page
  await page.locator('[aria-label="Cart page"]').click();
  await expect(page).toHaveURL("/cart");
  // Сheck whether our order is displayed correctly in the cart
  await expect(page.locator('[data-test="checkout"]')).toContainText(
    "Total: $10.00",
  );
  await expect(page.locator('[id="app"]')).toContainText("Espresso");
  await expect(page.locator('[id="app"]')).toContainText("$10.00");
});

test("add multiple espresso items to cart", async ({ page }) => {
  await page.goto("/");
  await page.locator('[data-test="Espresso"]').click({ clickCount: 3 });
  // Get a discount for 1 cup of Mocha
  await expect(page.locator('[class="promo"]')).toContainText(
    "It's your lucky day! Get an extra cup of Mocha for $4.",
  );
  // Corfirm discount
  await page.locator('[class="yes"]').click();
  await expect(page.locator('[data-test="checkout"]')).toHaveText(
    "Total: $34.00",
  );
  await page.locator('[aria-label="Cart page"]').click();
  // Сheck whether our order is displayed correctly in the cart
  await expect(page.locator('[data-test="checkout"]')).toHaveText(
    "Total: $34.00",
  );
  await expect(page.locator('[id="app"]')).toContainText(
    "(Discounted) Mocha",
  );
  await expect(page.locator('[id="app"]')).toContainText("$4.00");
  await expect(page.locator('[id="app"]')).toContainText("Espresso");
  await expect(page.locator('[id="app"]')).toContainText("$30.00");
});

test("remove items from cart", async ({page})=>{
  await page.goto("/");
  await page.locator('[data-test="Espresso"]').click();
  await page.locator('[aria-label="Cart page"]').click();
  // Сheck whether our order is displayed correctly in the cart 
  await expect(page.locator('[id="app"]')).toContainText("Espresso");
  await expect(page.locator('[id="app"]')).toContainText("$10.00");
  // Delete order item in cart
  await page.locator('[class="delete"]').click()
  // Check that item was removed
  await expect(page.locator('[id="app"]')).toContainText('No coffee, go add some.')
  await expect(page.locator('[id="app"]')).not.toContainText("Espresso");
  await expect(page.locator('[id="app"]')).not.toContainText("$10.00");
});

test("confirm purchase", async ({page})=> {
  await page.goto("/");
  await page.locator('[data-test="Americano"]').click();
  // Open payment modal
  await page.locator('[data-test="checkout"]').click()
  // Check that modal appears
  await expect(page.locator('[class="modal-content size"]')).toBeVisible()
  // Complete purchase
  await page.locator('[id="name"]').fill("Test Name")
  await page.locator('[id="email"]').fill("test@mail.com")
  await page.locator('[id="submit-payment"]').click()
  // Successful notification and cart balance dropped check
  await expect(page.locator('[class="snackbar success"]')).toContainText('Thanks for your purchase. Please check your email for payment.')
  await expect(page.locator('[data-test="checkout"]')).toContainText(
    "Total: $0.00",
  );
})
