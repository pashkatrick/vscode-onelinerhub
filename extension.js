
const vscode = require('vscode');
const request = require("request-promise");

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let disposable = vscode.commands.registerCommand('oneliner.search', function () {
		Search();
	});

	function Search() {
		vscode.window.showInputBox({ placeHolder: 'Let\'s find what you 🔍 for' }).then(value => {
			if (!value) return;
			OneLiner(value);
		})
	}

	async function OneLiner(query) {
		var results = ['⬅️ back']
		var matching = [{ 'title': '⬅️ back' }]
		var response = await request.get('https://api.onelinerhub.com/search?query=' + query)

		var body = JSON.parse(response)
		for (var i = 0; i < body.length; i++) {
			results.push(body[i].subject)
			matching.push({ 'title': body[i].subject, 'url': body[i].url, 'code': body[i].code })
		}
		vscode.window.showQuickPick(results, { placeHolder: 'Choose your best' }).then(value => {
			if (!value) return;
			if (value == '⬅️ back') {
				Search()
			} else {
				matching.map(key => {
					if (key.title == value) {
						OpenResult(key)
					} else {
						vscode.window.showInformationMessage('Something went wrong...')
					}
				});
			}
		})
	}

	function OpenResult(item) {
		vscode.window.showInformationMessage(item.code, 'Explore').then(section => {
			if (section == 'Explore') {
				vscode.env.openExternal(vscode.Uri.parse(item.url));
			}
		});
	}

	context.subscriptions.push(disposable);
}
exports.activate = activate;
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
