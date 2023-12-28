import { NiconicoApi } from "@NCOverlay/background/api/niconico"
import { Mutex } from "async-mutex"

import type { PlasmoMessaging } from "@plasmohq/messaging"

const mutex = new Mutex()

const handler: PlasmoMessaging.MessageHandler<
  Parameters<typeof NiconicoApi.search>,
  Awaited<ReturnType<typeof NiconicoApi.search>>
> = async (req, res) => {
  if (!req.body) throw new Error("body is required")
  await mutex.waitForUnlock()
  const release = await mutex.acquire()
  try {
    const response = await NiconicoApi.search(...req.body)
    res.send(response)
  } finally {
    release()
  }
}

export default handler
