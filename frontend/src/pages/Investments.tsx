import { Grid, Group } from "@mantine/core"
import StockGraph from "../components/StockGraph/StockGraph"
import StockTable from "../components/StockTable/StockTable"
import StockChart from "../components/StockChart/StockChart";

const data = [
  { name: 'IVV', value: 10558.53, color: '#009790' },
  { name: 'APPL', value: 2902.1, color: '#999790' },
];

const InvestmentsPage = () => {
    return(
        <>
            <Group>
                <StockChart data={data}/>
                <StockTable/>
            </Group>
            <Grid>
                <Grid.Col span={6}><StockGraph lineColor="#228AE5"/></Grid.Col>
                <Grid.Col span={6}><StockGraph lineColor="#999790"/></Grid.Col>
                <Grid.Col span={6}><StockGraph lineColor="#009790"/></Grid.Col>
            </Grid>
        </>
    )
}

export default InvestmentsPage
