import { ServerOptions, TransportKind } from "vscode-languageclient/node";
import { type LSPServerProvider } from "./lsp";

export class BufLSPProvider implements LSPServerProvider {
  name(): string {
    return "bufbuild";
  }

  option(): ServerOptions {
    return {
      run: {
        command: "buf",
        args: ["beta", "lsp", "--log-format", "text"],
        transport: TransportKind.pipe,
      },
      debug: {
        command: "buf",
        args: ["beta", "lsp", "--debug", "--log-format", "text"],
        transport: TransportKind.pipe,
      },
    };
  }
}
