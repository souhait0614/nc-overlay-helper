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
    `/danime/${partId}/commentsCount/${JSON.stringify(option)}`,
    () => getCommentsCount(partId, option),
    {
      suspense: true,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false
    }
  )
}
