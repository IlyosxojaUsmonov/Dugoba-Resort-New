export default async function run(page) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole('button', { name: 'Chatni ochish' }).click();

    const dialog = page.getByRole('dialog', { name: 'Dugoba yordamchisi' });
    const input = dialog.getByRole('textbox', { name: 'Savolingizni yozing...' });
    const answers = [];

    const botMessages = dialog.locator('[aria-live="polite"] > div.mr-auto');
    for (const question of [
        '250 minglik xona qaysi?', 'Eng qimmat xona qaysi?', 'Eng qimmat kottej qaysi?', '4 kishilik xona qayerda?', 'Basseyn bormi?', 'Sauna bormi?', 'Wi-Fi bormi?', 'Kuniga 3 mahal halol ovqat bormi?', 'Parkovka bormi?', 'Resort manzili qayerda?', 'Bron qilish uchun nima qilaman?', 'asdkj qwerty 999',
    ]) {
        const previousBotMessages = await botMessages.count();
        await input.fill(question);
        await dialog.getByRole('button', { name: 'Yuborish' }).click();
        await page.waitForFunction((count) => document.querySelectorAll('[aria-live="polite"] > div.mr-auto').length > count, previousBotMessages);
        answers.push({ question, answer: await botMessages.last().textContent() });
    }

    return { viewport: 390, count: answers.length, answers };
}