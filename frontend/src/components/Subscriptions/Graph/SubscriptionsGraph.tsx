import { BarChart } from "@mantine/charts"

type Props = {
    data: MonthlySubscription[] 
}

const SubscriptionsGraph = ({data}: Props) => {
    return(
        <>
            <BarChart
                h={500}
                w={700}
                data={data}
                dataKey="month"
                type="stacked"
                series={[
                    { name: 'total', color: 'blue.6' },
                ]}
            />
        </>
    )
}

export default SubscriptionsGraph
