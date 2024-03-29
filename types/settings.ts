import type { SUPPORT_VOD } from "~constants"

export type Settings = {
  version: 1
  [SUPPORT_VOD.danime]: {
    commentCounter: {
      enabled: {
        myPage: boolean
        channel: boolean
      }
      showKawaiiCount: boolean
      useNgList: boolean
      strictMatch: boolean
      szbhMethod: boolean
    }
  }
  ncoverlayhelper: {
    showChangelog: boolean
  }
}
