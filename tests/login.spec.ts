import { HttpResponse } from "msw";
import { test, expect } from "./setup";

test("login form should have correct title", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await expect(page).toHaveTitle(/Entrar/);
});

test("login form shows validation errors", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="cpf"]', "123");
  await page.fill('input[name="password"]', "123");
  await page.click("button[type=submit]");
  await expect(page.locator("text=CPF deve ter 11 dígitos")).toBeVisible();
  await expect(page.locator("text=Senha deve ter pelo menos 6 caracteres")).toBeVisible();
});

test("login form should have submit button", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await expect(page.locator("button[type=submit]")).toBeVisible();
  await expect(page.locator("button[type=submit]")).toHaveText("Entrar");
});

test("successful login", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="cpf"]', "12345678901");
  await page.fill('input[name="password"]', "123456");
  await page.click("button[type=submit]");

  await page.waitForSelector("text=Autenticado com sucesso!");
  await expect(page.locator("text=Autenticado com sucesso!")).toBeVisible();
});

test("on login should redirect to path /", async ({ page }) => {
  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="cpf"]', "12345678901");
  await page.fill('input[name="password"]', "123456");
  await page.click("button[type=submit]");

  await page.waitForSelector("text=Autenticado com sucesso!");
  await expect(page).toHaveURL("http://localhost:3000/");
});

test("access protected route without authentication should redirect to login", async ({ page }) => {
  await page.goto("http://localhost:3000/");
  await expect(page).toHaveURL("http://localhost:3000/login");
});

test("should show error alert on endpoint failure", async ({ page, worker, http }) => {
  await worker.use(
    http.post(
      "https://api.mock.com/login",
      async () =>
        new HttpResponse(JSON.stringify({ message: "Falhou com sucesso!" }), { status: 403 })
    )
  );

  await page.goto("http://localhost:3000/login");
  await page.fill('input[name="cpf"]', "12345678901");
  await page.fill('input[name="password"]', "123456");
  await page.click("button[type=submit]");

  await expect(page.locator("text=Falhou com sucesso!")).toBeVisible();
});

test("password visibility toggle should work correctly", async ({ page }) => {
  await page.goto("http://localhost:3000/login");

  const passwordInput = page.locator('input[name="password"]');
  await expect(passwordInput).toHaveAttribute("type", "password");

  await page.click('button[aria-label="toggle password visibility"]');
  await expect(passwordInput).toHaveAttribute("type", "text");

  await page.click('button[aria-label="toggle password visibility"]');
  await expect(passwordInput).toHaveAttribute("type", "password");
});
