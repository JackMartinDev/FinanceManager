import { Box, Button, Center, Flex, Grid, Group, Modal, Stack, Title} from "@mantine/core"
import StockGraph from "../components/StockGraph/StockGraph"
import StockTable from "../components/StockTable/StockTable"
import StockChart from "../components/StockChart/StockChart";
import StockModal from "../components/StockModal/StockModal";
import { useDisclosure } from "@mantine/hooks";
import { useAuth } from "../context/AuthContext";
import { useQuery } from "@tanstack/react-query";
import { client } from "../utils/axios";


const InvestmentsPage = () => {
    const {user} = useAuth();
    const [opened, { open, close }] = useDisclosure(false);

    const { data: holdingsData, isSuccess, isPending, isError, error } = useQuery<StockData[]>({
        queryKey: ['holdings', user?.id], 
        queryFn: () => client.get(`holdings/${user?.id}`).then((res) => res.data),
    });

    //TODO: Find a work around for the inital loading display when no user holdings
    if( isSuccess && holdingsData.length === 0) {
        return (
            <Center>
                <Modal opened={opened} onClose={close} title="Add stock" centered>
                    <StockModal close={close} type="add"/>
                </Modal>
                <Stack align="center">
                    <Title>Start Investing</Title>
                    <Button  onClick={open} >Add stocks</Button>
                </Stack>
            </Center>
        )
    }

    if (isPending) return null

    //Figure out some error thing. Maybe use ErrorBoundry
    if (isError){
        return<div>Error: {error.message}</div>
    }


    return(     
        <>
            <Modal opened={opened} onClose={close} title="Add stock" centered>
                <StockModal close={close} type="add"/>
            </Modal>

            <Title mb={16}>Investments</Title>
            <Box mx={16}>
                <Grid mb={50}>
                    <Grid.Col span={2}>
                        <StockChart data={holdingsData}/>
                    </Grid.Col>
                    <Grid.Col span={10}>
                        <Group justify="right">
                            <StockTable data={holdingsData}/>
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
                    {holdingsData.map(data => (
                        <StockGraph key={data.holding.code} data={data}/>
                    ))}
                </Flex>
            </Box>
        </>
    )
}

export default InvestmentsPage
