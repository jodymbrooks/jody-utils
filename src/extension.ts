import * as vscode from 'vscode';
import { getVSCodeDownloadUrl } from 'vscode-test/out/util';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('extension.prepMergeRequest', () => {
		// Get the active text editor
		let editor = vscode.window.activeTextEditor;

		if (editor && vscode.window.activeTextEditor) {
			let selections: vscode.Selection[] = [];
			let document = editor.document;
			let re = /^[A-Z]:\\[^\\]+/;
			let line = 0;
			for (let range = document.getWordRangeAtPosition(new vscode.Position(0, 0), re);
				range;
				range = document.getWordRangeAtPosition(new vscode.Position(line, 0), re)) {
				let selection = new vscode.Selection(range.start, range.end);
				selections.push(selection);
				line++;
			}

			editor.edit(editBuilder => {
				selections.forEach(selection => editBuilder.replace(selection, ''));
			});

			vscode.commands.executeCommand('editor.action.selectAll');
			// let selection = new vscode.Selection(new vscode.Position(0, 0), new vscode.Position(line, 0));
			// editor.selection = selection;

			vscode.commands.executeCommand('editor.action.sortLinesAscending');
			vscode.commands.executeCommand('editor.action.clipboardCopyAction');
		}

		// Display a message box to the user
		vscode.window.showInformationMessage('Merge-request prep is now complete and copied to the clipboard');
	});

	context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() { }
