import { memo } from "react"
import { useCommentsCount } from "hooks/danime/useApi"
import { formatCommentsCount } from "utils/format"
import type { GetCommentsCountOption } from "~utils/danime/getCommentsCount"

const containerClassName = "counter"

interface CommentsCounterProps {
  partId: string
  hideKawaiiCount?: boolean
  getCommentsCountOption?: GetCommentsCountOption
}
export const CommentsCounter = memo(
  ({
    partId,
    hideKawaiiCount,
    getCommentsCountOption = {}
  }: CommentsCounterProps) => {
    const { data } = useCommentsCount(partId, getCommentsCountOption)
    return (
      <div className={containerClassName}>
        {data ? (
          <dl>
            <dt>コメント</dt>
            <dd>{formatCommentsCount(data[0])}</dd>
            {!hideKawaiiCount && (
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
