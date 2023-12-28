import { NiconicoApi } from "@NCOverlay/background/api/niconico"

import type { PlasmoMessaging } from "@plasmohq/messaging"

// const mutex = new Mutex()

const handler: PlasmoMessaging.MessageHandler<
  Parameters<typeof NiconicoApi.threads>,
  Awaited<ReturnType<typeof NiconicoApi.threads>>
> = async (req, res) => {
  if (!req.body) throw new Error("body is required")
  // await mutex.waitForUnlock()
  // const release = await mutex.acquire()
  try {
    const response = await NiconicoApi.threads(...req.body)
    res.send(response)
  } finally {
    // release()
  }
}

export default handler
