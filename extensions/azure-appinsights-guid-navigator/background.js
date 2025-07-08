// Create context menu on install
chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: 'searchTransactionByGuid',
    title: 'Search Transaction by Operation ID',
    contexts: ['selection']
  });
});

// Handle context menu clicks
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === 'searchTransactionByGuid' && info.selectionText) {
    const selectedText = info.selectionText.trim();
    const guidRegex = /[a-f0-9]{8}-?[a-f0-9]{4}-?[a-f0-9]{4}-?[a-f0-9]{4}-?[a-f0-9]{12}/i;
    
    if (guidRegex.test(selectedText)) {
      // Send message to content script to handle navigation
      chrome.tabs.sendMessage(tab.id, {
        action: 'navigateToTransaction',
        guid: selectedText
      });
    }
  }
});

// Listen for messages from content script
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === 'updateContextMenu' && request.guid) {
    // Update context menu title with the selected GUID
    chrome.contextMenus.update('searchTransactionByGuid', {
      title: `Search Transaction: ${request.guid.substring(0, 8)}...`
    });
  }
});

// Reset context menu title when tab changes
chrome.tabs.onActivated.addListener(() => {
  chrome.contextMenus.update('searchTransactionByGuid', {
    title: 'Search Transaction by Operation ID'
  });
});