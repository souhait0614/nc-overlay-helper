import type { Settings } from "~types/settings"
import type { SupportVodList } from "~types/supportVodList"

/** dアニメストア 動画情報 API */
export const DANIME_PART_API =
  "https://animestore.docomo.ne.jp/animestore/rest/WS030101"

/** GitHub */
export const GITHUB_URL = "https://github.com/souhait0614/nc-overlay-helper"

/** 設定 */
export const SETTINGS_KEY = "settings"
export const DEFAULT_SETTINGS = {
  danime: {
    commentCounter: {
      enabled: {
        myPage: true,
        channel: true,
      },
      showKawaiiCount: true,
      useNgList: false,
      strictMatch: false,
      szbhMethod: false,
    },
  },
} as const satisfies Settings

/** サポートしているVOD */
export const SUPPORT_VOD = {
  danime: "danime",
} as const satisfies {
  [K in string]: K
}

export const SUPPORT_VOD_LIST = {
  danime: {
    id: "danime",
    name: "dアニメストア",
  },
} as const satisfies SupportVodList
