import { test, expect, APIRequestContext } from '@playwright/test';

const API = 'https://api.practicesoftwaretesting.com';
const headers = { Accept: 'application/json', 'Content-Type': 'application/json' };

// Small helper: gets a fresh product id, because Toolshop ids change often
async function getFreshProductId(request: APIRequestContext): Promise<string> {
  const response = await request.get(`${API}/products`, { headers });
  expect(response.status()).toBe(200);
  const body = await response.json();
  // Day 8 feedback: check the list's shape, not a hard-coded total
  expect(body.data.length).toBeGreaterThan(0);
  expect(body.data[0]).toHaveProperty('id');
  return body.data[0].id;
}

test('C4 Add to a cart: the cart contains the product that was added', async ({ request }) => {
  const productId = await getFreshProductId(request);

  // Create a cart
  const cartResponse = await request.post(`${API}/carts`, { headers });
  expect(cartResponse.status()).toBe(201);
  const cartId = (await cartResponse.json()).id;

  try {
    // Add the product
    const addResponse = await request.post(`${API}/carts/${cartId}`, {
      headers,
      data: { product_id: productId, quantity: 1 },
    });
    expect(addResponse.status()).toBe(200);
    expect((await addResponse.json()).result).toBe('item added or updated');

    // Read the cart back: it must hold the same product, quantity 1
    const readResponse = await request.get(`${API}/carts/${cartId}`, { headers });
    expect(readResponse.status()).toBe(200);
    const cart = await readResponse.json();
    expect(cart.cart_items).toHaveLength(1);
    expect(cart.cart_items[0].product_id).toBe(productId);
    expect(cart.cart_items[0].quantity).toBe(1);
  } finally {
    // Always delete the cart, even if a check above failed
    await request.delete(`${API}/carts/${cartId}`, { headers });
  }
});

test('C5 Unknown cart (extra check): a cart id that does not exist returns 404', async ({ request }) => {
  const response = await request.get(`${API}/carts/does-not-exist-123`, { headers });
  expect(response.status()).toBe(404);
});