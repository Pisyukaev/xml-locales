# @xml-locales/cli

[![NPM](https://img.shields.io/npm/v/xml-locales.svg)](https://www.npmjs.com/package/xml-locales)

This is cli tool to work with localization files in xml.

## Installation

```sh
npm install -g @xml-locales/cli
```

```sh
yarn global add @xml-locales/cli
```

```sh
pnpm add -g @xml-locales/cli
```

> [!IMPORTANT]
> This package, which works with XML files, has one root node named `resources`. This root node has child nodes named `string`. For example:
>
> ```xml
> <resources>
>   <string name="key1">value1</string>
>   <string name="key2">value2</string>
> </resources> 
>```

### Or use without

```sh
npx @xml-locales/cli <command> [...args]
```

## Commands

### Add Command

The `add` command is used to add a new key-value pair to the XML localization file or files from directory.

```sh
xml-locales add --path path/to/file_or_directory --key newKey --value newValue
```

| Flag    | Alias | Default | Description                                                                 |
|---------|-------|---------|-----------------------------------------------------------------------------|
| `--path`| `-p`  | `process.cwd()`    | The path to the XML localization file or directory where the key-value pair will be added. |
| `--key` | `-k`  | None    | The new key to be added.                                                    |
| `--value`| `-v` | None   | The value to be associated with the new key.                                |

### Remove Command

The `remove` command is used to remove a key-value pair from the XML localization file or files from directory.

```sh
xml-locales remove --path path/to/file_or_directory --key keyToRemove --value valueToRemove
```

| Flag    | Alias | Default | Description                                                                 |
|---------|-------|---------|-----------------------------------------------------------------------------|
| `--path`| `-p`  | `process.cwd()`    | The path to the XML localization file or directory where the key-value pair will be removed. |
| `--key` | `-k`  | None    | Removed string by the key.                                                      |
| `--value`| `-v` | None   | Or removed string by the value. |

### Update Command

The `update` command is used to update a key-value pair in the XML localization file or files from directory.

```sh
xml-locales update --path path/to/file_or_directory --oldValue oldValue --newValue newValue
```

| Flag       | Alias | Default | Description                                                                 |
|------------|-------|---------|-----------------------------------------------------------------------------|
| `--path`   | `-p`  | `process.cwd()`    | The path to the XML localization file or directory where the key-value pair will be updated. |
| `--oldValue` | `-o`  | None    | The old key or value to be updated.                                        |
| `--newValue`| `-n` | None   | The new key or value to replace the old one.                               |

### Sort Command

The `sort` command is used to sort the keys in the XML localization file or directory in ascending or descending order.

```sh
xml-locales sort --path path/to/file_or_directory --direction asc_or_desc
```

| Flag       | Alias | Default | Description                                                                 |
|------------|-------|---------|-----------------------------------------------------------------------------|
| `--path`   | `-p`  | `process.cwd()`    | The path to the XML localization file or directory where the keys will be sorted. |
| `--direction` | `-d`  | 'asc'    | The sort direction. Can be 'asc' for ascending order or 'desc' for descending order. |

## Packages

| Package  | version   |
| ------- | -------- |
| 📦[xml-locales](https://github.com/Pisyukaev/xml-locales/tree/master/packages/xml-locales) | [![NPM](https://img.shields.io/npm/v/xml-locales.svg)](https://www.npmjs.com/package/xml-locales)   |
| 💻[@xml-locales/cli](https://github.com/Pisyukaev/xml-locales/tree/master/packages/cli)   | [![NPM](https://img.shields.io/npm/v/@xml-locales/cli.svg)](https://www.npmjs.com/package/@xml-locales/cli)  |
