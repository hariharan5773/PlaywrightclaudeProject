import { test, expect } from '@playwright/test';
import { queryDatabase } from '../utils/database';

test.describe('Database Data Validation', () => {

  test('[SCRUM-7][TC-001] should list data from the users table', async () => {
    const rows = await queryDatabase('SELECT * FROM users');

    expect(rows.length).toBeGreaterThan(0);
    console.log(`Fetched users table data: ${JSON.stringify(rows)}`);
  });

});
