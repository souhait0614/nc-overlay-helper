import {
  Center,
  CircularProgress,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react"
import { Suspense, lazy, memo } from "react"

import type { CenterProps } from "@chakra-ui/react"
import type { ReactNode } from "react"

const CommentsCounter = lazy(() => import("~popup/pages/CommentsCounter"))
const Settings = lazy(() => import("~popup/pages/Settings"))

interface SuspenseLoadingProps {
  height?: CenterProps["height"]
  children: ReactNode
}
const SuspenseLoading = memo(({ height, children }: SuspenseLoadingProps) => (
  <Suspense
    fallback={
      <Center width="100%" height={height}>
        <CircularProgress isIndeterminate color="orange" />
      </Center>
    }
  >
    {children}
  </Suspense>
))

export const Main = memo(() => {
  return (
    <Tabs isFitted position="relative" isLazy size="md" as="main">
      <TabList>
        <Tab>
          <Text wordBreak="keep-all">コメントカウンター</Text>
        </Tab>
        <Tab>
          <Text wordBreak="keep-all">その他</Text>
        </Tab>
      </TabList>
      <TabPanels>
        <TabPanel>
          <SuspenseLoading height="156px">
            <CommentsCounter />
          </SuspenseLoading>
        </TabPanel>
        <TabPanel>
          <SuspenseLoading height="107px">
            <Settings />
          </SuspenseLoading>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
})
