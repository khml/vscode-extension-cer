// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

export function getAbsFilepath() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return null;
    }

    return editor.document.uri.fsPath;
}

export function getRelativeFilepath() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return null;
    }

    const filePath = editor.document.uri.fsPath;
    return vscode.workspace.asRelativePath(filePath);
}

export function getFilename() {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return null;
    }

    return editor.document.fileName;
}
