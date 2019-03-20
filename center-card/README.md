# Center Card

This Card allows you to create a card with only text like a label. It is possible to change the size.


## Options

| Name | Type | Requirement | Description
| ---- | ---- | ------- | -----------
| type | string | **Required** | `custom:center-card`
| title | string | **Required** | The text you want to show, ex. " Room "
| scale | string | **Optional** | The size of the text. Default: 50px

## Instalacion

### Step 1

Install `center-card` by copying `center-card.js`from this repo to `<config directory>/www/center-card.js` on your Home Assistant instanse.

**Example:**

```bash
wget https://raw.githubusercontent.com/assur93/Lovelace/master/icenter-card/center-card.js
```

### Step 2

Link `center-card` inside you `ui-lovelace.yaml`.

```yaml
resources:
  - url: /local/center-card.js
    type: module
```

### Step 3

Add a custom element in your `ui-lovelace.yaml`

```yaml
      - type: custom:center-card
        title: Room
        scale: 20px
```

![example](example.png)
