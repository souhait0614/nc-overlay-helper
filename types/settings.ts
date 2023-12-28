export interface Settings {
  hideKawaiiCount: boolean
  useNgList: boolean
}

export const defaultSettings = {
  hideKawaiiCount: false,
  useNgList: false
} as const satisfies Settings
