var keya = require("../core");

module.exports = (function() {
  var indexedDB =
    window.indexedDB ||
    window.mozIndexedDB ||
    window.webkitIndexedDB ||
    window.msIndexedDB;
  var IDBTransaction = window.IDBTransaction ||
    window.webkitIDBTransaction ||
    window.msIDBTransaction || { READ_WRITE: "readwrite" }; // This line should only be needed if it is needed to support the object's constants for older browsers
  var IDBKeyRange =
    window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
  if (!indexedDB)
    console.warn(
      "IndexedDB is not supported in this browser, localStorage will be instead used"
    );

  function openDB() {
    var open = indexedDB.open("keya", 1);
    return new Promise((resolve, reject) => {
      open.onupgradeneeded = function() {
        open.result.createObjectStore("docs", { keyPath: "name" });
      };
      open.onsuccess = function() {
        try {
          var db = open.result;
          var tx = db.transaction("docs", "readwrite");
          var docs = tx.objectStore("docs");
          resolve(docs);
        } catch (e) {
          reject(e);
        }
      };
      open.onerror = reject;
    });
  }

  function resolve(doc) {
    if (!indexedDB) return Promise.resolve(localStorage["keya-" + doc]);
    return openDB().then(
      store =>
        new Promise((resolve, reject) => {
          var tx = store.get(doc);
          tx.onsuccess = () => resolve(tx.result ? tx.result.value : undefined);
          tx.onerror = reject;
        })
    );
  }

  function store(doc, value) {
    if (!indexedDB) {
      localStorage["keya-" + doc] = JSON.stringify(value);
      return Promise.resolve(true);
    }
    return openDB().then(
      store =>
        new Promise((resolve, reject) => {
          var tx = store.put({ name: doc, value });
          tx.onsuccess = () => resolve(true);
          tx.onerror = reject;
        })
    );
  }

  function all() {
    if (!indexedDB) {
      return Promise.resolve(
        Object.keys(localStorage)
          .filter(key => /keya\-.+/.exec(key))
          .reduce((a, b) => ((a[b.name] = b.value), a), {})
      );
    }
    return openDB()
      .then(
        store =>
          new Promise((resolve, reject) => {
            var tx = store.getAll();
            tx.onsuccess = () => resolve(tx.result);
            tx.onerror = reject;
          })
      )
      .then(
        list => ((out = {}), list.forEach(v => (out[v.name] = v.result)), out)
      );
  }

  function remove(doc) {
    if (!indexedDB) {
      delete localStorage["keya-" + doc];
      return Promise.resolve();
    }
    return openDB().then(
      store =>
        new Promise((resolve, reject) => {
          var cursor = store.openCursor();
          cursor.onsuccess = event => {
            var c = event.target.result,
              r;
            if (c && c.key == doc) {
              r = c.delete();
              r.onsuccess = () => resolve();
              r.onerror = reject;
            } else {
              c.continue();
            }
          };
          cursor.onerror = reject;
        })
    );
  }

  return keya({ resolve, store, all, remove });
})();
