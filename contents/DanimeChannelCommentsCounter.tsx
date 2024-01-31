import { Logger as NCOverlayLogger } from "@NCOverlay/utils/logger"
import {
  CommentsCounter,
  ErrorCommentsCounter,
  LoadingCommentsCounter,
} from "components/danime/CommentsCounter"
import css from "data-text:components/danime/CommentsCounter.scss"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"

import { useSetting } from "~hooks/useSetting"

import type {
  PlasmoCSConfig,
  PlasmoCSUIProps,
  PlasmoGetInlineAnchorList,
  PlasmoMountShadowHost,
} from "plasmo"

NCOverlayLogger.logLevel = 2

export const config: PlasmoCSConfig = {
  matches: ["https://animestore.docomo.ne.jp/animestore/ci_pc*"],
  run_at: "document_start",
}

export const getInlineAnchorList: PlasmoGetInlineAnchorList = () =>
  document.querySelectorAll(".episodeContainer.itemWrapper .itemModule.list")

const dataPartIdAttr = "data-nc-overlay-helper-part-id"

export const mountShadowHost: PlasmoMountShadowHost = async ({
  anchor,
  shadowHost,
}) => {
  if (!anchor) return
  const link = anchor.element.querySelector<HTMLAnchorElement>("a")
  const thumbnail = anchor.element.querySelector(".thumbnailContainer")
  if (!link || !link.href || !thumbnail) return
  if (!thumbnail) return

  const partId = new URL(link.href).searchParams.get("partId")
  if (!partId) return

  anchor.element.setAttribute(dataPartIdAttr, partId)

  thumbnail.prepend(shadowHost)
}

export const getStyle = () => {
  const style = document.createElement("style")
  style.textContent = css
  return style
}

export const DanimeChannelCommentsCounter = ({ anchor }: PlasmoCSUIProps) => {
  const { setting } = useSetting("danime", "commentCounter")
  const { enabled, showKawaiiCount, strictMatch, szbhMethod, useNgList } =
    setting
  if (!enabled.channel) return

  const partId = anchor?.element.getAttribute(dataPartIdAttr)
  if (!partId) return <ErrorCommentsCounter />

  return (
    <ErrorBoundary fallback={<ErrorCommentsCounter />}>
      <Suspense fallback={<LoadingCommentsCounter />}>
        <CommentsCounter
          partId={partId}
          showKawaiiCount={showKawaiiCount}
          getCommentsCountOption={{
            useNgList,
            strictMatch,
            szbhMethod,
          }}
        />
      </Suspense>
    </ErrorBoundary>
  )
}

export default DanimeChannelCommentsCounter
