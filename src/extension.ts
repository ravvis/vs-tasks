// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { HelloWorldPanel } from "./HelloWorld";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "tasks" is now active!');

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('tasks.helloWorld', () => {
		HelloWorldPanel.createOrShow(context.extensionUri);
	});

	context.subscriptions.push(disposable);

	context.subscriptions.push(vscode.commands.registerCommand('tasks.HowAreYou', () => {
		vscode.window.showInformationMessage('How was your day?', 'Good', 'Bad', 'Fine');
	}));

}

// this method is called when your extension is deactivated
export function deactivate() {}
