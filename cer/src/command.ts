import * as vscode from 'vscode';
import {exec} from 'child_process';
import {Command} from './configLoader';

const outputChannel = vscode.window.createOutputChannel('Command Output');

export function runCommand(command: Command, cwd: string) {
    outputChannel.appendLine(`Running command: ${JSON.stringify(command)} in ${cwd}`);


    exec(command.command, {cwd: cwd}, (error, stdout, stderr) => {
        if (error) {
            outputChannel.appendLine(`Error: ${error.message}`);
            vscode.window.showErrorMessage(`Error: ${error.message}`);
            return;
        }
        if (stderr) {
            outputChannel.appendLine(`Stderr: ${stderr}`);
            vscode.window.showErrorMessage(`Stderr: ${stderr}`);
            return;
        }
        outputChannel.appendLine(`Output: ${stdout}`);
        vscode.window.showInformationMessage(`Output: ${stdout}`);
    });
    outputChannel.show();
}
