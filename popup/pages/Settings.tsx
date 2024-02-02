import { CloseIcon } from "@chakra-ui/icons"
import {
  Button,
  Divider,
  FormControl,
  FormLabel,
  Select,
  VStack,
  useColorMode,
} from "@chakra-ui/react"
import { memo, useCallback } from "react"
import { useSWRConfig } from "swr"

import { SETTINGS_KEY } from "~constants"
import { settingsStorage } from "~utils/settingsStorage"

const Settings = memo(() => {
  const { colorMode, setColorMode } = useColorMode()
  const { mutate } = useSWRConfig()
  const handleResetSettings = useCallback(() => {
    if (confirm("設定をリセットしますか？")) {
      settingsStorage.clear()
      mutate(SETTINGS_KEY, null)
      setColorMode("dark")
    }
  }, [mutate, setColorMode])
  return (
    <VStack align="normal">
      <FormControl>
        <FormLabel>テーマ</FormLabel>
        <Select
          value={colorMode}
          onChange={({ target }) => setColorMode(target.value)}
        >
          <option value="light">ライト</option>
          <option value="dark">ダーク</option>
        </Select>
      </FormControl>
      <Divider />
      <Button
        colorScheme="red"
        leftIcon={<CloseIcon />}
        onClick={handleResetSettings}
      >
        設定をリセットする
      </Button>
    </VStack>
  )
})

export default Settings
