import {
  Divider,
  FormControl,
  FormLabel,
  Select,
  VStack,
  useColorMode,
} from "@chakra-ui/react"
import { memo } from "react"

import { useNCOverlayHelperSetting } from "~hooks/useSetting"
import NormalSwitch from "~popup/components/NormalSwitch"
import { ResetSettingsButton } from "~popup/components/ResetSettingsButton"

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
