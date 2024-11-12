import { window } from "vscode";
import { LanguageClient, ServerOptions } from "vscode-languageclient/node";
import { LanguageId } from "./constants";

export interface LSPServerProvider {
  name(): string;
  option(): ServerOptions;
}

export class LSP {
  private _client: LanguageClient | null = null;
  private _clientstartPromise: Promise<void> | null = null;
  private _clientstopPromise: Promise<void> | null = null;

  constructor(private svrprovider: LSPServerProvider) {}

  async start() {
    if (this._clientstartPromise) {
      return this._clientstartPromise;
    }

    this._clientstartPromise = new Promise((done) => {
      this._client = new LanguageClient(
        "nvsprotobuflspclient",
        "Protobuf Language Client",
        this.svrprovider.option(),
        {
          documentSelector: [LanguageId],
          outputChannel: window.createOutputChannel("nvs protobuf", {
            log: true,
          }),
        }
      );

      return this._client
        .start()
        .catch((e) => {
          window.showErrorMessage("language server client start fail");
        })
        .then(done);
    });

    return this._clientstartPromise;
  }

  async stop() {
    if (this._clientstopPromise) {
      return this._clientstopPromise;
    }

    this._clientstopPromise = new Promise((done, fail) => {
      if (!this._client) {
        return done();
      }

      return this._client.stop().then(done, fail);
    });

    return this._clientstopPromise;
  }
}
