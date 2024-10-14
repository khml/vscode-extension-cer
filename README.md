# CER

Command Execute Runner VS Code Extension

# Features

- Run command
- Config Command

# Config

.cer.config.json

```json
{
  "commands": {
    "<command name>": {
      "command": "<command>",
      "description": "<command description>"
    }
  },
  "variables": {
    "<variable name>": "<variable value>"
  }
}
```

sample

```json
{
  "commands": {
    "echo": {
      "command": "echo",
      "description": "echo command"
    }
  },
  "variables": {
    "USER": "user"
  }
}
```

## <command>

You can use the provided variables in the definition of the command to be executed.

### Variables

- `${FILEPATH}`: The absolute path of the file being edited.
- `${RELATIVE_FILEPATH}`: The relative path of the file being edited.
- `${FILENAME}`: The name of the file being edited.
- `${DATE}`: The current date.
- `#{<USER_DEFINED_VARIABLE>}`: User defined variable in config file.
