# xml-locales

[![NPM](https://img.shields.io/npm/v/xml-locales.svg)](https://www.npmjs.com/package/xml-locales)

This is core package to work with localization files in xml.

## Installation

```sh
npm install xml-locales
```

```sh
yarn add xml-locales
```

```sh
pnpm add xml-locales
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

## Properties

| Args | Type | Required | Description |
|------|------|----------|-------------|
| `xmlData` | `string` \| `Buffer` \| `XmlJsonData` | `false` | Data of the xml document |
| `xmlOptions` | `object` | `false` | It represents the options for the XML parser.

### xmlOptions

The `xmlOptions` is used to customize the behavior of the XML parser and builder in the `XmlLocales` class.

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `parserOptions` | `X2jOptionsOptional` | `false` | Options to customize how the XML data is parsed. See below for details. For more information, see [here](https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/2.XMLparseOptions.md) |
| `builderOptions`| `XmlBuilderOptionsOptional` | `false` | Options to customize how the XML data is built. See below for details. For more information, see [here](https://github.com/NaturalIntelligence/fast-xml-parser/blob/master/docs/v4/3.XMLBuilder.md) |
| `formateOptions`| `XMLFormatterOptions` | `false` | Options to customize the formatting of the XML data. See below for details. For more information, see [here](https://github.com/chrisbottin/xml-formatter#options) |

### Default Parser Options (X2jOptionsOptional)

| Option                | Value  |
|-----------------------|--------|
| `trimValues`          | `false`  |
| `ignoreDeclaration`   | `true`   |
| `attributeNamePrefix` | `'key_'` |
| `alwaysCreateTextNode`| `true`   |
| `ignoreAttributes`    | `false`  |

### Default Builder Options (XmlBuilderOptionsOptional)

| Option                | Value  |
|-----------------------|--------|
| `ignoreAttributes`    | `false` |
| `attributeNamePrefix` | `'key_'` |
| `processEntities`     | `false` |

### Default Formatter Options (XMLFormatterOptions)

| Option           | Value  |
|------------------|--------|
| `collapseContent`| `true` |
| `indentation`    | `'  '` |

## Usage

```js
import {XmlLocales} from 'xml-locales'

const xmlData = `
<resources>
  <string name="key1">value1</string>
  <string name="key2">value2</string>
</resources>
`

const xmlLocales = new XmlLocales(xmlData)
const jsonData = xmlLocales.add({key: 'newKey', value: 'newValue'}).toXML()

console.log(jsonData)
```

Output:

```xml
<resources>
   <string name="key1">value1</string>
   <string name="key2">value2</string>
   <string name="newKey">newValue</string>
</resources>
```

### Update key/value

```js
import {XmlLocales} from 'xml-locales'

const xmlData = `
<resources>
  <string name="key1">value1</string>
  <string name="key2">value2</string>
</resources>
`

const xmlLocales = new XmlLocales(xmlData)
const jsonData = xmlLocales.add({key: 'newKey', value: 'newValue'})
.update({oldValue: 'key1', newValue: 'firstKey'})
.update({oldValue: 'value2', newValue: 'secondValue'})
.toXML()

console.log(jsonData)
```

Output:

```xml
<resources>
   <string name="firstKey">value1</string>
   <string name="key2">secondValue</string>
</resources>
```

### Delete by key/value

```js
import {XmlLocales} from 'xml-locales'

const xmlData = `
<resources>
  <string name="key1">value1</string>
  <string name="key2">value2</string>
</resources>
`

const xmlLocales = new XmlLocales(xmlData)
const jsonData = xmlLocales.add({key: 'newKey', value: 'newValue'})
.deleteByKey('key1')
.deleteByValue('value2')
.toXML()

console.log(jsonData)
```

Output:

```xml
<resources>
</resources>
```

### XML and JSON

```js
import {XmlLocales} from 'xml-locales'

const xmlData = `
<resources>
  <string name="key1">value1</string>
  <string name="key2">value2</string>
</resources>
`

const xmlLocales = new XmlLocales(xmlData)
const xmlString = xmlLocales.toXML()
const jsonXml = xmlLocales.toJSON()

console.log(xmlString) // output XML
console.log(jsonXml) // output JSON
```

Output XML:

```xml
<resources>
  <string name="newKey2">newValue2</string>
  <string name="newKey">newValue</string>
  <string name="key2">value2</string>
  <string name="firstKey">value1</string>
</resources>
 ```

Output JSON:

```json
{
 resources: {
  string: [
   {
    key_name: 'key1',
    '#text': 'value1'
   },
   {
    key_name: 'key2',
    '#text': 'value2'
   }
  ]
 }
}
```

### Chaining

```js
import {XmlLocales} from 'xml-locales'

const xmlData = `
<resources>
  <string name="key1">value1</string>
  <string name="key2">value2</string>
</resources>
`

const xmlLocales = new XmlLocales(xmlData)

const jsonData = xmlLocales.add({key: 'newKey', value: 'newValue'})
.add({key: 'newKey2', value: 'newValue2'})
.update({oldValue: 'key1', newValue: 'firstKey'})
.sort('desc')
.toXML()

console.log(jsonData)
```

Output:

```xml
<resources>
  <string name="newKey2">newValue2</string>
  <string name="newKey">newValue</string>
  <string name="key2">value2</string>
  <string name="firstKey">value1</string>
</resources>
```

## Packages

| Package  | version   |
| ------- | -------- |
| 📦[xml-locales](https://github.com/Pisyukaev/xml-locales/tree/master/packages/xml-locales) | [![NPM](https://img.shields.io/npm/v/xml-locales.svg)](https://www.npmjs.com/package/xml-locales)   |
| 💻[@xml-locales/cli](https://github.com/Pisyukaev/xml-locales/tree/master/packages/cli)   | [![NPM](https://img.shields.io/npm/v/@xml-locales/cli.svg)](https://www.npmjs.com/package/@xml-locales/cli)  |
