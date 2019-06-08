import { expect } from "chai";
import * as keya from "../../src/node/main";

describe(".stores()", () => {
  it("Can be used to get all the stores", async () => {
    // Create a store
    const store = await keya.store(
      `StoresTest${
        Math.random()
          .toString()
          .split(".")[1]
      }`
    );
    const stores = await keya.stores();

    expect(stores.includes(store.name), "create store not in list");
  });
});

describe(".store()", () => {});
