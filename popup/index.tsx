import { ChakraProvider } from "@chakra-ui/provider"
import {
  ColorModeScript,
  extendBaseTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react"
import {
  Alert,
  Button,
  Checkbox,
  Divider,
  FormLabel,
  Heading,
  Link,
  Progress,
  Select,
  Switch,
  Tabs,
  components,
} from "@chakra-ui/theme/components"

import { Popup } from "./Popup"

import type { ThemeOverride } from "@chakra-ui/react"

import "./index.scss"

const theme = extendBaseTheme(
  {
    config: {
      initialColorMode: "dark",
    },
    fontSizes: {
      md: "13.2px",
    },
    components: {
      Checkbox,
      Tabs,
      Card: components.Card,
      Select,
      Button,
      Switch,
      FormLabel,
      Divider,
      Heading,
      Link,
      Progress,
      Alert,
    },
  } as const satisfies ThemeOverride,
  withDefaultColorScheme({
    colorScheme: "orange",
  })
)

const Index = () => (
  <ChakraProvider theme={theme}>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <Popup />
  </ChakraProvider>
)

export default Index
