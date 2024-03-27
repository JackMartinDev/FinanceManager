import { BarChart } from "@mantine/charts"
import { Paper, Text } from "@mantine/core";
import dayjs from "dayjs"

type Props = {
    data: MonthlySubscription[] 
}

interface ChartTooltipProps {
  label: string;
  payload: Record<string, any>[] | undefined;
}

function ChartTooltip({ label, payload }: ChartTooltipProps) {
  if (!payload) return null;

  return (
    <Paper px="md" py="sm" withBorder shadow="md" radius="md">
      <Text fw={500} mb={5}>
        {dayjs(label).format("MMMM")}
      </Text>
      {payload.map((item: any) => (
        <Text key={item.name} c={item.color} fz="md" fw={500}>
          {"Total"}: {Math.round(item.value * 100) /100}
        </Text>
      ))}
    </Paper>
  );
}

const SubscriptionsGraph = ({data}: Props) => {

    return(
        <>
            <BarChart
                h={500}
                data={data}
                dataKey="month"
                tooltipProps={{
                    content: ({ label, payload }) => <ChartTooltip label={label} payload={payload} />,
                }}
                type="stacked"
                series={[
                    { name: 'total', color: 'blue.6' },
                ]}
            />
        </>
    )
}

export default SubscriptionsGraph
