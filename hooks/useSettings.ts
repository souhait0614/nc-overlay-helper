import { useStorage } from "@plasmohq/storage/hook"
import deepmerge from "deepmerge"
import { useCallback, useMemo } from "react"
import { defaultSettings } from "types/settings"

import type { Settings } from "types/settings"

export const useSettings = () => {
  const [storageSettings, setStorageSettings] = useStorage<
    Settings | undefined
  >("settings", undefined)

  const settings = useMemo(
    () =>
      storageSettings ? deepmerge(defaultSettings, storageSettings) : undefined,
    [storageSettings]
  )
  const setSetting = useCallback(
    (key: keyof Settings, value: Settings[typeof key]) => {
      if (settings)
        setStorageSettings({
          ...settings,
          [key]: value
        })
      else {
        setStorageSettings({
          ...defaultSettings,
          [key]: value
        })
      }
    },
    [setStorageSettings, settings]
  )
  const resetSettings = useCallback(() => {
    setStorageSettings(defaultSettings)
  }, [setStorageSettings])
  return [settings, setSetting, resetSettings] as const
}
