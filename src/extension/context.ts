import { ExtensionContext } from "vscode";
import { LSP } from "./lsp";
import { BufLSPProvider } from "./lsp_buf";

export class Context {
  private _lsp: LSP;
  constructor(private ctx: ExtensionContext) {
    this._lsp = new LSP(new BufLSPProvider(ctx));
  }

  async start() {
    await this._lsp.start();
  }

  async stop() {
    await this._lsp.stop();
  }
}
