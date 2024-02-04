import { DEFAULT_SETTINGS, GITHUB_URL } from "~constants"
import { migrateSettings } from "~utils/migrateSettings"
import { settingsStorage } from "~utils/settingsStorage"
import { webExt } from "~utils/webExt"

import { version } from "../package.json"

webExt.runtime.onInstalled.addListener(async (details) => {
  await migrateSettings()
  const settings = (await settingsStorage.get()) ?? DEFAULT_SETTINGS
  if (details.reason === "install") {
    webExt.tabs.create({
      url: `${GITHUB_URL}/blob/v${version}/README.md`,
    })
  }
  if (settings.ncoverlayhelper.showChangelog && details.reason === "update") {
    webExt.tabs.create({
      url: `${GITHUB_URL}/releases/tag/v${version}`,
    })
  }
})
