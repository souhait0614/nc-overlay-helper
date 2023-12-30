import "@NCOverlay/popup/style/index.scss"
import "components/reset.scss"
import "@NCOverlay/styles/common.css"
import { GITHUB_URL as NC_OVERLAY_GITHUB_URL } from "@NCOverlay/constants"
import { Settings } from "components/popup/Settings"
import { version } from "package.json"

import { ResetSettings } from "~components/popup/ResetSettings"
import { GITHUB_URL } from "~types/constants"

const Popup = () => (
  <div id="Main">
    <header id="Header">
      <h1>
        <span>NCOverlayHelper</span>
        <small>
          <a
            id="Version"
            className="is-button"
            target="_blank"
            rel="noopener external noreferrer"
            href={`${GITHUB_URL}/releases/tag/v${version}`}
            title={`v${version}の更新内容`}>
            v{version}
          </a>
        </small>
      </h1>
    </header>
    <section id="Settings">
      <header>
        <h2>設定</h2>
        <ResetSettings />
      </header>
      <Settings />
    </section>
    <section id="Footer">
      <a
        className="link"
        target="_blank"
        rel="noopener external noreferrer"
        title="souhait0614/nc-overlay-helper"
        href={GITHUB_URL}>
        GitHub
      </a>
      <a
        className="link"
        target="_blank"
        rel="noopener external noreferrer"
        title="Midra429/NCOverlay"
        href={NC_OVERLAY_GITHUB_URL}>
        NCOverlay
      </a>
    </section>
  </div>
)

export default Popup
