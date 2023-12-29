import { sendToBackground } from "@plasmohq/messaging"
import { Logger } from "utils/logger"

import type { search } from "@NCOverlay/background/api/niconico/search"
import type { threads } from "@NCOverlay/background/api/niconico/threads"
import type { video } from "@NCOverlay/background/api/niconico/video"
import type { MessageName } from "@plasmohq/messaging"

export interface MessageType {
  "niconico/search": {
    body: Parameters<typeof search>
    result: Awaited<ReturnType<typeof search>>
  }
  "niconico/video": {
    body: Parameters<typeof video>
    result: Awaited<ReturnType<typeof video>>
  }
  "niconico/threads": {
    body: Parameters<typeof threads>
    result: Awaited<ReturnType<typeof threads>>
  }
}

const proxy = async <T extends MessageName>(
  name: T,
  body: MessageType[T]["body"]
): Promise<MessageType[T]["result"] | null> => {
  const res = await sendToBackground<
    MessageType[T]["body"],
    MessageType[T]["result"] | null
  >({
    name,
    body
  })
  Logger.debug("res", name, body, res)

  if (res) {
    return res
  }

  return null
}

export const NiconicoApi = {
  search: (body: MessageType["niconico/search"]["body"]) => {
    return proxy("niconico/search", body)
  },
  video: (body: MessageType["niconico/video"]["body"]) => {
    return proxy("niconico/video", body)
  },
  threads: (body: MessageType["niconico/threads"]["body"]) => {
    return proxy("niconico/threads", body)
  }
}
