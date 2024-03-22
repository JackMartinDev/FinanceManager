import { Box, Button, Flex, Grid, Group, LoadingOverlay, Modal} from "@mantine/core"
import StockGraph from "../components/StockGraph/StockGraph"
import StockTable from "../components/StockTable/StockTable"
import StockChart from "../components/StockChart/StockChart";
import StockModal from "../components/StockModal/StockModal";
import { useDisclosure } from "@mantine/hooks";
import { useAuth } from "../context/AuthContext";
import { useQueries, useQuery, useQueryClient } from "@tanstack/react-query";
import { client } from "../utils/axios";


const InvestmentsPage = () => {
    const {user} = useAuth();
    const [opened, { open, close }] = useDisclosure(false);
    const queryClient = useQueryClient()

    const { data: holdingsData, isLoading, isFetching} = useQuery<StockData[], Error, StockData[]>({
        queryKey: ['holdings', user?.id], 
        queryFn: () => client.get(`holding/${user?.id}`).then((res) => res.data),
    });
    console.log(holdingsData);

    //TODO: Find a work around for the inital loading display when no user holdings
    if( holdingsData?.length === 0 && !isLoading) {
        return (
            <div>
                <Modal opened={opened} onClose={close} title="Add stock" centered>
                    <StockModal close={close} type="add"/>
                </Modal>
                <Button onClick={open} >Add stock</Button>
            </div>
        )
    }

    return(     
        <>
            <Modal opened={opened} onClose={close} title="Add stock" centered>
                <StockModal close={close} type="add"/>
            </Modal>

            <Box mx={50}>
                <LoadingOverlay
                    visible={isLoading || isFetching}
                    zIndex={1000}
                    overlayProps={{ radius: 'sm', blur: 2 }}
                    loaderProps={{ color: 'blue', type: 'bars' }}
                />
                <Grid mb={50}>
                    <Grid.Col span={3}>
                        {holdingsData && <StockChart data={holdingsData}/>}
                    </Grid.Col>
                    <Grid.Col span={9}>
                        <Group justify="right">
                            {holdingsData && <StockTable data={holdingsData}/>}
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
                    {holdingsData && holdingsData.map(data => (
                        <StockGraph key={data.holding.code} data={data}/>
                    ))}
                </Flex>
            </Box>
        </>
    )
}

export default InvestmentsPage
