import useSWR from "swr"
import {
  getCommentsCount,
  type GetCommentsCountOption
} from "utils/danime/getCommentsCount"

export const useCommentsCount = (
  partId: string,
  option: GetCommentsCountOption = {}
) => {
  return useSWR(
    `/danime/${partId}/commentsCount`,
    () => getCommentsCount(partId, option),
    {
      suspense: true,
      revalidateOnFocus: false
    }
  )
}
