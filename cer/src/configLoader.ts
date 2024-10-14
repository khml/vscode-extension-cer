import * as vscode from 'vscode';
import * as path from 'path';
import * as fs from 'fs';

export interface Command {
    command: string;
    description: string;
}

export interface Commands {
    [key: string]: Command;
}

export interface Variables {
    [key: string]: string;
}

export interface Config {
    commands: Commands;
    variables: Variables;
}

export function loadConfig(): Config | null {
    const workspaceFolders = vscode.workspace.workspaceFolders;
    if (!workspaceFolders) {
        vscode.window.showErrorMessage('No workspace folder is open');
        return null;
    }

    const configPath = path.join(workspaceFolders[0].uri.fsPath, '.cer.config.json');
    if (!fs.existsSync(configPath)) {
        vscode.window.showErrorMessage(`Config file not found: ${configPath}`);
        return null;
    }

    const configContent = fs.readFileSync(configPath, 'utf-8');
    return JSON.parse(configContent) as Config;
}

export function extractCommandNames(config: Config): string[] {
    return Object.keys(config.commands).sort();
}


export function findCommandByName(config: Config, name: string): Command | null {
    return config.commands[name] || null;
}

function replaceVariables(input: string, variables: Variables): string {
    return input.replace(/\$\{([^}]+)\}/g, (match, p1) => {
        return variables[p1] !== undefined ? variables[p1] : match;
    });
}

export function replaceCommandVariables(command: Command, variables: Variables): Command {
    return {
        command: replaceVariables(command.command, variables),
        description: command.description
    };
}