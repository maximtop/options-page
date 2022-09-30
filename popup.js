const browser = window.chrome || window.browser;

const openOptionsButton = document.getElementById('open-options');

openOptionsButton.addEventListener('click', () => {
    browser.runtime.openOptionsPage();
});

const updateOptionsUrlButton = document.getElementById('update-options-url');
updateOptionsUrlButton.addEventListener('click', () => {
    const optionsPageUrl = browser.runtime.getURL('options.html');
    browser.tabs.query({}, (tabs) => {
        tabs.forEach((tab) => {
            const url = new URL(tab.url);
            if (url.origin + url.pathname === optionsPageUrl) {
                url.searchParams.set('test', 'test');
                browser.tabs.update(tab.id, { url: url.toString() });
            }
        });
    });
});

