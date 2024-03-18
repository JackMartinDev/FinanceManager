import { DonutChart } from "@mantine/charts"
import { ColorSwatch, Group, Stack, Text } from "@mantine/core";
import { formatAUD } from "../../utils/utils";

type Props = {
    data: {name: string, volume: number, data?:StockData, color: string}[]
}
const StockChart = ({data}: Props) => {
    const chartData = data.map(item => {
        const lastDataPoint = item.data?.[item.data?.length - 1];
        const value = lastDataPoint ? item.volume * lastDataPoint.close : 0;
        return {name: item.name, value, color: item.color}
    });

    return(
        <Group align="start" gap={35}>
            <DonutChart data={chartData} withTooltip={false} chartLabel="Stock breakdown" strokeWidth={0}/>
            <Stack mt={10}>
                {chartData.map((item) => (
                    <Group key={item.name}>
                        <ColorSwatch color={item.color} size={15}/>
                        <Text>{`${item.name} ${formatAUD(item.value)}`}</Text>
                    </Group>))}
            </Stack>
        </Group>
    )
}

export default StockChart
