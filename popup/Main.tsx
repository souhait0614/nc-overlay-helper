import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Center,
  CircularProgress,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  VStack,
} from "@chakra-ui/react"
import { Suspense, lazy, memo } from "react"
import { ErrorBoundary } from "react-error-boundary"

import { ResetSettingsButton } from "./components/ResetSettingsButton"

import type { CenterProps } from "@chakra-ui/react"
import type { ReactNode } from "react"

const CommentsCounter = lazy(() => import("~popup/pages/CommentsCounter"))
const Settings = lazy(() => import("~popup/pages/Settings"))

interface TabWrapperProps {
  height?: CenterProps["height"]
  children: ReactNode
}
const TabWrapper = memo(({ height, children }: TabWrapperProps) => (
  <ErrorBoundary
    FallbackComponent={({ error }) => (
      <Center width="100%" height={height}>
        <VStack>
          <Alert
            status="error"
            variant="subtle"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            textAlign="center"
          >
            <AlertIcon />
            <AlertTitle>エラーが発生しました</AlertTitle>
            <AlertDescription>{String(error)}</AlertDescription>
          </Alert>
          <ResetSettingsButton threshold={1000} />
        </VStack>
      </Center>
    )}
  >
    <Suspense
      fallback={
        <Center width="100%" height={height}>
          <CircularProgress isIndeterminate color="orange" />
        </Center>
      }
    >
      {children}
    </Suspense>
  </ErrorBoundary>
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
          <TabWrapper height="156px">
            <CommentsCounter />
          </TabWrapper>
        </TabPanel>
        <TabPanel>
          <TabWrapper height="139px">
            <Settings />
          </TabWrapper>
        </TabPanel>
      </TabPanels>
    </Tabs>
  )
})
