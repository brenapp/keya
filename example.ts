/**
 * Example File
 */

import * as keya from "./src/node/main";

(async function() {
  let store = await keya.store("vexdb");

  //   await store.set("matches", {
  //     hello: "world"
  //   });

  let all = await store.all();

  console.log(all);
})();
