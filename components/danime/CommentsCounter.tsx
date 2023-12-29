import { useCommentsCount } from "hooks/danime/useApi"
import { memo } from "react"
import { formatCommentsCount } from "utils/format"

import type { GetCommentsCountOption } from "utils/danime/getCommentsCount"

const containerClassName = "counter"

interface CommentsCounterProps {
  partId: string
  showKawaiiCount?: boolean
  getCommentsCountOption?: GetCommentsCountOption
}
export const CommentsCounter = memo(
  ({
    partId,
    showKawaiiCount,
    getCommentsCountOption = {}
  }: CommentsCounterProps) => {
    const { data } = useCommentsCount(partId, getCommentsCountOption)
    return (
      <div className={containerClassName}>
        {data ? (
          <dl>
            <dt>コメント</dt>
            <dd>{formatCommentsCount(data[0])}</dd>
            {showKawaiiCount && (
              <>
                <dt>かわいい</dt>
                <dd>{formatCommentsCount(data[1])}</dd>
              </>
            )}
          </dl>
        ) : (
          <p>コメントなし</p>
        )}
      </div>
    )
  }
)

export const LoadingCommentsCounter = memo(() => (
  <div className={containerClassName}>
    <p>読み込み中</p>
  </div>
))

export const ErrorCommentsCounter = memo(() => (
  <div className={containerClassName}>
    <p>読み込み失敗</p>
  </div>
))
