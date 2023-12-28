import useSWR from "swr"
import { getCommentsCount } from "utils/danime/getCommentsCount"

export const useCommentsCount = (partId: string) => {
  return useSWR(
    `/danime/${partId}/commentsCount`,
    () => getCommentsCount(partId),
    {
      suspense: true,
      revalidateOnFocus: false
    }
  )
}
