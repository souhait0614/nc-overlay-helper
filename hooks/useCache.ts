import { useState } from "react"
import { Storage } from "@plasmohq/storage"

const storage = new Storage({
  area: "session"
})

export const useCache = () => {
  const [cache, setCache] = useState<Map<string, string> | null>(null)
  storage.getAll().then(async () => {
    setCache(new Map(Object.entries(await storage.getAll())))
  })

  return cache
}
