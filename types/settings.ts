export interface Settings {
  enabledCommentCounter: boolean
  showKawaiiCount: boolean
  useNgList: boolean
  strictMatch: boolean
  szbhMethod: boolean
}

export const defaultSettings = {
  enabledCommentCounter: true,
  showKawaiiCount: true,
  useNgList: false,
  strictMatch: false,
  szbhMethod: false
} as const satisfies Settings
