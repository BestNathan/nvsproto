.PHONY: package
package:
	@pnpm install
	@pnpm run vscode:package

VERSION := $(shell grep '"version"' package.json | sed -E 's/.*"version": "([^"]+)".*/\1/')
.PHONY: install
install: package
	@code --install-extension nvsproto-$(VERSION).vsix

.PHONY: install-force
install-force: package
	@code --install-extension nvsproto-$(VERSION).vsix --force