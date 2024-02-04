import { readFile, writeFile } from "fs/promises"
import { join } from "path"

import { manifest } from "package.json"

import type { Manifest } from "webextension-polyfill"

const dirNames = {
  firefox: "firefox-mv2-prod",
} as const

const outputDir = "./build"

const manifestFileName = "manifest.json"

Object.values(dirNames).map(async (dirName) => {
  const manifestFilePath = join(outputDir, dirName, manifestFileName)
  const json: Manifest.WebExtensionManifest = JSON.parse(
    await readFile(manifestFilePath, "utf8")
  )
  json.browser_specific_settings = manifest.browser_specific_settings
  await writeFile(manifestFilePath, JSON.stringify(json))
})
