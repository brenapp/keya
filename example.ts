/**
 * Example File
 */

import * as keya from "./src/node/main";

(async function() {
  let store = await keya.store("vexdb");

  const stores = await keya.stores();

  await store.set("matches", Math.random());

  let all = await store.all();
  console.log(all);

  const record = await store.get("jeheh");
  console.log(record);
})().catch(e => console.log(e.stack));
