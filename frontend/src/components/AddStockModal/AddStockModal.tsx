import { Button, CheckIcon, ColorSwatch, Group, NumberInput, Select, SimpleGrid, Text, rem } from "@mantine/core"
import testData from "./stocklist.json"
import { IconCurrencyDollar } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "@mantine/form";
import { useAuth } from "../../context/AuthContext";
import { client } from "../../utils/axios";
import axios, { AxiosResponse } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const colors = ['#2e2e2e', '#868e96', '#fa5252', '#e64980', '#be4bdb', '#7950f2', '#4c6ef5', '#228be6', '#15aabf', '#12b886', '#40c057', '#82c91e', '#fab005', '#fd7e14'];

const AddStockModal = (props:{close: () => void}) => {
    const testFilter = testData.map(stock => ({value: `${stock.Code}: ${stock.Name}`, label: `${stock.Code}: ${stock.Name}`}));
    const icon = <IconCurrencyDollar style={{ width: rem(16), height: rem(16), color: "#121212" }}/>
    const [selectedColor, setSelectedColor] = useState('#2e2e2e');
    const user = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);

    const queryClient = useQueryClient()

    const addStockMutation = useMutation({
        mutationFn: (stock: {userId: string | undefined; code: string; name:string; buyPrice: string;volume: string;color: string;}) => {
            return client.post(`holding/`, stock)
        },
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["holdings"]})
            queryClient.invalidateQueries({queryKey: ["stock"]})
        }
    })

    const form = useForm({
        initialValues: {
            code: '',
            buyPrice: '',
            volume: '',
            color: '#2e2e2e',
        },
               //Add validation 
        validate: {
            code: (val) => (/^\s*\S+.*$/.test(val) ? null : 'Code is a required field'),
            buyPrice: (val) => (/^\s*\S+.*$/.test(val) ? null : 'Price is a required field'),
            volume: (val) => (/^\s*\S+.*$/.test(val) ? null : 'Volume is a required field'),
            color: (val) => (/#([a-fA-F0-9]{6}|[a-fA-F0-9]{3})/i.test(val) ? null : 'Color must be a hexidecimal value'),
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

    const onSubmitHandler = async(values: typeof form.values) => {
        setIsSubmitting(true);
        const {color, volume, buyPrice} = values;
        const [code, name] = values.code.split(":");
        const postData = {code, name, color, volume, buyPrice, userId: user.user?.id}
        console.log(postData)
        try {
            addStockMutation.mutate(postData)
            props.close();
        } catch (error) {
            if(axios.isAxiosError(error)){
                switch(error.response?.status){
                    default:
                        console.log("An error has occured")
                }
            } else {
                console.log(error);
                // Handle non-Axios errors
            }
        } finally{
            setIsSubmitting(false);
        }
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
                error={form.errors.code && "Code is a required field"}
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
                    value={form.values.buyPrice}
                    error={form.errors.buyPrice && "Price is a required field"}
                    onChange={(value) => form.setFieldValue('buyPrice', value.toString())}

                />
                <NumberInput 
                    allowDecimal={false} 
                    flex={1} 
                    label="Volume"
                    placeholder="Units"
                    value={form.values.volume}
                    error={form.errors.volume && "Volume is a required field"}
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
