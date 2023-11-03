import { assert, assertEquals } from "assert/mod.ts";
import { buildFor } from "sinco/mod.ts";

Deno.test("Can display the home page. ", async () => {
  const { browser, page } = await buildFor("chrome");

  await page.location("http://localhost:8888/");

  try {
    assertEquals(await page.location(), "http://localhost:8888/");
  } catch (error) {
    await browser.close();
    throw new Error("Location error.", { cause: error });
  }

  const pageTitle = await page.evaluate(() => {
    return document.querySelector("main h1")?.textContent;
  });

  await browser.close();

  assert(pageTitle === "Home");
});

Deno.test("Can display the posts page.", async () => {
  const { browser, page } = await buildFor("chrome");

  await page.location("http://localhost:8888/");

  try {
    assertEquals(await page.location(), "http://localhost:8888/");
  } catch (error) {
    await browser.close();
    throw new Error("Location error.", { cause: error });
  }

  const link = await page.querySelector('header nav a[href="/posts"]');

  try {
    await link.click({
      waitFor: "navigation",
    });

    assertEquals(await page.location(), "http://localhost:8888/posts");
  } catch (error) {
    await browser.close();
    throw new Error("Location error.", { cause: error });
  }

  const pageTitle = await page.evaluate(() => {
    return document.querySelector("main h1")?.textContent;
  });

  await browser.close();

  assert(pageTitle === "Posts");
});
