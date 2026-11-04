import { bindings, defineConfig, defineWorker } from "cf/config";

const databaseId = process.env.D1_DATABASE_ID;
const database = databaseId
  ? { name: "vocalis", id: databaseId }
  : { name: "vocalis" };

export default defineConfig({
  worker: defineWorker({
    name: "vocalis",
    entrypoint: "vinext/server/fetch-handler",
    compatibilityDate: "2026-11-03",
    compatibilityFlags: ["nodejs_compat"],
    assets: {
      htmlHandling: "none",
      notFoundHandling: "none",
      runWorkerFirst: ["/*", "!/_next/static/*", "!/*/_next/static/*"],
    },
    env: {
      ASSETS: bindings.assets(),
      IMAGES: bindings.images(),
      DB: bindings.d1(database),
    },
  }),
});
