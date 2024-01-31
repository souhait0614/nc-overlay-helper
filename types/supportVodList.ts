import type { SUPPORT_VOD } from "~constants"

export type SupportVod = keyof typeof SUPPORT_VOD

export type SupportVodList = {
  [Id in SupportVod]: {
    id: Id
    name: string
  }
}
