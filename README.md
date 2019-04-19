# Keya

WANTED: Help with tests! Please get in touch!

A simple, universal document store. Keya supports the following storage mediums:

- Filesystem (Nodejs)
- IndexedDB (Browser)
- LocalStorage (Browser, backup)

## API

Import

```javascript
import * as keya from "keya";
// Or, if not using modules:
const keya = require("keya");
```

Access a store

> If the store does not exist when you call this, it will be created automatically for you

```javascript
const store = await keya.store("records");
```

Set a value

```javascript
await store.set("document", { value: 345 });
```

Get a value

```javascript
const record = await store.get("document");
```

Find values

```javascript
const records = store.find(
  (value, name) => name.includes("e") && value.v == 12
);
```

Clear the store

```javascript
store.clear();
```
