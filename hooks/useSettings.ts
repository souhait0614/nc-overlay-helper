import { useStorage } from "@plasmohq/storage/hook"
import { useCallback } from "react"
import { defaultSettings, type Settings } from "types/settings"

export const useSettings = () => {
  const [settings, setSettings] = useStorage<Settings>(
    "settings",
    () => defaultSettings
  )
  const setSetting = useCallback(
    (key: keyof Settings, value: Settings[typeof key]) => {
      setSettings({
        ...settings,
        [key]: value
      })
    },
    [setSettings, settings]
  )
  const resetSettings = useCallback(() => {
    setSettings(defaultSettings)
  }, [setSettings])
  return [settings, setSetting, resetSettings] as const
}
