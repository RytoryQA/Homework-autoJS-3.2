const { test, expect } = require("@playwright/test");
const { login, password } = require("./data/user");


test("successful authorization test ", async ({ page }) => {
  
  await page.goto("https://netology.ru/?modal=sign_in");
  await expect(page).toHaveTitle("Нетология — обучение современным профессиям онлайн");

  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill(login);

  await page.getByPlaceholder('Пароль').click(); 
  await page.getByPlaceholder('Пароль').fill(password);

  await page.getByTestId('login-submit-btn').click();
  await expect(page).toHaveURL('https://netology.ru/profile/9262061')
  await expect(page).toHaveTitle("Мои программы обучения");

});

test("unsuccessful authorization test", async ({ page }) => {

  await page.goto("https://netology.ru/?modal=sign_in");
  await expect(page).toHaveTitle("Нетология — обучение современным профессиям онлайн");

  await page.getByPlaceholder('Email').click();
  await page.getByPlaceholder('Email').fill("ololo@ya.ru");

  await page.getByPlaceholder('Пароль').click(); 
  await page.getByPlaceholder('Пароль').fill("passwordpassword");
  await page.getByTestId('login-submit-btn').click();
  await expect(page.locator("data-testid=login-error-hint")).toHaveText("Вы ввели неправильно логин или пароль");
});

