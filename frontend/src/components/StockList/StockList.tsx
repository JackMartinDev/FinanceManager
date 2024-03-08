import { Button, Flex, Group, NumberInput, Select, rem } from "@mantine/core"
import testData from "./stocklist.json"
import { IconCurrencyDollar } from "@tabler/icons-react";

const StockList = () => {
    const filteredData = testData.map(stock => `${stock.Code}: ${stock.Name}`);
    const icon = <IconCurrencyDollar style={{ width: rem(16), height: rem(16) }}/>

    return (
        <>
            <Select 
                label="Stocks"
                placeholder="ASX stocks"
                limit={10}
                data={filteredData}
                searchable
                withCheckIcon={false}
                nothingFoundMessage="There are no stocks that match your search"
                mb="sm"
            />
            <Group justify="space-between" align="end" mb="md">
                <NumberInput hideControls decimalScale={2} flex={1} label="Price" leftSection={icon}/>
                <NumberInput allowDecimal={false} flex={1} label="Amount"/>
            </Group>
            <Flex justify="right">
                <Button >Add</Button>
            </Flex>
        </>
    )
}

export default StockList
