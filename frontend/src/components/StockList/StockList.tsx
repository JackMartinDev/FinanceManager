import { Button, ColorPicker, Group, NumberInput, Select, rem } from "@mantine/core"
import testData from "./stocklist.json"
import { IconCurrencyDollar } from "@tabler/icons-react";
import { useState } from "react";

const StockList = () => {
    const filteredData = testData.map(stock => `${stock.Code}: ${stock.Name}`);
    const [color, setColor] = useState('#23b9de');
    const icon = <IconCurrencyDollar style={{ width: rem(16), height: rem(16), color: "#121212" }}/>

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
                <NumberInput thousandSeparator="," hideControls decimalScale={2} flex={1} label="Price" leftSection={icon}/>
                <NumberInput allowDecimal={false} flex={1} label="Amount"/>
            </Group>
            <Group justify="space-between" align="end">
                <ColorPicker
                    value={color} 
                    onChange={setColor}
                    format="hex"
                    swatches={['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14']}
                    withPicker={false}
                    />
                <Button >Add</Button>
            </Group>
        </>
    )
}

export default StockList
