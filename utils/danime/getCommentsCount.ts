import { KAWAII_REGEXP } from "@NCOverlay/constants"
import { DAnimeApi } from "@NCOverlay/content_script/api/danime"
import type { InitData } from "@NCOverlay/content_script/NCOverlay"
import type { getSearchData } from "@NCOverlay/content_script/utils/getSearchData"
import { loadCommentsNormal } from "@NCOverlay/content_script/utils/loadComments"

import { NiconicoApi } from "api/niconico"
import { Logger } from "utils/logger"

export const getCommentsCount = async (partId: string) => {
  const partData = await DAnimeApi.part(partId)
  Logger.debug("DAnimeApi.part", partData)

  if (!partData) return null
  Logger.debug("title", partData.title)

  const info: Parameters<typeof getSearchData>[0] = {
    title: partData.title,
    duration: partData.partMeasureSecond
  }
  const initData: InitData[] = []

  // TODO: 拡張機能の設定として実装する
  const useNgList = false

  // 通常
  const normalInitData = await loadCommentsNormal(info, NiconicoApi, useNgList)
  initData.push(...normalInitData)
  Logger.debug("initData", info.title, initData)

  const threads = initData
    .flatMap((v) => v.threads)
    .filter(
      (val, idx, ary) =>
        idx === ary.findIndex((v) => v.id === val.id && v.fork === val.fork)
    )

  if (threads.length <= 0) return null

  let commentsCount = 0
  let kawaiiCount = 0

  for (const { comments } of threads) {
    commentsCount += comments.length
    kawaiiCount += comments.filter((v) => KAWAII_REGEXP.test(v.body)).length
  }

  Logger.debug("commentsCount", info.title, commentsCount, kawaiiCount)

  return [commentsCount, kawaiiCount] as const
}
