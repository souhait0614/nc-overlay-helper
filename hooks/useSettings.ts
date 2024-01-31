import { useCallback, useMemo } from "react"
import { merge } from "ts-deepmerge"

import { DEFAULT_SETTINGS, SETTINGS_KEY } from "~constants"

import { useStorage } from "./useStorage"

import type { Settings } from "types/settings"
import type { SupportVod } from "~types/supportVodList"

export type UseSettingsReturnValues =
  | {
      settings: Settings[SupportVod]
      setSetting: (
        vod: SupportVod,
        key: keyof Settings[typeof vod],
        value: Settings[typeof vod][typeof key]
      ) => void
      resetSettings: () => void
      loading: false
    }
  | {
      settings: undefined
      setSetting: (
        vod: SupportVod,
        key: keyof Settings[typeof vod],
        value: Settings[typeof vod][typeof key]
      ) => void
      resetSettings: () => void
      loading: true
    }
export const useSettings = (vod: SupportVod): UseSettingsReturnValues => {
  const { data, setData, loading } = useStorage<Settings>(SETTINGS_KEY)

  const settings = useMemo(
    () => (!loading ? merge(DEFAULT_SETTINGS, data ?? {}) : undefined),
    [loading, data]
  )
  const setSetting = useCallback(
    (
      vod: SupportVod,
      key: keyof Settings[typeof vod],
      value: Settings[typeof vod][typeof key]
    ) => {
      if (!settings) {
        setData(
          merge(DEFAULT_SETTINGS, {
            [vod]: {
              [key]: value,
            },
          })
        )
        return
      }
      if (!settings[vod]) {
        setData({
          ...settings,
          [vod]: {
            ...DEFAULT_SETTINGS[vod],
            [key]: value,
          },
        })
        return
      }
      setData({
        ...settings,
        [vod]: {
          ...settings[vod],
          [key]: value,
        },
      })
    },
    [setData, settings]
  )
  const resetSettings = useCallback(() => {
    setData(undefined)
  }, [setData])
  return !loading
    ? {
        settings: settings?.[vod] ?? DEFAULT_SETTINGS[vod],
        setSetting,
        resetSettings,
        loading,
      }
    : {
        settings: undefined,
        setSetting,
        resetSettings,
        loading,
      }
}
