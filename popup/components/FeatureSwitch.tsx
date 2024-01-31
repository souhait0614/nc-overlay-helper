import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons"
import {
  Card,
  Checkbox,
  IconButton,
  useBoolean,
  Box,
  Divider,
} from "@chakra-ui/react"
import { memo } from "react"

import type { ReactNode } from "react"

type FeatureSwitchProps = {
  checked: boolean
  onChange: () => void
  label: string
} & (
  | {
      expand?: false
      isIndeterminate?: never
      children?: never
    }
  | {
      expand: true
      isIndeterminate: boolean
      children: ReactNode
    }
)
const FeatureSwitch = memo(
  ({
    checked,
    isIndeterminate = false,
    onChange: handleChange,
    label,
    expand = false,
    children,
  }: FeatureSwitchProps) => {
    const [open, setOpen] = useBoolean()
    return (
      <Card variant="filled" width="100%" overflow="hidden">
        <Box
          width="100%"
          display="grid"
          gridTemplateColumns="auto auto"
          justifyContent="space-between"
          alignItems="center"
        >
          <Checkbox
            size="md"
            paddingLeft={3}
            onChange={handleChange}
            isChecked={checked}
            isIndeterminate={isIndeterminate}
          >
            {label}
          </Checkbox>
          {expand && (
            <IconButton
              size="md"
              variant="ghost"
              colorScheme="gray"
              aria-label={`${label}の詳細設定を${open ? "閉じる" : "開く"}`}
              icon={
                open ? (
                  <ChevronUpIcon fontSize="16px" />
                ) : (
                  <ChevronDownIcon fontSize="16px" />
                )
              }
              borderBottomRightRadius={0}
              onClick={setOpen.toggle}
            />
          )}
        </Box>
        {expand && open && (
          <>
            <Divider />
            <Box p={3}>{children}</Box>
          </>
        )}
      </Card>
    )
  }
)

export default FeatureSwitch
