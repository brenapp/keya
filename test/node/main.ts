import * as keya from "../../src/node/main";

(async function () {
  try {
    const store = await keya.store<string>(
      `date${Math.random().toString().split(".")[1]}`
    );

    console.log(store.name);

    // All
    console.log("all");
    let all = await store.all();
    console.log(all);

    // Set data
    console.log("set");
    await store.set("time", "hello");

    // All
    console.log("all");
    all = await store.all();
    console.log(all);

    // Get
    console.log("get");
    const value = await store.get("time");
    console.log(value);

    // Delete
    console.log("delete");
    store.delete("time").then(console.log);
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
})();
