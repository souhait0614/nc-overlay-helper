export interface Settings {
  enabledCommentCounter: boolean
  hideKawaiiCount: boolean
  useNgList: boolean
  strictMatch: boolean
  szbhMethod: boolean
}

export const defaultSettings = {
  enabledCommentCounter: true,
  hideKawaiiCount: false,
  useNgList: false,
  strictMatch: false,
  szbhMethod: false
} as const satisfies Settings
