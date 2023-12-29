export interface Settings {
  hideKawaiiCount: boolean
  useNgList: boolean
  strictMatch: boolean
  szbhMethod: boolean
}

export const defaultSettings = {
  hideKawaiiCount: false,
  useNgList: false,
  strictMatch: false,
  szbhMethod: false
} as const satisfies Settings
