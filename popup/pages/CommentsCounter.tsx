import { Checkbox, CheckboxGroup, VStack } from "@chakra-ui/react"
import { memo, useCallback, useMemo } from "react"

import { useSettingSuspense } from "~hooks/useSettingSuspense"
import FeatureSwitch from "~popup/components/FeatureSwitch"
import NormalSwitch from "~popup/components/NormalSwitch"

const CommentsCounter = memo(() => {
  const { setting, setSetting, toggleSetting } = useSettingSuspense(
    "danime",
    "commentCounter"
  )

  const allChecked = useMemo(
    () => Object.values(setting.enabled).every(Boolean),
    [setting.enabled]
  )
  const isIndeterminate = useMemo(
    () => Object.values(setting.enabled).some(Boolean) && !allChecked,
    [allChecked, setting.enabled]
  )

  const setEnabledAll = useCallback(
    (enabled: boolean) => {
      setSetting(() => ({
        enabled: {
          myPage: enabled,
          channel: enabled,
        },
      }))
    },
    [setSetting]
  )

  const setEnabled = useCallback(
    (key: "myPage" | "channel", enabled: boolean) => {
      setSetting((setting) => ({
        enabled: {
          ...setting.enabled,
          [key]: enabled,
        },
      }))
    },
    [setSetting]
  )

  return (
    <VStack alignItems="normal" spacing={3}>
      <FeatureSwitch
        checked={allChecked}
        expand
        isIndeterminate={isIndeterminate}
        onChange={() => setEnabledAll(!allChecked)}
        label="コメントカウンターを表示"
      >
        <CheckboxGroup size="md">
          <VStack alignItems="start">
            <Checkbox
              isChecked={setting.enabled.myPage}
              onChange={() => setEnabled("myPage", !setting.enabled.myPage)}
            >
              マイページ
            </Checkbox>
            <Checkbox
              isChecked={setting.enabled.channel}
              onChange={() => setEnabled("channel", !setting.enabled.channel)}
            >
              チャンネル
            </Checkbox>
          </VStack>
        </CheckboxGroup>
      </FeatureSwitch>
      <VStack alignItems="normal" marginLeft={2}>
        <NormalSwitch
          label="かわいいカウントを表示"
          isChecked={setting.showKawaiiCount}
          onChange={toggleSetting.showKawaiiCount}
        />
        <NormalSwitch
          label="タイトルの一致判定を厳密にする"
          isChecked={setting.strictMatch}
          onChange={toggleSetting.strictMatch}
        />
        <NormalSwitch
          label="コメント専用動画のコメント数を含める"
          isChecked={setting.szbhMethod}
          onChange={toggleSetting.szbhMethod}
        />
        <NormalSwitch
          label="ニコニコのNG設定を使用 (要ログイン)"
          isChecked={setting.useNgList}
          onChange={toggleSetting.useNgList}
        />
      </VStack>
    </VStack>
  )
})

export default CommentsCounter
