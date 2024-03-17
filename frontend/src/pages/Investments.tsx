import { Box, Button, Flex, Grid, Modal} from "@mantine/core"
import StockGraph from "../components/StockGraph/StockGraph"
import StockTable from "../components/StockTable/StockTable"
import StockChart from "../components/StockChart/StockChart";
import testData from "./tempData.json"
import AddStockModal from "../components/AddStockModal/AddStockModal";
import { useDisclosure } from "@mantine/hooks";
import { useAuth } from "../context/AuthContext";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "../utils/axios";
import axios from "axios";
import camelcaseKeys from 'camelcase-keys';

const API_TOKEN = import.meta.env.VITE_STOCKS_API_TOKEN

const InvestmentsPage = () => {
    const {user} = useAuth();
    const [opened, { open, close }] = useDisclosure(false);
    const queryClient = useQueryClient()

    const { data: userHoldings} = useQuery<UserHolding[], Error, UserHolding[]>({
        queryKey: ['holdings', user?.id], 
        queryFn: () => client.get(`holding/${user?.id}`).then((res) => res.data),
        select: (data) => data.map(item => camelcaseKeys(item))
    });

    const Stocks = useQueries({
        queries: userHoldings 
            ? userHoldings.map((holding) => {return {
            queryKey: ['stock', holding.code],
            queryFn: () => axios.get(`https://eodhd.com/api/eod/${holding.code}.AU?period=d&api_token=${API_TOKEN}&fmt=json`)
                    .then((res)=> ({...holding, data: res.data})),
            }
        })
        : [],
    })

    const allQueriesLoaded = Stocks.every((res) => !res.isLoading);

    const holdingsData:HoldingsData = Stocks.reduce<HoldingsData>((acc, result) => {
    if (!result.isError && result.data) {
      acc.push(result.data);
    }
    return acc;
  }, []);

    if (!allQueriesLoaded) {
    return <div>Loading...</div>; // or any other loading indicator
  }

    const closeValues = holdingsData.map(item => item.data?.map(data => data.close));

    //get close values
    const chartData = holdingsData.map(item => ({name: item.code, volume: item.volume, data: item.data, color: item.color}))
    const graphData = holdingsData.map(item => ({stock: item.code, color: item.color, data: item.data}))
    const tableData = holdingsData.map(item => ({code: item.code, name: item.name, avgPrice: item.buyPrice, volume: item.volume, data: item.data, color: item.color}))

    return(     
        <>
            <Modal opened={opened} onClose={close} title="Add stock" centered>
                <AddStockModal close={close}/>
            </Modal>
            <Box mx={125}>
                <Grid mb={50}>
                    <Grid.Col span={3}>
                        <StockChart data={chartData}/>
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <StockTable data={tableData}/>
                    </Grid.Col>
                    <Grid.Col span={1}>
                        <Button onClick={open}>Add stock</Button>
                    </Grid.Col>
                </Grid>
                <Flex
                    gap="md"
                    justify="center"
                    align="center"
                    direction="row"
                    wrap="wrap"
                >
                    {graphData.map(data => (
                        <StockGraph key={data.stock} data={data}/>
                    ))}
                </Flex>
            </Box>
        </>
    )
}

export default InvestmentsPage
