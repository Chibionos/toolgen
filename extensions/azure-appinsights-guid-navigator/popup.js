// Get current tab and update UI
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
  chrome.tabs.sendMessage(tabs[0].id, {action: 'getSelectedGuid'}, function(response) {
    if (response && response.guid) {
      showSelectedGuid(response.guid);
    }
  });
});

// Load history on popup open
loadHistory();

// Show selected GUID in popup
function showSelectedGuid(guid) {
  document.getElementById('recent-selection').style.display = 'block';
  document.getElementById('selected-guid').textContent = guid;
}

// Copy GUID to clipboard
document.getElementById('copy-guid').addEventListener('click', function() {
  const guid = document.getElementById('selected-guid').textContent;
  navigator.clipboard.writeText(guid).then(function() {
    const btn = document.getElementById('copy-guid');
    btn.textContent = '✓';
    setTimeout(() => {
      btn.textContent = '📋';
    }, 1500);
  });
});

// Navigate to transaction search
document.getElementById('navigate-btn').addEventListener('click', function() {
  const guid = document.getElementById('selected-guid').textContent;
  navigateToTransactionSearch(guid);
});

// Clear history
document.getElementById('clear-history').addEventListener('click', function() {
  chrome.storage.local.set({guidHistory: []}, function() {
    loadHistory();
  });
});

// Navigate to transaction search with GUID
function navigateToTransactionSearch(guid) {
  chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {
      action: 'navigateToTransaction',
      guid: guid
    });
    window.close();
  });
}

// Load and display history
function loadHistory() {
  chrome.storage.local.get(['guidHistory'], function(result) {
    const history = result.guidHistory || [];
    const historyList = document.getElementById('guid-history');
    historyList.innerHTML = '';
    
    history.slice(0, 10).forEach(guid => {
      const li = document.createElement('li');
      li.textContent = guid;
      li.addEventListener('click', function() {
        navigateToTransactionSearch(guid);
      });
      historyList.appendChild(li);
    });
  });
}

// Listen for messages from content script
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'guidSelected') {
    showSelectedGuid(request.guid);
  }
});