import { test, expect } from '@playwright/test';

const API = 'https://api.practicesoftwaretesting.com';
const headers = { Accept: 'application/json', 'Content-Type': 'application/json' };

// The id of any cart a test creates, so afterEach can delete it
let cartId: string | undefined;

// Runs after every test, even if the test failed, so no cart is left behind
test.afterEach(async ({ request }) => {
  if (cartId) {
    await request.delete(`${API}/carts/${cartId}`, { headers });
    cartId = undefined;
  }
});

test('create a cart, add a product and read it back', async ({ request }) => {
  // Get a fresh product id (Toolshop ids change often)
  const products = await request.get(`${API}/products`, { headers });
  expect(products.status()).toBe(200);
  const productId = (await products.json()).data[0].id;

  // Create a cart
  const cart = await request.post(`${API}/carts`, { headers });
  expect(cart.status()).toBe(201);
  cartId = (await cart.json()).id;
  expect(cartId).toBeTruthy();

  // Add the product
  const add = await request.post(`${API}/carts/${cartId}`, {
    headers,
    data: { product_id: productId, quantity: 1 },
  });
  expect(add.status()).toBe(200);
  expect((await add.json()).result).toBe('item added or updated');

  // Read the cart back
  const read = await request.get(`${API}/carts/${cartId}`, { headers });
  expect(read.status()).toBe(200);
  const body = await read.json();
  expect(body.cart_items).toHaveLength(1);
  expect(body.cart_items[0].quantity).toBe(1);
});

test('a cart id that does not exist returns 404', async ({ request }) => {
  const response = await request.get(`${API}/carts/doesnotexist123`, { headers });
  expect(response.status()).toBe(404);
});