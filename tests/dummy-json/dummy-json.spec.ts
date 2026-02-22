import { test, expect } from "@playwright/test";

test("get authenticated user", async ({ request }) => {
  const auth = await request.get("auth/me", {
    headers: {
      Authorization: `Bearer ${process.env.API_TOKEN}`,
    },
  });
  expect(auth.status()).toBeTruthy();
});

test("get all products", async ({ request }) => {
  const products = await request.get("products");
  expect(products.status()).toBeTruthy();
  const productsBody = await products.json();
  expect(productsBody.products).toContainEqual(
    expect.objectContaining({
      id: expect.any(Number),
      title: expect.any(String),
      description: expect.any(String),
      category: expect.any(String),
      price: expect.any(Number),
      discountPercentage: expect.any(Number),
      rating: expect.any(Number),
      stock: expect.any(Number),
      tags: expect.any(Array),
      brand: expect.any(String),
      sku: expect.any(String),
      weight: expect.any(Number),
      dimensions: expect.objectContaining({
        width: expect.any(Number),
        height: expect.any(Number),
        depth: expect.any(Number),
      }),
      warrantyInformation: expect.any(String),
      shippingInformation: expect.any(String),
      availabilityStatus: expect.any(String),
      reviews: expect.any(Array),
      returnPolicy: expect.any(String),
      minimumOrderQuantity: expect.any(Number),
      meta: expect.objectContaining({
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        barcode: expect.any(String),
        qrCode: expect.any(String),
      }),
      thumbnail: expect.any(String),
      images: expect.any(Array),
    }),
  );
});

test("add product", async ({ request }) => {
  await expect
    .poll(async () => {
      const addProduct = await request.post("products/add", {
        data: {
          title: "Happy Meal",
          price: 100,
        },
      });
      expect(addProduct.status()).toBeTruthy();
      return await addProduct.json();
    })
    .toMatchObject({
      id: expect.any(Number),
      title: "Happy Meal",
      price: 100,
    });
});
