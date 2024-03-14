import { Button, CheckIcon, ColorSwatch, Group, NumberInput, Select, SimpleGrid, Text, rem } from "@mantine/core"
import testData from "./stocklist.json"
import { IconCurrencyDollar } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "@mantine/form";

const AddStockModal = (props:{close: () => void}) => {
    const testFilter = testData.map(stock => ({value: stock.Code, label: `${stock.Code}: ${stock.Name}`}));
    const icon = <IconCurrencyDollar style={{ width: rem(16), height: rem(16), color: "#121212" }}/>
    const colors = ['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14'];
    const [selectedColor, setSelectedColor] = useState('#2e2e2e');

    const form = useForm({
        initialValues: {
            code: '',
            price: '',
            volume: '',
            color: '#2e2e2e',
        },
               //Add validation 
        validate: {
        },
    });

    const onColorChangeHandler = (color: string) => {
        setSelectedColor(color);
        form.setFieldValue('color',color);
    }

    //TODO: Add a transparent color swatch that can be used to select a custom color from a color picker
    const swatches = colors.map(color => (
        <ColorSwatch 
            key={color}
            color={color} 
            onClick={() => {onColorChangeHandler(color)}}
            style={{color: "#fff", cursor: "pointer"}}
        >
            {selectedColor === color && <CheckIcon style={{ width: rem(12), height: rem(12) }} />}
        </ColorSwatch>))

    const onSubmitHandler = (values: typeof form.values) => {
       console.log(values);
        //post data before closing the dialog
        props.close()
    }

    return (
        <form onSubmit={form.onSubmit((values) => onSubmitHandler(values))}>
            <Select 
                label="Stocks"
                placeholder="ASX stocks"
                limit={10}
                data={testFilter}
                value={form.values.code}
                onChange={(_value, option) => form.setFieldValue('code', option.value)}
                searchable
                withCheckIcon={false}
                nothingFoundMessage="There are no stocks that match your search"
                mb="sm"
            />
            <Group justify="space-between" align="end" mb="md">
                <NumberInput 
                    thousandSeparator="," 
                    hideControls 
                    decimalScale={2} 
                    flex={1} 
                    label="Price" 
                    leftSection={icon}
                    value={form.values.price}
                    onChange={(value) => form.setFieldValue('price', value.toString())}

                />
                <NumberInput 
                    allowDecimal={false} 
                    flex={1} 
                    label="Volume"
                    value={form.values.volume}
                    onChange={(value) => form.setFieldValue('volume', value.toString())}
                />
            </Group>
            <Text size="sm" style={{fontWeight: 500}}>Select Color</Text>
            <Group justify="space-between" align="end">
                <SimpleGrid cols={7} spacing={4} verticalSpacing={4}>
                    {swatches}
                </SimpleGrid>
                <Button type="submit">Add</Button>
            </Group>
        </form>
    )
}

export default AddStockModal
