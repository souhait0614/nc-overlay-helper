import { DANIME_PART_API } from "~constants"
import { Logger } from "~utils/logger"

export interface PartData {
  workTitle: string
  partDispNumber: string
  partTitle: string
  mainScenePath: string
  partNews: string
  partExp: string
  partStaff: string
  partCast: string
  partMeasure: string
  partCopyright: string
  publicStartDate: string
  publicEndDate: string
  kikanDispFlg: string
  partId: string
  workId: string
  prevPartId: string
  nextPartId: string
  goodsId: string
  viewButtonDispFlg: string
  newFlg: string
  resultCd: string
  workTypeList: string[]
  ageLimitType: string
  movieList: Movie[]
  reviewTime: string
  viewTerm: string
  dayReviewTime: string
  dayViewTerm: string
  goodsPrice: string
  sabSceneUmuFlg: string
  saleConditionCd: string
}

export interface Movie {
  movieTypeCd: string
  movieBitrateCd: string
  movieId: string
}

export const part = async (partId: string): Promise<PartData | null> => {
  try {
    const res = await fetch(
      `${DANIME_PART_API}?${new URLSearchParams({
        viewType: "5",
        partId: partId
      })}`
    )

    if (res.ok) {
      const json: PartData = await res.json()

      if (json) {
        return json
      }
    }
  } catch (e) {
    Logger.error("Error", e)
  }

  return null
}
