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
import { useNCOverlayHelperSetting } from "~hooks/useSetting"
import NormalSwitch from "~popup/components/NormalSwitch"
import { settingsStorage } from "~utils/settingsStorage"

const Settings = memo(() => {
  const { setting, toggleSetting } = useNCOverlayHelperSetting()
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
