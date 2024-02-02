import { Storage } from "@plasmohq/storage"

import { SETTINGS_KEY } from "~constants"

import type { StorageWatchCallback } from "@plasmohq/storage"
import type { Settings } from "~types/settings"

const storage = new Storage()
const get = () => storage.get<Settings>(SETTINGS_KEY)
const set = (settings: Settings) => storage.set(SETTINGS_KEY, settings)
const clear = () => storage.set(SETTINGS_KEY, null)
const watch = (callback: StorageWatchCallback) =>
  storage.watch({
    [SETTINGS_KEY]: callback,
  })
const unwatch = (callback: StorageWatchCallback) =>
  storage.unwatch({
    [SETTINGS_KEY]: callback,
  })

export const settingsStorage = {
  get,
  set,
  watch,
  unwatch,
  clear,
  storage,
} as const
