// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

import {runCommand} from './command';
import {
    Config,
    loadConfig,
    extractCommandNames,
    findCommandByName,
    replaceCommandVariables,
    Variables
} from './configLoader';
import {getAbsFilepath, getRelativeFilepath, getFilename} from "./filesys"

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
    const loadedConfig = loadConfig();
    if (!loadedConfig) {
        return;
    }

    let config = loadedConfig;

    vscode.workspace.onDidChangeConfiguration(() => {
        const loadedConfig = loadConfig();
        if (!config) {
            vscode.window.showErrorMessage('Failed to reload configuration');
            return
        }

        vscode.window.showInformationMessage('Configuration reloaded');
        config = loadedConfig as Config;
    });

    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showErrorMessage('No workspace folder is open');
        return;
    }
    const workspacePath = workspaceFolders[0].uri.fsPath;

    const runCommandDisposable = vscode.commands.registerCommand('cer.runCommand', async () => {
        const options = extractCommandNames(config);
        const choice = await vscode.window.showQuickPick(options, {
            placeHolder: 'Select Command'
        });

        const variables: Variables = Object.assign(config.variables, {
            'FILEPATH': getAbsFilepath(),
            'RELATIVE_FILEPATH': getRelativeFilepath(),
            'FILENAME': getFilename(),
            'DATE': new Date().toISOString(),
        })

        const command = findCommandByName(config, choice || '');

        if (command) {
            const replacedCommand = replaceCommandVariables(command, variables);
            runCommand(replacedCommand, workspacePath);
        } else {
            vscode.window.showInformationMessage('No command entered');
        }
    });

    context.subscriptions.push(runCommandDisposable);
}

// This method is called when your extension is deactivated
export function deactivate() {
}
