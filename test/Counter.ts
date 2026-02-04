import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { network } from "hardhat";

describe("DataStore", async function () {
  const { viem } = await network.connect();

  it("should return empty string initially", async function () {
    const dataStore = await viem.deployContract("DataStore");
    const data = await dataStore.read.getData();
    assert.equal(data, "");
  });

  it("should store and retrieve data", async function () {
    const dataStore = await viem.deployContract("DataStore");
    const message = "Hello, world!";

    await dataStore.write.storeData([message]);
    const data = await dataStore.read.getData();

    assert.equal(data, message);
  });
});
