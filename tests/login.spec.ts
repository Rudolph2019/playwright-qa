import { test, expect } from '@playwright/test';
import { LoginPage } from '../pages/login.page';

test.describe('Login (TBC-1)', () => {
  test('valid credentials show welcome message', { tag: '@smoke' }, async ({ page }) => {
    const login = new LoginPage(page);
    await test.step('Open login page', () => login.goto());
    await test.step('Submit valid credentials', () => login.login('qa@example.com', 'correct-horse'));
    await expect(login.message).toHaveText('Welcome, qa@example.com');
  });

  test('wrong password shows error', { tag: '@regression' }, async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.login('qa@example.com', 'wrong');
    await expect(login.message).toHaveText('Invalid email or password');
  });

  test('empty form is blocked by required validation', { tag: '@regression' }, async ({ page }) => {
    const login = new LoginPage(page);
    await login.goto();
    await login.signIn.click();
    await expect(login.message).toBeEmpty();
    await expect(login.email).toHaveJSProperty('validity.valueMissing', true);
  });
});
