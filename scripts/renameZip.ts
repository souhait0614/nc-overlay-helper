import { rename } from "fs/promises"
import { join } from "path"

import { displayName, version } from "package.json"

const zipFileNames = {
  chrome: "chrome-mv3-prod.zip",
  filefox: "firefox-mv3-prod.zip",
} as const

const outputDir = "./build"

Object.entries(zipFileNames).map(async ([name, fileName]) => {
  const newFileName = `${displayName}_v${version}-${name}.zip`
  await rename(join(outputDir, fileName), join(outputDir, newFileName))
})
