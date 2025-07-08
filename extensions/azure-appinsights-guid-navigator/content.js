// GUID regex pattern
const GUID_REGEX = /[a-f0-9]{8}-?[a-f0-9]{4}-?[a-f0-9]{4}-?[a-f0-9]{4}-?[a-f0-9]{12}/gi;

// Currently selected GUID
let selectedGuid = null;

// Add selection listener
document.addEventListener('mouseup', handleTextSelection);
document.addEventListener('dblclick', handleDoubleClick);

// Handle text selection
function handleTextSelection() {
  const selection = window.getSelection().toString().trim();
  if (selection && isValidGuid(selection)) {
    highlightAndStoreGuid(selection);
  }
}

// Handle double-click selection
function handleDoubleClick(event) {
  const selection = window.getSelection().toString().trim();
  if (selection && isValidGuid(selection)) {
    highlightAndStoreGuid(selection);
    // Auto-navigate on double-click
    setTimeout(() => {
      navigateToTransactionSearch(selection);
    }, 100);
  }
}

// Check if string is a valid GUID
function isValidGuid(str) {
  return GUID_REGEX.test(str);
}

// Highlight and store selected GUID
function highlightAndStoreGuid(guid) {
  selectedGuid = guid;
  
  // Store in history
  chrome.storage.local.get(['guidHistory'], function(result) {
    let history = result.guidHistory || [];
    // Remove if exists and add to beginning
    history = history.filter(g => g !== guid);
    history.unshift(guid);
    // Keep only last 50 items
    history = history.slice(0, 50);
    chrome.storage.local.set({guidHistory: history});
  });
  
  // Notify popup if open
  chrome.runtime.sendMessage({action: 'guidSelected', guid: guid});
  
  // Show visual feedback
  showGuidTooltip(guid);
}

// Show tooltip with selected GUID
function showGuidTooltip(guid) {
  // Remove existing tooltip
  const existingTooltip = document.getElementById('guid-navigator-tooltip');
  if (existingTooltip) {
    existingTooltip.remove();
  }
  
  // Create new tooltip
  const tooltip = document.createElement('div');
  tooltip.id = 'guid-navigator-tooltip';
  tooltip.innerHTML = `
    <div class="guid-tooltip-content">
      <span class="guid-tooltip-label">Operation ID:</span>
      <span class="guid-tooltip-value">${guid}</span>
      <button class="guid-tooltip-btn">Go to Transaction Search →</button>
    </div>
  `;
  
  // Position near selection
  const selection = window.getSelection();
  if (selection.rangeCount > 0) {
    const range = selection.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
  }
  
  document.body.appendChild(tooltip);
  
  // Add click handler
  tooltip.querySelector('.guid-tooltip-btn').addEventListener('click', () => {
    navigateToTransactionSearch(guid);
    tooltip.remove();
  });
  
  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (document.getElementById('guid-navigator-tooltip')) {
      tooltip.remove();
    }
  }, 5000);
}

// Navigate to transaction search
function navigateToTransactionSearch(guid) {
  // Get current URL
  const currentUrl = window.location.href;
  
  // Check if we're on Azure portal
  if (currentUrl.includes('portal.azure.com') || currentUrl.includes('ms.portal.azure.com')) {
    // Extract resource information from current URL
    const resourceMatch = currentUrl.match(/\/resource([^\/]+\/[^\/]+\/[^\/]+\/[^\/]+)/);
    
    if (resourceMatch) {
      // Build transaction search URL
      const resourcePath = resourceMatch[1];
      const transactionUrl = `https://portal.azure.com/#blade/Microsoft_Azure_Monitoring_Logs/LogsBlade/resourceId/${encodeURIComponent(resourcePath)}/source/LogsBlade.AnalyticsShareLinkToQuery/query/dependencies%0A%7C%20where%20operation_Id%20%3D%3D%20%22${guid}%22%0A%7C%20union%20requests%2C%20traces%2C%20exceptions%2C%20customEvents%2C%20pageViews%0A%7C%20where%20operation_Id%20%3D%3D%20%22${guid}%22%0A%7C%20order%20by%20timestamp%20asc`;
      
      window.open(transactionUrl, '_blank');
    } else {
      // Fallback: Try to navigate within Application Insights
      const appInsightsUrl = `https://portal.azure.com/#blade/Microsoft_Azure_Monitoring/TxnDetailsBlade/operationId/${guid}`;
      window.open(appInsightsUrl, '_blank');
    }
  } else if (currentUrl.includes('applicationinsights.azure.com')) {
    // Direct Application Insights URL
    const match = currentUrl.match(/applicationinsights\.azure\.com\/subscriptions\/([^\/]+)\/resourcegroups\/([^\/]+)\/components\/([^\/]+)/);
    if (match) {
      const [, subscriptionId, resourceGroup, componentName] = match;
      const transactionUrl = `https://portal.azure.com/#@microsoft.onmicrosoft.com/resource/subscriptions/${subscriptionId}/resourceGroups/${resourceGroup}/providers/microsoft.insights/components/${componentName}/searchV1?query=operation_Id%3D%3D%22${guid}%22`;
      window.open(transactionUrl, '_blank');
    }
  } else if (currentUrl.includes('monitor.azure.com')) {
    // Azure Monitor URL
    const transactionUrl = `${window.location.origin}${window.location.pathname}?query=dependencies%0A%7C%20where%20operation_Id%20%3D%3D%20%22${guid}%22%0A%7C%20union%20requests%2C%20traces%2C%20exceptions%2C%20customEvents%2C%20pageViews%0A%7C%20where%20operation_Id%20%3D%3D%20%22${guid}%22%0A%7C%20order%20by%20timestamp%20asc`;
    window.location.href = transactionUrl;
  }
}

// Listen for messages from popup
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getSelectedGuid') {
    sendResponse({guid: selectedGuid});
  } else if (request.action === 'navigateToTransaction') {
    navigateToTransactionSearch(request.guid);
  }
});

// Add context menu support
document.addEventListener('contextmenu', function(event) {
  const selection = window.getSelection().toString().trim();
  if (selection && isValidGuid(selection)) {
    chrome.runtime.sendMessage({
      action: 'updateContextMenu',
      guid: selection
    });
  }
});