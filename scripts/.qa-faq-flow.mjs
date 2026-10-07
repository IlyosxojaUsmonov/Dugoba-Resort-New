export default async function run(page) {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.getByRole('button', { name: 'Savollar oynasini ochish' }).click();

    const dialog = page.getByRole('dialog', { name: 'Dugoba yordamchisi' });
    const composer = dialog.getByRole('textbox', { name: 'Xabaringizni yozing...' });
    const faqToggle = dialog.getByRole('button', { name: 'Savollar ro‘yxatini ochish' });
    const hiddenByDefault = await dialog.getByRole('button', { name: 'Basseyn bormi?' }).count() === 0;

    await composer.fill('Dugoba qayerda?');
    await dialog.getByRole('button', { name: 'Yuborish' }).click();
    const typedQuestion = dialog.getByText('Dugoba qayerda?', { exact: true });
    await typedQuestion.waitFor({ timeout: 1000 });
    const typedStatus = dialog.getByRole('status');
    await typedStatus.waitFor({ timeout: 1000 });
    await typedStatus.waitFor({ state: 'detached', timeout: 6000 });
    const typedAnswer = dialog.getByText(/Shohimardon qishlog'i/, { exact: false });
    await typedAnswer.waitFor({ timeout: 1000 });

    await faqToggle.click();
    const questionsVisible = await dialog.getByRole('button', { name: 'Basseyn bormi?' }).count() === 1;
    await dialog.getByRole('button', { name: 'Eng qimmat kottej qaysi?' }).click();
    const faqQuestion = dialog.getByText('Eng qimmat kottej qaysi?', { exact: true });
    await faqQuestion.waitFor({ timeout: 1000 });
    const faqStatus = dialog.getByRole('status');
    await faqStatus.waitFor({ timeout: 1000 });
    await faqStatus.waitFor({ state: 'detached', timeout: 6000 });
    const cottageAnswer = dialog.getByText(/2 500 000/, { exact: false });
    await cottageAnswer.waitFor({ timeout: 1000 });
    await faqToggle.click();
    await dialog.getByRole('button', { name: 'Eng arzon narxdagi xonalarning barchasini ko‘rsat' }).click();
    const cheapestQuestion = dialog.getByText('Eng arzon narxdagi xonalarning barchasini ko‘rsat', { exact: true });
    await cheapestQuestion.waitFor({ timeout: 1000 });
    const cheapestStatus = dialog.getByRole('status');
    await cheapestStatus.waitFor({ timeout: 1000 });
    await cheapestStatus.waitFor({ state: 'detached', timeout: 6000 });
    const cheapestAnswer = dialog.getByText(/Sayt katalogidagi eng arzon xonalar/, { exact: false });
    await cheapestAnswer.waitFor({ timeout: 1000 });
    const cheapestAnswerText = await cheapestAnswer.textContent();

    return {
        viewport: 390,
        inputCount: await dialog.getByRole('textbox').count(),
        hiddenByDefault,
        questionsVisible,
        typedQuestionVisible: await typedQuestion.count() === 1,
        faqQuestionVisible: await faqQuestion.count() === 1,
        cheapestRoomsReturned: cheapestAnswerText ? cheapestAnswerText.split('Xona: 3 kishilik xona №').length - 1 : 0,
        typedAnswer: await typedAnswer.textContent(),
        cottageAnswer: await cottageAnswer.textContent(),
        cheapestAnswer: cheapestAnswerText,
        faqHiddenAfterSelection: await dialog.getByRole('button', { name: 'Basseyn bormi?' }).count() === 0,
    };
}