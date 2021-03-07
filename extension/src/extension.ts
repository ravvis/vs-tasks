// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { authenticate } from './authenticate';
import { HelloWorldPanel } from "./HelloWorld";
import { SidebarProvider } from "./SidebarProvider";
import { TokenManager } from './TokenManager';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	TokenManager.globalState = context.globalState;

	const sidebarProvider = new SidebarProvider(context.extensionUri);
  context.subscriptions.push(
    vscode.window.registerWebviewViewProvider(
      "vstasks-sidebar",
      sidebarProvider
    )
  );

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	let disposable = vscode.commands.registerCommand('tasks.helloWorld', () => {
		vscode.window.showInformationMessage('token value is : ' + TokenManager.getToken());
		// HelloWorldPanel.createOrShow(context.extensionUri);
	});

	context.subscriptions.push(disposable);

	context.subscriptions.push(vscode.commands.registerCommand('tasks.HowAreYou', () => {
		vscode.window.showInformationMessage('How was your day?', 'Good', 'Bad', 'Fine');
	}));

	context.subscriptions.push(vscode.commands.registerCommand('tasks.authenticate', () => {
		authenticate(() => {
			
		});
	}));

	context.subscriptions.push(
		vscode.commands.registerCommand('tasks.refresh', async () => {
			// HelloWorldPanel.kill();
			// HelloWorldPanel.createOrShow(context.extensionUri);
			// await vscode.commands.executeCommand("workbench.action.closeSidebar");
			// await vscode.commands.executeCommand("workbench.view.extension.vstasks-sidebar-view");
			// setTimeout(() => {
			// 	vscode.commands.executeCommand(
			// 		"workbench.action.webview.openDeveloperTools"
			// 	);
			// }, 500);
			vscode.window.showInformationMessage('How was your day?', 'Good', 'Bad', 'Fine');
	}));

}

// this method is called when your extension is deactivated
export function deactivate() {}
