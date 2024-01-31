import { HStack, Heading, Link } from "@chakra-ui/react"
import { version } from "package.json"
import { memo } from "react"

import { GITHUB_URL } from "~constants"

const Header = memo(() => (
  <header>
    <HStack as="h1" alignItems="baseline" marginX={4} marginY={2}>
      <Heading size="lg" as="span">
        NCOverlayHelper
      </Heading>
      <Link
        fontSize="xl"
        color="gray.500"
        target="_blank"
        rel="noopener external noreferrer"
        href={`${GITHUB_URL}/releases/tag/v${version}`}
        title={`v${version}の更新内容`}
      >
        v{version}
      </Link>
    </HStack>
  </header>
))

export default Header
