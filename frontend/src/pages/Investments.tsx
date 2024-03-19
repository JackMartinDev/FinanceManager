import { Box, Button, Flex, Grid, Group, LoadingOverlay, Modal} from "@mantine/core"
import StockGraph from "../components/StockGraph/StockGraph"
import StockTable from "../components/StockTable/StockTable"
import StockChart from "../components/StockChart/StockChart";
import StockModal from "../components/StockModal/StockModal";
import { useDisclosure } from "@mantine/hooks";
import { useAuth } from "../context/AuthContext";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "../utils/axios";
import axios from "axios";
import camelcaseKeys from 'camelcase-keys';
import { useMemo } from "react";

const API_TOKEN = import.meta.env.VITE_STOCKS_API_TOKEN

const InvestmentsPage = () => {
    const {user} = useAuth();
    const [opened, { open, close }] = useDisclosure(false);
    const queryClient = useQueryClient()

    const { data: userHoldings, isLoading, isFetching} = useQuery<UserHolding[], Error, UserHolding[]>({
        queryKey: ['holdings'], 
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


    //TODO: Find a work around for the inital loading display when no user holdings
    if( userHoldings?.length === 0 && !isLoading) {
        return (
            <div>
                <Modal opened={opened} onClose={close} title="Add stock" centered>
                    <StockModal close={close} type="add"/>
                </Modal>
                <Button onClick={open} >Add stock</Button>
            </div>
        )
    }


    const chartData = useMemo(() => holdingsData.map(item => ({
        name: item.code,
        volume: item.volume,
        data: item.data,
        color: item.color
    })), [holdingsData]);

    const graphData = useMemo(() => holdingsData.map(item => ({
        stock: item.code,
        color: item.color,
        data: item.data
    })), [holdingsData]);

    const tableData = useMemo(() => holdingsData.map(item => ({
        id: item.id,
        code: item.code,
        name: item.name,
        buyPrice: item.buyPrice,
        volume: item.volume,
        data: item.data,
        color: item.color
    })), [holdingsData]);

    return(     
        <>
            <Modal opened={opened} onClose={close} title="Add stock" centered>
                <StockModal close={close} type="add"/>
            </Modal>

            <Box mx={50}>
                <LoadingOverlay
                    visible={isLoading || isFetching || !allQueriesLoaded}
                    zIndex={1000}
                    overlayProps={{ radius: 'sm', blur: 2 }}
                    loaderProps={{ color: 'blue', type: 'bars' }}
                />
                <Grid mb={50}>
                    <Grid.Col span={3}>
                        <StockChart data={chartData}/>
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <Group justify="right">
                            <StockTable data={tableData}/>
                            <Button onClick={open} justify="right">Add stock</Button>
                        </Group>
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
