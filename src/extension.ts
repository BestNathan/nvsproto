// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { Context } from "./extension/context";

let ctx: Context | null = null;
// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export async function activate(context: vscode.ExtensionContext) {
  ctx = new Context(context);
  await ctx.start();
}

// This method is called when your extension is deactivated
export function deactivate() {
  return ctx?.stop();
}
