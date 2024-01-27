import { useSettings } from "hooks/useSettings"
import { memo, useId } from "react"

import "@NCOverlay/styles/normalize.css"
import styles from "./Settings.module.scss"

import type { ChangeEvent, ReactNode } from "react"

interface ListToggleProps {
  label: string
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  children?: ReactNode
}
const ListToggle = memo(
  ({ label, checked, onChange, children }: ListToggleProps) => {
    const id = useId()
    return (
      <li className={styles.listItem}>
        <div className={styles.listToggle}>
          <h3>{label}</h3>
          <input
            id={id}
            type="checkbox"
            checked={checked}
            onChange={onChange}
          />
          <label htmlFor={id} tabIndex={0} />
        </div>
        {children}
      </li>
    )
  }
)

interface ListCheckboxProps {
  label: string
  checked: boolean
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
  children?: ReactNode
}
const ListCheckbox = memo(
  ({ label, checked, onChange, children }: ListCheckboxProps) => {
    return (
      <li className={styles.listItem}>
        <label className={styles.listCheckbox}>
          <input type="checkbox" checked={checked} onChange={onChange} />
          <span>{label}</span>
        </label>
        {children}
      </li>
    )
  }
)

export const Settings = () => {
  const { settings, setSetting, loading } = useSettings()
  if (loading) return <div>よみこみちゅう</div>
  const {
    enabledCommentCounter,
    showKawaiiCount,
    strictMatch,
    szbhMethod,
    useNgList,
  } = settings

  return (
    <div>
      <ul className={styles.listContainer}>
        <ListToggle
          label="コメントカウンター"
          checked={enabledCommentCounter}
          onChange={(e) =>
            setSetting("enabledCommentCounter", e.target.checked)
          }
        >
          {enabledCommentCounter && (
            <ul className={styles.listContainerChild}>
              <ListCheckbox
                label="かわいいカウントを表示"
                checked={showKawaiiCount}
                onChange={(e) =>
                  setSetting("showKawaiiCount", e.target.checked)
                }
              />
              <ListCheckbox
                label="タイトルの一致判定を厳密にする"
                checked={strictMatch}
                onChange={(e) => setSetting("strictMatch", e.target.checked)}
              />
              <ListCheckbox
                label="コメント専用動画のコメント数を含める"
                checked={szbhMethod}
                onChange={(e) => setSetting("szbhMethod", e.target.checked)}
              />
              <ListCheckbox
                label="ニコニコのNG設定を使用 (要ログイン)"
                checked={useNgList}
                onChange={(e) => setSetting("useNgList", e.target.checked)}
              />
            </ul>
          )}
        </ListToggle>
      </ul>
    </div>
  )
}
