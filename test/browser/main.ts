import * as keya from "../../src/browser/main";

(async function() {
  const store = await keya.store("vexdb");

  await store.set("latest", { key: 1234 });

  console.log(await store.get("latest"));

  console.log(store);
})();
