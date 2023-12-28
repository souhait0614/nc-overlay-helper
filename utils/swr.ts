import { Storage, type StorageOptions } from "@plasmohq/storage"

const createCache = async (params: Omit<StorageOptions, "area">) => {
  const storage = new Storage({
    ...params,
    area: "session"
  })
  const map = new Map(Object.entries(await storage.getAll()))

  return map
}

export const cacheMap = createCache({
  area: "session"
})
