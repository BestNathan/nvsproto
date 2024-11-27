import { ServerOptions, TransportKind } from "vscode-languageclient/node";
import { type LSPServerProvider } from "./lsp";
import { ExtensionContext, extensions, workspace } from "vscode";

export class BufLSPProvider implements LSPServerProvider {
  constructor(private vctx: ExtensionContext) {}

  name(): string {
    return "bufbuild";
  }

  option(): ServerOptions {
    const cmd = this.vctx.asAbsolutePath("bin/buf");

    return {
      run: {
        command: cmd,
        args: ["beta", "lsp", "--log-format", "text"],
        transport: TransportKind.socket,
      },
      debug: {
        command: cmd,
        args: ["beta", "lsp", "--debug", "--log-format", "text"],
        transport: TransportKind.pipe,
      },
    };
  }
}
