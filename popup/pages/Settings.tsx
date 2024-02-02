import { CheckIcon, CloseIcon } from "@chakra-ui/icons"
import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Progress,
  Select,
  VStack,
  useBoolean,
  useColorMode,
} from "@chakra-ui/react"
import { memo, useCallback, useState } from "react"
import { useSWRConfig } from "swr"
import { useLongPress } from "use-long-press"

import { DEFAULT_SETTINGS, SETTINGS_KEY } from "~constants"
import { useAnimationFrame } from "~hooks/useAnimationFrame"
import { useNCOverlayHelperSetting } from "~hooks/useSetting"
import NormalSwitch from "~popup/components/NormalSwitch"
import { settingsStorage } from "~utils/settingsStorage"

const threshold = 3000

const ResetSettingsButton = memo(() => {
  const { mutate } = useSWRConfig()
  const { setColorMode } = useColorMode()

  const [pressStartTime, setPressStartTime] = useState<number | null>(null)
  const [progress, setProgress] = useState<number>(0)
  const [finished, setFinished] = useBoolean()

  useAnimationFrame(
    pressStartTime !== null,
    useCallback(() => {
      if (pressStartTime === null) return
      const progress = (Date.now() - pressStartTime) / threshold
      setProgress(progress)
      if (progress >= 1) {
        setPressStartTime(null)
      }
    }, [pressStartTime])
  )

  const resetSettings = useCallback(() => {
    settingsStorage.clear()
    mutate(SETTINGS_KEY, DEFAULT_SETTINGS)
    setColorMode("dark")
    setFinished.on()
  }, [mutate, setColorMode, setFinished])

  const bind = useLongPress(resetSettings, {
    threshold,
    onStart: () => {
      setPressStartTime(Date.now())
      setProgress(0)
    },
    onCancel: () => setPressStartTime(null),
    onFinish: setFinished.off,
  })

  return (
    <Button
      {...bind()}
      overflow="hidden"
      colorScheme={finished ? "green" : "red"}
      leftIcon={finished ? <CheckIcon /> : <CloseIcon />}
    >
      {finished ? "リセットしました" : "長押しで設定をリセットする"}
      {pressStartTime && (
        <Progress
          colorScheme="green"
          bgColor="transparent"
          position="absolute"
          top={0}
          left={0}
          boxSize="100%"
          min={0}
          max={1}
          value={progress}
        />
      )}
    </Button>
  )
})

const Settings = memo(() => {
  const { setting, toggleSetting } = useNCOverlayHelperSetting()
  const { colorMode, setColorMode } = useColorMode()
  return (
    <VStack align="normal" spacing={2}>
      <FormControl marginBottom={1}>
        <FormLabel>テーマ</FormLabel>
        <Select
          value={colorMode}
          onChange={({ target }) => setColorMode(target.value)}
        >
          <option value="light">ライト</option>
          <option value="dark">ダーク</option>
        </Select>
      </FormControl>
      <NormalSwitch
        isChecked={setting.showChangelog}
        onChange={toggleSetting.showChangelog}
        label="アップデート後に更新内容を表示"
      />
      <Divider />
      <ResetSettingsButton />
    </VStack>
  )
})

export default Settings
