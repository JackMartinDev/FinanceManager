import { Button, Flex, Group, Modal, Stack, Title } from "@mantine/core"
import { DateValue, MonthPickerInput, YearPickerInput } from '@mantine/dates';
import SubscriptionsGraph from "../components/Subscriptions/Graph/SubscriptionsGraph"
import SubscriptionList from "../components/Subscriptions/List/SubscriptionsList"
import { useQuery } from "@tanstack/react-query"
import { useAuth } from "../context/AuthContext"
import { client } from "../utils/axios"
import { useState } from "react"
import dayjs from "dayjs"
import { useDisclosure } from "@mantine/hooks";
import AddSubscriptionModal from "../components/Subscriptions/Modal/AddSubscriptionModal";

const SubscriptionsPage = () => {
    const {user} = useAuth()
    const [opened, {open,close}] = useDisclosure();
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


    const generateGraphData = (data: MonthlySubscription[], year: string):MonthlySubscription[] => {
        return Array.from({ length: 12}, (_, i) => {
            const monthDate = dayjs(`${year}-01-01`).add(i, 'month').format("YYYY-MM");
            const existingData = data.find(d => d.month === monthDate);

            return existingData || { month: monthDate, subscriptions: [], total: 0 };
        });
    };

    return(
        <>
            <Modal opened={opened} onClose={close} title="Add subscription">
                <AddSubscriptionModal close={close}/>
            </Modal>

            <Title mb={16}>Subscriptions</Title>
            <Flex align="start" justify="space-between" gap={100} mx={25}>
                <Stack flex={1}>
                    <Group justify="center">
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
                    <Button onClick={open}>Add subscription</Button>
                </Stack>
                <Stack flex={2}>
                    <Group justify="center">
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
                        <SubscriptionsGraph data={generateGraphData(subscriptionsData.monthlyList, activeYear)}/>
                    }
                </Stack>
            </Flex>
        </>
    )
}

export default SubscriptionsPage
