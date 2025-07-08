# Changelog

All notable changes to the Azure AppInsights GUID Navigator Chrome Extension will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Initial release of Azure AppInsights GUID Navigator
- GUID/operation_id selection and navigation functionality
- Double-click to navigate feature
- Right-click context menu for transaction search
- History tracking for recent GUIDs (up to 50 items)
- Visual feedback with tooltips
- Extension popup with recent selections
- Support for Azure Portal, Application Insights, and Azure Monitor
- GitHub Actions workflows for automated building and releases

## [1.0.0] - 2025-01-08

### Added
- Core functionality for selecting and navigating with GUIDs
- Chrome extension manifest v3 support
- Content script for GUID detection and selection
- Background service worker for context menu handling
- Popup interface for managing selections
- Automatic GUID validation
- Transaction search URL construction for multiple Azure services
- Icon generation script
- Comprehensive documentation

### Technical Details
- Built with vanilla JavaScript for performance
- No external dependencies required
- Minimal permissions requested
- Supports all modern Azure Application Insights interfaces

## Release Process

To create a new release:

1. Update the version number in `manifest.json`
2. Move the "Unreleased" changes to a new version section with date
3. Commit with message: `chore: prepare release v1.0.0`
4. Create and push tag: `git tag v1.0.0 && git push origin v1.0.0`
5. GitHub Actions will automatically create the release with artifacts

## Version History

- **1.0.0** - Initial release with core GUID navigation features