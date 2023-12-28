export interface Settings {
  hideKawaiiCount: boolean
}

export const defaultSettings = {
  hideKawaiiCount: false
} as const satisfies Settings
