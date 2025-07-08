# Azure AppInsights GUID Navigator

A Chrome extension that makes it easy to navigate from Azure Application Insights Logs view to Transaction search by selecting operation_id GUIDs.

## Features

- **Quick GUID Selection**: Select any GUID/operation_id on the page to navigate to transaction search
- **Double-click Navigation**: Double-click on a GUID to automatically navigate to transaction search
- **Context Menu**: Right-click on selected GUID to search transaction
- **History Tracking**: Keeps track of recently selected GUIDs for easy access
- **Visual Feedback**: Shows a tooltip when a GUID is selected
- **Popup Interface**: Access recent GUIDs and navigate from the extension popup

## Installation

1. Open Chrome and navigate to `chrome://extensions/`
2. Enable "Developer mode" in the top right
3. Click "Load unpacked"
4. Select the `extensions/azure-appinsights-guid-navigator` folder
5. The extension will be installed and ready to use

## Generating Icons

1. Open the `generate-icons.html` file in Chrome
2. Right-click on each canvas and save as:
   - `icon16.png`
   - `icon48.png`
   - `icon128.png`

## Usage

1. Navigate to Azure Portal, Application Insights, or Azure Monitor
2. When viewing logs or traces:
   - **Select** any GUID/operation_id text to highlight it
   - **Double-click** to immediately navigate to transaction search
   - **Right-click** and select "Search Transaction by Operation ID"
   - Or click the extension icon to see recent GUIDs

## How It Works

The extension:
1. Detects GUID patterns in selected text
2. Validates the format (8-4-4-4-12 hexadecimal pattern)
3. Constructs the appropriate transaction search URL based on the current Azure service
4. Opens the transaction search in a new tab with the selected operation_id

## Supported Platforms

- Azure Portal (portal.azure.com)
- Application Insights (applicationinsights.azure.com)
- Azure Monitor (monitor.azure.com)

## Permissions

The extension requires:
- `activeTab`: To interact with the current tab
- `contextMenus`: To add right-click menu options
- `storage`: To store GUID history
- Host permissions for Azure domains