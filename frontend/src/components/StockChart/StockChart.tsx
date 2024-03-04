import { DonutChart } from "@mantine/charts"
import { ColorSwatch, Group, Stack, Text } from "@mantine/core";
import { formatAUD } from "../../utils/utils";

type Props = {
    data: { name: string; value: number; color: string; }[]
}

const StockChart = ({data}: Props) => {
    return(
        <Group align="start" gap={50}>
            <DonutChart data={data} withTooltip={false} chartLabel="Stock breakdown"/>
            <Stack>
                {data.map((item) => (
                    <Group>
                        <ColorSwatch color={item.color} size={15}/>
                        <Text>{`${item.name} ${formatAUD(item.value)}`}</Text>
                    </Group>))}
            </Stack>
        </Group>
   )
}

export default StockChart
