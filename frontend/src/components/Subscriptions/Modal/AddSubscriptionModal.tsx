import { Button, Group, NumberInput, TextInput, rem } from "@mantine/core"
import { IconCurrencyDollar } from "@tabler/icons-react";
import { useState } from "react";
import { useForm } from "@mantine/form";
import axios from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "../../../context/AuthContext";
import { client } from "../../../utils/axios";
import { MonthPickerInput } from "@mantine/dates";
import dayjs from "dayjs";


const AddSubscriptionModal = (props:{close: () => void}) => {
    const icon = <IconCurrencyDollar style={{ width: rem(16), height: rem(16), color: "#121212" }}/>
    const user = useAuth();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const queryClient = useQueryClient()

    const addStockMutation = useMutation({
        mutationFn: (subscription: {userId: string | undefined; name: string; price:string; startDate: Date; endDate: Date | null;}) => {
            return client.post(`subscriptions/`, subscription)
        },
        onSuccess: () => {
            return queryClient.invalidateQueries({queryKey: ["subscriptions"]})
        }
    })

    const form = useForm({
        initialValues: {
            name: '',
            price: '',
            startDate: dayjs().format("YYYY-MM"),
            endDate: '',

        },
        //Add validation 
        validate: {
            name: (val) => (/^\s*\S+.*$/.test(val) ? null : 'Name is a required field'),
            price: (val) => (/^\s*\S+.*$/.test(val) ? null : 'Price is a required field'),
            startDate: (val) => (/^\s*\S+.*$/.test(val) ? null : 'Start date is a required field'),
        },
    });

    const onSubmitHandler = async(values: typeof form.values) => {
        setIsSubmitting(true);
        const {name, price, startDate, endDate} = values;
        const postData = {name, price, startDate: new Date(startDate), endDate: endDate ? new Date(endDate) : null, userId: user.user?.id}
        console.log("posting",postData)
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
            <Group align="end" mb="md" grow>
                <TextInput
                    label="Name"
                    placeholder="Enter Subscription"
                    w="50%"
                    {...form.getInputProps('name')}
                />
                <NumberInput 
                    thousandSeparator="," 
                    hideControls 
                    decimalScale={2} 
                    flex={1} 
                    label="Monthly fee" 
                    leftSection={icon}
                    w="50%"
                    {...form.getInputProps('price')}
                />

            </Group>
            <Group align="end" mb="md" grow>
                <MonthPickerInput
                    placeholder="Pick date"
                    label="Starting month"
                    value={new Date(form.values.startDate)}
                    onChange={(val) => form.setFieldValue('startDate', dayjs(val).format('YYYY-MM'))}
                    maxDate={new Date()}
                />
                <MonthPickerInput
                    placeholder="Pick date"
                    label="End month"
                    value={form.values.endDate ? new Date(form.values.endDate) : undefined}
                    onChange={(val) => form.setFieldValue('endDate', val ? dayjs(val).format('YYYY-MM') : '')}
                    minDate={new Date(form.values.startDate)}
                />
            </Group>
            <Button type="submit" >Add</Button>
        </form>
    )
}

export default AddSubscriptionModal
