import { CheckIcon, CloseIcon } from "@chakra-ui/icons"
import { useColorMode, useBoolean, Button, Progress } from "@chakra-ui/react"
import { memo, useState, useCallback } from "react"
import { useSWRConfig } from "swr"
import { useLongPress } from "use-long-press"

import { SETTINGS_KEY, DEFAULT_SETTINGS } from "~constants"
import { useAnimationFrame } from "~hooks/useAnimationFrame"
import { settingsStorage } from "~utils/settingsStorage"

interface ResetSettingsButtonProps {
  threshold?: number
}
export const ResetSettingsButton = memo(
  ({ threshold = 3000 }: ResetSettingsButtonProps) => {
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
      }, [pressStartTime, threshold])
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
  }
)
