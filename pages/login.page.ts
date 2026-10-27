import { type Page, type Locator } from '@playwright/test';

export class LoginPage {
  readonly email: Locator;
  readonly password: Locator;
  readonly signIn: Locator;
  readonly message: Locator;

  constructor(private readonly page: Page) {
    this.email = page.getByLabel('Email');
    this.password = page.getByLabel('Password');
    this.signIn = page.getByRole('button', { name: 'Sign in' });
    this.message = page.getByRole('alert');
  }

  async goto() { await this.page.goto('/'); }

  async login(email: string, password: string) {
    await this.email.fill(email);
    await this.password.fill(password);
    await this.signIn.click();
  }
}
