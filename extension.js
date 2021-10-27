
const vscode = require('vscode');
const request = require("request");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

	console.log('Congratulations, your extension "oneliner" is now active!');

	let disposable = vscode.commands.registerCommand('oneliner.helloWorld', function () {
		Search();
	});

	function Search() {
		vscode.window.showInputBox({ placeHolder: 'Let\'s find what you 🔍 for' }).then(value => {
			
			if (!value) return;
			vscode.window.showInformationMessage(value);
			OneLiner();
		})
	}

	function OneLiner() {
		request.get('https://api.onelinerhub.com/search?query=jq', function(err, response, body) {
			// TODO: дописать
			console.log(body)
			vscode.window.showInformationMessage(err);
		})		
		vscode.window.showQuickPick(['⬅️ back', '2', '3']).then(value => {
			if (!value) return;
			vscode.window.showInformationMessage(value);
		})
	}

	context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
