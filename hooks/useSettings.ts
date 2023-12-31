import deepmerge from "deepmerge"
import { useCallback, useMemo } from "react"
import { defaultSettings } from "types/settings"

import { useStorage } from "./useStorage"

import type { Settings } from "types/settings"

export const useSettings = () => {
  const { data, setData, loading } = useStorage<Settings>("settings")

  const settings = useMemo(
    () => (!loading ? deepmerge(defaultSettings, data ?? {}) : undefined),
    [loading, data]
  )
  const setSetting = useCallback(
    (key: keyof Settings, value: Settings[typeof key]) => {
      if (settings)
        setData({
          ...settings,
          [key]: value
        })
      else
        setData({
          ...defaultSettings,
          [key]: value
        })
    },
    [setData, settings]
  )
  const resetSettings = useCallback(() => {
    setData(undefined)
  }, [setData])
  return [settings, setSetting, resetSettings] as const
}
