export interface Settings {
  hideKawaiiCount: boolean
  useNgList: boolean
  strictMatch: boolean
}

export const defaultSettings = {
  hideKawaiiCount: false,
  useNgList: false,
  strictMatch: false
} as const satisfies Settings
