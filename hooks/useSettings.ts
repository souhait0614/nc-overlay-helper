import deepmerge from "deepmerge"
import { useCallback, useMemo } from "react"
import { defaultSettings } from "types/settings"

import { useStorage } from "./useStorage"

import type { Settings } from "types/settings"

export type UseSettingsReturnValues =
  | {
      settings: Settings
      setSetting: (key: keyof Settings, value: boolean) => void
      resetSettings: () => void
      loading: false
    }
  | {
      settings: undefined
      setSetting: (key: keyof Settings, value: boolean) => void
      resetSettings: () => void
      loading: true
    }
export const useSettings = (): UseSettingsReturnValues => {
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
  return !loading
    ? {
        settings: settings ?? defaultSettings,
        setSetting,
        resetSettings,
        loading
      }
    : {
        settings: undefined,
        setSetting,
        resetSettings,
        loading
      }
}
