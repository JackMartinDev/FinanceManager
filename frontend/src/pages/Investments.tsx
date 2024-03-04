import { Box, Flex, Grid, Group } from "@mantine/core"
import StockGraph from "../components/StockGraph/StockGraph"
import StockTable from "../components/StockTable/StockTable"
import StockChart from "../components/StockChart/StockChart";

const data = [
  { name: 'IVV', value: 10558.53, color: '#009790' },
  { name: 'APPL', value: 2902.1, color: '#999790' },
];

const InvestmentsPage = () => {
    return(
        <Box mx={125}>
            <Grid mb={50}>
                <Grid.Col span={4}>
                    <StockChart data={data}/>
                </Grid.Col>
                <Grid.Col span={8}>
                    <StockTable/>
                </Grid.Col>
            </Grid>
            <Flex
                gap="md"
                justify="center"
                align="center"
                direction="row"
                wrap="wrap"
            >
                <StockGraph lineColor="#228AE5"/>
                <StockGraph lineColor="#999790"/>
                <StockGraph lineColor="#009790"/>
            </Flex>
        </Box>
    )
}

export default InvestmentsPage
