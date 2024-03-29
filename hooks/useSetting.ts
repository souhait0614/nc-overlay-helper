import { useCallback, useEffect, useMemo } from "react"
import useSWR from "swr"
import { merge } from "ts-deepmerge"

import { DEFAULT_SETTINGS, SETTINGS_KEY } from "~constants"
import { settingsStorage } from "~utils/settingsStorage"

import type { StorageWatchCallback } from "@plasmohq/storage"
import type { ConditionalKeys } from "type-fest"
import type { Settings } from "~types/settings"
import type { SupportVod } from "~types/supportVodList"

export const useSetting = (
  vod: SupportVod,
  featureName: keyof Settings[typeof vod]
) => {
  type Setting = Settings[typeof vod][typeof featureName]

  const { data, mutate } = useSWR(
    SETTINGS_KEY,
    async () => (await settingsStorage.get()) || DEFAULT_SETTINGS,
    {
      suspense: true,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  const setSetting = useCallback(
    (setSettingAction: (setting: Setting) => Partial<Setting>) => {
      const settings = merge(data, {
        [vod]: {
          [featureName]: setSettingAction(data[vod][featureName]),
        },
      }) as Settings
      settingsStorage.set(settings)
      mutate(settings)
    },
    [data, featureName, mutate, vod]
  )

  useEffect(() => {
    const callback: StorageWatchCallback = (settings) =>
      mutate(settings.newValue)
    settingsStorage.watch(callback)
    return () => {
      settingsStorage.unwatch(callback)
    }
  }, [mutate])

  const toggleSetting = useMemo(() => {
    const keys = Object.entries(DEFAULT_SETTINGS[vod][featureName])
      .filter(([, v]) => typeof v === "boolean")
      .map(([k]) => k as ConditionalKeys<Setting, boolean>)
    return keys.reduce(
      (acc, key) => {
        acc[key] = () => setSetting((setting) => ({ [key]: !setting[key] }))
        return acc
      },
      {} as Record<ConditionalKeys<Setting, boolean>, () => void>
    )
  }, [featureName, setSetting, vod])

  const setting = useMemo(
    () => data[vod][featureName],
    [data, featureName, vod]
  )

  return { setting, setSetting, toggleSetting }
}

type NCOverlayHelperSettings = Settings["ncoverlayhelper"]

export const useNCOverlayHelperSetting = () => {
  const { data, mutate } = useSWR(
    SETTINGS_KEY,
    async () => (await settingsStorage.get()) || DEFAULT_SETTINGS,
    {
      suspense: true,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )
  const setSetting = useCallback(
    (
      setSettingAction: (
        setting: NCOverlayHelperSettings
      ) => Partial<NCOverlayHelperSettings>
    ) => {
      const settings = merge(data, {
        ncoverlayhelper: setSettingAction(data.ncoverlayhelper),
      }) as Settings
      settingsStorage.set(settings)
      mutate(settings)
    },
    [data, mutate]
  )

  settingsStorage.watch((settings) => mutate(settings.newValue))

  const toggleSetting = useMemo(() => {
    const keys = Object.entries(DEFAULT_SETTINGS.ncoverlayhelper)
      .filter(([, v]) => typeof v === "boolean")
      .map(([k]) => k as ConditionalKeys<NCOverlayHelperSettings, boolean>)
    return keys.reduce(
      (acc, key) => {
        acc[key] = () => setSetting((setting) => ({ [key]: !setting[key] }))
        return acc
      },
      {} as Record<
        ConditionalKeys<NCOverlayHelperSettings, boolean>,
        () => void
      >
    )
  }, [setSetting])

  const setting = useMemo(() => data.ncoverlayhelper, [data])

  return { setting, setSetting, toggleSetting }
}
