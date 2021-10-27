import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	console.log('Congratulations, your extension "oneliner" is now active!');

	let disposable = vscode.commands.registerCommand('oneliner.helloWorld', () => {
		// vscode.window.showInformationMessage('Hello World from oneliner!');
		vscode.window.showInputBox({ placeHolder: 'let\'s find what you 🔍 for' }).then(value => {
			if (!value) { return; }
			vscode.window.showQuickPick(['⬅️ back', '2', '3']).then(value1 => {
				if (!value1) { return; }
				vscode.window.showInformationMessage(value1);
			});
		});
	});

	context.subscriptions.push(disposable);
}
export function deactivate() { }
