import { KAWAII_REGEXP } from "@NCOverlay/constants"
import {
  loadCommentsNormal,
  loadCommentsSZBH,
} from "@NCOverlay/content_script/utils/loadComments"
import { NiconicoApi } from "api/niconico"
import { Mutex } from "async-mutex"
import { decodeHTML } from "entities"
import { merge } from "ts-deepmerge"
import { Logger } from "utils/logger"

import { DAnimeApi } from "~api/danime"

import type { InitData } from "@NCOverlay/content_script/NCOverlay"
import type { getSearchData } from "@NCOverlay/content_script/utils/getSearchData"

const mutex = new Mutex()

export interface GetCommentsCountOption {
  useNgList?: boolean
  strictMatch?: boolean
  szbhMethod?: boolean
}
const defaultGetCommentsCountOption = {
  useNgList: false,
  strictMatch: false,
  szbhMethod: false,
} as const satisfies Required<GetCommentsCountOption>
export const getCommentsCount = async (
  partId: string,
  options: GetCommentsCountOption = {}
) => {
  const { useNgList, strictMatch, szbhMethod } = merge(
    defaultGetCommentsCountOption,
    options
  ) as Required<GetCommentsCountOption>

  await mutex.waitForUnlock()
  const release = await mutex.acquire()
  const partData = await DAnimeApi.part(partId)
  Logger.debug("DAnimeApi.part", partData)
  release()

  if (!partData) return null

  const title = decodeHTML(
    `${partData.workTitle} ${partData.partDispNumber} ${partData.partTitle}`.trim()
  )
  Logger.debug("title", title)

  let partMeasureSecond = 0
  const { sec, min } =
    partData.partMeasure.match(/^((?<min>\d+)分)*((?<sec>\d+)秒)*$/)?.groups ??
    {}
  if (sec) partMeasureSecond += parseInt(sec, 10)
  if (min) partMeasureSecond += parseInt(min, 10) * 60
  Logger.debug("partMeasureSecond", partMeasureSecond)

  if (!title || !partMeasureSecond) return null

  const info: Parameters<typeof getSearchData>[0] = {
    title,
    duration: partMeasureSecond,
    strictMatch,
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
