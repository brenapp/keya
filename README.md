# Keya

A simple, universal document store. Keya supports the following storage mediums:

- SQLite (Nodejs)
- IndexedDB (Browser)
- LocalStorage (Browser, backup)

## API

In general `keya` stores can be thought of as a `Map` that acts asynchronously.

Import

```javascript
import * as keya from "keya";
// Or, if not using modules:
const keya = require("keya");
```

### Access a store

> If the store does not exist when you call this, it will be created automatically for you

```javascript
const store = await keya.store("records");
```

> Note: Store names need to follow SQLite Table name rules/should generally only be alphanumeric characters without spaces. Beyond that can lead to unexpected issues and undocumented behavior

#### Hydration

`keya` supports an optional Hydration Function to be passed to `.store` when initalizing. This defaults to `JSON.parse`. The hydration function will be passed the stored string and should return the appropriate value. An example is shown below that allows `keya` to store Maps long-term.

```JavaScript

// Add a custom hydration function
const store = await keya.store("calls");

// Custom conversion functions stores a map by it's entry list
store.stringify = map => JSON.stringify([...map.entries()]);
store.hydrate = string => new Map(JSON.parse(string));

// Construct the Map to be stored
const map = new Map([
  [32, "a"],
  [45, "b"]
])

store.set("map", map);

// In another session

const map = store.get("map");
```

### Set a value

```javascript
await store.set("document", { value: 345 });
```

### Get a value

```javascript
const record = await store.get("document");
```

### Find values

```javascript
const records = store.find(
  (value, name) => name.includes("e") && value.v == 12
);
```

### Clear the store

```javascript
store.clear();
```

### Get all values

```javascript
store.all(); // [ {key: "hello", value: 43 }, { key: "world", value: 12 } ]
```
