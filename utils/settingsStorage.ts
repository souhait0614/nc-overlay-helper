import { Storage } from "@plasmohq/storage"

import { DEFAULT_SETTINGS, SETTINGS_KEY } from "~constants"

import type { StorageWatchCallback } from "@plasmohq/storage"
import type { Settings } from "~types/settings"

const storage = new Storage()
const get = <T = Settings>() => storage.get<T>(SETTINGS_KEY)
const set = <T = Settings>(settings: T) => storage.set(SETTINGS_KEY, settings)
const clear = () => storage.set(SETTINGS_KEY, DEFAULT_SETTINGS)
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
