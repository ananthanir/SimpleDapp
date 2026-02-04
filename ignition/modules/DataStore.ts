import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("DataStoreModule", (m) => {
  const dataStore = m.contract("DataStore");

  m.call(dataStore, "storeData", ["Hello, world!"]);

  return { dataStore };
});
