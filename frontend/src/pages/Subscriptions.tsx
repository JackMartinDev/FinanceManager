import { Button, Group, Stack } from "@mantine/core"
import { DateValue, MonthPickerInput } from '@mantine/dates';
import SubscriptionsGraph from "../components/Subscriptions/Graph/SubscriptionsGraph"
import SubscriptionList from "../components/Subscriptions/List/SubscriptionsList"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../context/AuthContext"
import { client } from "../utils/axios"
import { useState } from "react"
import dayjs from "dayjs"

//Current thoughts
//The subscription table will be a component that is managed using a tab system. 1 tab will be generated for each month in the data array.
//The data for that specific month will be passed into the list as a prop;
//The year can also be used to add tabs/filtering for the yearly graph
//
//
//For the date select I will use a left and right button as well as a month picker.

const SubscriptionsPage = () => {
    const {user} = useAuth()
    const [activeMonth, setActiveMonth] = useState(dayjs().format("YYYY-MM"))

    const {data: subscriptionsData} = useQuery<SubscriptionList>({
        queryKey: ['subscriptions', user?.id],
        queryFn: () => client.get(`subscriptions/${user?.id}`).then((res) => res.data),
    });
    console.log(activeMonth)

    const activeMonthSubscription = subscriptionsData?.monthlyList.find(
        (sub) => sub.month === activeMonth
    );

    const prevDateHandler = () => {
        const previousMonth = dayjs(activeMonth).subtract(1, "month")
        setActiveMonth(previousMonth.format("YYYY-MM"))
    }

    const nextDateHandler = () => {
        const previousMonth = dayjs(activeMonth).add(1, "month")
        setActiveMonth(previousMonth.format("YYYY-MM"))
    }

    const changeDateHandler = (date: DateValue) => {
        setActiveMonth(dayjs(date).format("YYYY-MM"))
    }

    return(
        <>
            Subscriptions
            <Group align="start">
                <Stack>
                    <Group>
                        <Button onClick={prevDateHandler}>Prev</Button>
                        <MonthPickerInput
                            placeholder="Pick date"
                            value={new Date(activeMonth)}
                            onChange={(val) => {changeDateHandler(val)}}
                        />
                        <Button onClick={nextDateHandler}>Next</Button>
                    </Group>
                        <SubscriptionList data={activeMonthSubscription}/>
                </Stack>
                {subscriptionsData &&
                    <SubscriptionsGraph data={subscriptionsData.monthlyList}/>
                }
            </Group>
        </>
    )
}

export default SubscriptionsPage
