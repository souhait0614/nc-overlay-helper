import css from "data-text:components/danime/CommentsCounter.scss"
import type {
  PlasmoCSConfig,
  PlasmoCSUIProps,
  PlasmoGetInlineAnchorList,
  PlasmoMountShadowHost
} from "plasmo"
import { Suspense } from "react"
import { ErrorBoundary } from "react-error-boundary"
import {
  CommentsCounter,
  ErrorCommentsCounter,
  LoadingCommentsCounter
} from "components/danime/CommentsCounter"

export const config: PlasmoCSConfig = {
  matches: [
    "https://animestore.docomo.ne.jp/animestore/mp_viw_pc*",
    "https://animestore.docomo.ne.jp/animestore/mpa_fav_pc*",
    "https://animestore.docomo.ne.jp/animestore/mpa_hst_pc*"
  ],
  run_at: "document_start"
}

export const getInlineAnchorList: PlasmoGetInlineAnchorList = () =>
  document.querySelectorAll(".itemWrapper .itemModule.list .itemModuleIn")

const dataPartIdAttr = "data-nc-overlay-helper-part-id"

export const mountShadowHost: PlasmoMountShadowHost = async ({
  anchor,
  shadowHost
}) => {
  // console.log(anchor)
  if (!anchor) return
  const link =
    anchor.element.querySelector<HTMLAnchorElement>("a.textContainer")
  const thumbnail = anchor.element.querySelector(".thumbnailContainer a")
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

export const MyPageCommentsCounter = ({ anchor }: PlasmoCSUIProps) => {
  const partId = anchor?.element.getAttribute(dataPartIdAttr)
  if (!partId) return <ErrorCommentsCounter />

  return (
    <ErrorBoundary fallback={<ErrorCommentsCounter />}>
      <Suspense fallback={<LoadingCommentsCounter />}>
        <CommentsCounter partId={partId} />
      </Suspense>
    </ErrorBoundary>
  )
}

export default MyPageCommentsCounter
