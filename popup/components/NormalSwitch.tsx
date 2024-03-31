import { Grid, FormLabel, Switch } from "@chakra-ui/react"
import { memo, useId } from "react"

interface NormalSwitchProps {
  label: string
  isChecked: boolean
  onChange: () => void
}
const NormalSwitch = memo(
  ({ label, isChecked, onChange }: NormalSwitchProps) => {
    const id = useId()
    return (
      <Grid
        templateColumns="auto auto"
        justifyContent="space-between"
        alignItems="center"
        gap={2}
      >
        <FormLabel htmlFor={id} margin={0} noOfLines={1}>
          {label}
        </FormLabel>
        <Switch id={id} size="md" isChecked={isChecked} onChange={onChange} />
      </Grid>
    )
  }
)

export default NormalSwitch
