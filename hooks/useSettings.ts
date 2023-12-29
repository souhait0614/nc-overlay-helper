import { useStorage } from "@plasmohq/storage/hook"
import { useCallback } from "react"
import { defaultSettings, type Settings } from "types/settings"

export const useSettings = () => {
  const [settings = defaultSettings, setSettings] =
    useStorage<Settings>("settings")
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
