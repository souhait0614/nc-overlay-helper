import { KAWAII_REGEXP } from "@NCOverlay/constants"
import { DAnimeApi } from "@NCOverlay/content_script/api/danime"
import {
  loadCommentsNormal,
  loadCommentsSZBH
} from "@NCOverlay/content_script/utils/loadComments"
import { NiconicoApi } from "api/niconico"
import deepmerge from "deepmerge"
import { Logger } from "utils/logger"

import type { InitData } from "@NCOverlay/content_script/NCOverlay"
import type { getSearchData } from "@NCOverlay/content_script/utils/getSearchData"

export interface GetCommentsCountOption {
  useNgList?: boolean
  strictMatch?: boolean
  szbhMethod?: boolean
}
const defaultGetCommentsCountOption = {
  useNgList: false,
  strictMatch: false,
  szbhMethod: false
} as const satisfies Required<GetCommentsCountOption>
export const getCommentsCount = async (
  partId: string,
  options: GetCommentsCountOption = {}
) => {
  const { useNgList, strictMatch, szbhMethod } = deepmerge(
    defaultGetCommentsCountOption,
    options
  )
  const partData = await DAnimeApi.part(partId)
  Logger.debug("DAnimeApi.part", partData)

  if (!partData) return null
  Logger.debug("title", partData.title)

  const info: Parameters<typeof getSearchData>[0] = {
    title: partData.title,
    duration: partData.partMeasureSecond,
    strictMatch
  }
  const initData: InitData[] = []

  // 通常
  const normalInitData = await loadCommentsNormal(info, NiconicoApi, useNgList)
  initData.push(...normalInitData)
  if (szbhMethod) {
    const szbhInitData = await loadCommentsSZBH(info, NiconicoApi, useNgList)
    initData.push(...szbhInitData)
  }
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
