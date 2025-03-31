chrome.runtime.onInstalled.addListener(() => {
    chrome.storage.sync.set({ blurEnabled: true });
});

chrome.action.onClicked.addListener((tab) => {
    chrome.storage.sync.get("blurEnabled", (data) => {
        const newStatus = !data.blurEnabled;
        chrome.storage.sync.set({ blurEnabled: newStatus });

        chrome.scripting.executeScript({
            target: { tabId: tab.id },
            func: toggleBlur,
            args: [newStatus]
        });
    });
});

function toggleBlur(status) {
    if (!status) {
        document.querySelectorAll("img").forEach(img => img.style.filter = "none");
    } else {
        document.querySelectorAll("img").forEach(img => {
            if (img.style.filter.includes("blur")) {
                img.style.filter = "blur(10px)";
            }
        });
    }
}