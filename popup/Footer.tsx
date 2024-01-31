import { Divider, Link, SimpleGrid } from "@chakra-ui/react"
import { GITHUB_URL as NC_OVERLAY_GITHUB_URL } from "@NCOverlay/constants"
import { memo } from "react"

import { GITHUB_URL } from "~constants"

const Footer = memo(() => (
  <footer>
    <Divider />
    <SimpleGrid paddingX={4} paddingY={2} columns={2} justifyItems="center">
      <Link
        color="gray.500"
        target="_blank"
        rel="noopener external noreferrer"
        title="souhait0614/nc-overlay-helper"
        href={GITHUB_URL}
      >
        GitHub
      </Link>
      <Link
        color="gray.500"
        target="_blank"
        rel="noopener external noreferrer"
        title="Midra429/NCOverlay"
        href={NC_OVERLAY_GITHUB_URL}
      >
        NCOverlay
      </Link>
    </SimpleGrid>
  </footer>
))

export default Footer
