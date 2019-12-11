import * as vscode from 'vscode';
import JodyCommands from './jody-commands';
import { getVSCodeDownloadUrl } from 'vscode-test/out/util';

export function activate(context: vscode.ExtensionContext) {
	context.subscriptions.push(vscode.commands.registerCommand('extension.prepMergeRequest', JodyCommands.prepMergeRequest));
	context.subscriptions.push(vscode.commands.registerCommand('extension.notify', JodyCommands.notify));
}

// this method is called when your extension is deactivated
export function deactivate() { }
