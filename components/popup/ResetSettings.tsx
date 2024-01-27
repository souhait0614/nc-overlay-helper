import { memo, useCallback } from "react"

import { useSettings } from "~hooks/useSettings"

import styles from "./ResetSettings.module.scss"

const ResetSettingsIcon = memo(() => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 -960 960 960"
    width="25"
    height="25"
  >
    <path d="M483.077-200q-117.25 0-198.625-81.339-81.375-81.34-81.375-198.539 0-117.199 81.375-198.661Q365.827-760 483.077-760q71.308 0 133.538 33.884 62.231 33.885 100.308 94.577V-740q0-8.5 5.758-14.25T736.95-760q8.512 0 14.243 5.75 5.73 5.75 5.73 14.25v156.923q0 13.731-9.288 23.02-9.289 9.288-23.019 9.288H567.692q-8.5 0-14.25-5.758t-5.75-14.269q0-8.512 5.75-14.242 5.75-5.731 14.25-5.731h128q-31.231-59.846-87.884-94.539Q551.154-720 483.077-720q-100 0-170 70t-70 170q0 100 70 170t170 70q71.468 0 130.849-38.731 59.382-38.73 88.074-102.884 3.385-7.846 10.962-11.039 7.577-3.192 15.505-.5 8.456 2.693 11.226 11 2.769 8.308-.616 16.154-33.308 75.385-102.388 120.693Q567.609-200 483.077-200Z" />
  </svg>
))

export const ResetSettings = memo(() => {
  const { resetSettings } = useSettings()
  const handleResetSettings = useCallback(() => {
    if (confirm("設定をリセットしますか？")) {
      resetSettings()
    }
  }, [resetSettings])
  return (
    <button
      title="リセット"
      className={styles.button}
      onClick={handleResetSettings}
    >
      <ResetSettingsIcon />
    </button>
  )
})
