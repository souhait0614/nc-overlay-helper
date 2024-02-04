import { SUPPORT_VOD } from "~constants"

import { settingsStorage } from "./settingsStorage"

import type { Settings } from "~types/settings"

const latestVersion = 1

const migrateFunctions = [
  async () => {
    const oldSettings = await settingsStorage.get<V0>()
    if (!oldSettings) throw new Error("oldSettings undefined")
    const enabled = {
      myPage: oldSettings.enabledCommentCounter,
      channel: oldSettings.enabledCommentCounter,
    }
    const newSettings: V1 = {
      version: 1,
      ncoverlayhelper: {
        showChangelog: true,
      },
      [SUPPORT_VOD.danime]: {
        commentCounter: {
          enabled,
          showKawaiiCount: oldSettings.showKawaiiCount,
          useNgList: oldSettings.useNgList,
          strictMatch: oldSettings.strictMatch,
          szbhMethod: oldSettings.szbhMethod,
        },
      },
    }
    await settingsStorage.set(newSettings)
  },
] as const satisfies Array<() => Promise<void>>

export const migrateSettings = async () => {
  const settings = await settingsStorage.get<V0 | V1>()
  if (!settings) return
  const version = "version" in settings ? settings.version : 0
  for (let i = version; i < latestVersion; i++) {
    await migrateFunctions[i]()
  }
}

interface V0 {
  enabledCommentCounter: boolean
  showKawaiiCount: boolean
  useNgList: boolean
  strictMatch: boolean
  szbhMethod: boolean
}
interface V1 extends Settings {}
