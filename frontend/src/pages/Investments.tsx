import { Box, Button, Flex, Grid, Modal} from "@mantine/core"
import StockGraph from "../components/StockGraph/StockGraph"
import StockTable from "../components/StockTable/StockTable"
import StockChart from "../components/StockChart/StockChart";
import testData from "./tempData.json"
import AddStockModal from "../components/AddStockModal/AddStockModal";
import { useDisclosure } from "@mantine/hooks";

interface Holdings {
    [key: string]: number;
}

const closeValues = testData.map(item => ({stock: item.stock, value: item.data[item.data.length - 1].close, color: item.color}));

const holdings:Holdings = {
    IVV: 201,
    AAPL: 27
}

const data = closeValues.map(item => ({name: item.stock, value: item.value * holdings[item.stock], color: item.color}))

const InvestmentsPage = () => {
    const [opened, { open, close }] = useDisclosure(false);
    return(     
        <>
            <Modal opened={opened} onClose={close} title="Add stock" centered>
                <AddStockModal close={close}/>
            </Modal>
            <Box mx={125}>
                <Grid mb={50}>
                    <Grid.Col span={3}>
                        <StockChart data={data}/>
                    </Grid.Col>
                    <Grid.Col span={8}>
                        <StockTable/>
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
                    {testData.map(data => (
                        <StockGraph key={data.stock} data={data}/>
                    ))}
                </Flex>
            </Box>
        </>
    )
}

export default InvestmentsPage
