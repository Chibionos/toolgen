# ToolGen - Azure AppInsights Chrome Extensions

This repository contains Chrome extensions and tools for enhancing Azure Application Insights experience.

## Chrome Extensions

### Azure AppInsights GUID Navigator

A Chrome extension that makes it easy to navigate from Azure Application Insights Logs view to Transaction search by selecting operation_id GUIDs.

![Build Status](https://github.com/YOUR_USERNAME/toolgen/actions/workflows/build-extension.yml/badge.svg)

#### Features

- **Quick GUID Selection**: Select any GUID/operation_id on the page to navigate to transaction search
- **Double-click Navigation**: Double-click on a GUID to automatically navigate to transaction search
- **Context Menu**: Right-click on selected GUID to search transaction
- **History Tracking**: Keeps track of recently selected GUIDs for easy access
- **Visual Feedback**: Shows a tooltip when a GUID is selected

#### Installation

##### Option 1: Download from Releases (Recommended)
1. Go to the [Releases](https://github.com/YOUR_USERNAME/toolgen/releases) page
2. Download the latest `azure-appinsights-guid-navigator-chrome.zip`
3. Open Chrome and navigate to `chrome://extensions/`
4. Enable "Developer mode"
5. Drag and drop the ZIP file onto the extensions page

##### Option 2: Build from Source
1. Clone this repository
2. Run the build workflow: `gh workflow run build-extension.yml`
3. Download artifacts from the [Actions](https://github.com/YOUR_USERNAME/toolgen/actions) page
4. Follow the installation steps above

##### Option 3: Manual Installation
1. Clone this repository
2. Open Chrome and navigate to `chrome://extensions/`
3. Enable "Developer mode"
4. Click "Load unpacked"
5. Select the `extensions/azure-appinsights-guid-navigator` folder

#### Development

To contribute or modify the extension:

1. Fork this repository
2. Make your changes in the `extensions/azure-appinsights-guid-navigator` folder
3. Test locally by loading the unpacked extension
4. Submit a pull request

The GitHub Actions workflow will automatically build and package the extension on every push to main.

#### Creating a Release

To create a new release:

1. Update the version in `extensions/azure-appinsights-guid-navigator/manifest.json`
2. Update `CHANGELOG.md` with release notes
3. Create and push a tag: `git tag v1.0.0 && git push origin v1.0.0`
4. The release workflow will automatically create a GitHub release with packaged extensions

Alternatively, manually trigger the release workflow from the Actions tab.

## License

MIT License - see LICENSE file for details
