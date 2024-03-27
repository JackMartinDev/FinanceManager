import { Button, Group, Stack } from "@mantine/core"
import { DateValue, MonthPickerInput, YearPickerInput } from '@mantine/dates';
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
    const [activeYear, setActiveYear] = useState(dayjs().format("YYYY"))

    const {data: subscriptionsData} = useQuery<SubscriptionList>({
        queryKey: ['subscriptions', user?.id],
        queryFn: () => client.get(`subscriptions/${user?.id}`).then((res) => res.data),
    });
    console.log(activeMonth)

    const activeMonthSubscription = subscriptionsData?.monthlyList.find(
        (sub) => sub.month === activeMonth
    );

    const prevMonthHandler = () => {
        const previousMonth = dayjs(activeMonth).subtract(1, "month")
        setActiveMonth(previousMonth.format("YYYY-MM"))
    }

    const nextMonthHandler = () => {
        const nextMonth = dayjs(activeMonth).add(1, "month")
        setActiveMonth(nextMonth.format("YYYY-MM"))
    }

    const prevYearHandler = () => {
        const previousYear = dayjs(activeYear).subtract(1, "year")
        setActiveYear(previousYear.format("YYYY"))
    }

    const nextYearHandler = () => {
        const nextYear = dayjs(activeYear).add(1, "year")
        setActiveYear(nextYear.format("YYYY"))
    }


    const changeMonthHandler = (date: DateValue) => {
        setActiveMonth(dayjs(date).format("YYYY-MM"))
    }

    const changeYearHandler = (date: DateValue) => {
        setActiveYear(dayjs(date).format("YYYY"))
    }

    return(
        <>
            Subscriptions
            <Group align="start">
                <Stack>
                    <Group>
                        <Button onClick={prevMonthHandler}>Prev</Button>
                        <MonthPickerInput
                            placeholder="Pick date"
                            value={new Date(activeMonth)}
                            onChange={(val) => {changeMonthHandler(val)}}
                            maxDate={new Date(dayjs().format("YYYY-MM"))}
                        />
                        <Button onClick={nextMonthHandler} disabled={activeMonth === dayjs().format("YYYY-MM")}>Next</Button>
                    </Group>
                    <SubscriptionList data={activeMonthSubscription}/>
                </Stack>
                <Stack>
                    <Group>
                        <Button onClick={prevYearHandler}>Prev</Button>
                        <YearPickerInput
                            placeholder="Pick date"
                            value={new Date(activeYear)}
                            onChange={(val) => {changeYearHandler(val)}}
                            maxDate={new Date(dayjs().format("YYYY"))}
                        />
                        <Button onClick={nextYearHandler} disabled={activeYear === dayjs().format("YYYY")}>Next</Button>
                    </Group>

                    {subscriptionsData &&
                        <SubscriptionsGraph data={subscriptionsData.monthlyList}/>
                    }
                </Stack>
            </Group>
        </>
    )
}

export default SubscriptionsPage
