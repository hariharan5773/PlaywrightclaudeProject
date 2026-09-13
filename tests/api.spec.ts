import { test, expect } from '@playwright/test';

test('[SCRUM-9][TC-003] should return user 1 from the users API', async ({ request }) => {
  const response = await request.get('https://dummyjson.com/users/1');

  expect(response.ok()).toBe(true);

  const responseBody = await response.json();
  expect(responseBody.id).toBe(1);
});