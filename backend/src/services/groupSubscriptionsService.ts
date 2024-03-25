import { TSubscription } from "../utils/types";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween"
import isSameOrBefore from "dayjs/plugin/isSameOrBefore"
import isSameOrAfter from "dayjs/plugin/isSameOrAfter"
dayjs.extend(isBetween)
dayjs.extend(isSameOrBefore)
dayjs.extend(isSameOrAfter)


type Subscription = {
    month: string,
    subscriptions: {name: string, price: number}[],
    total: number
}

export const groupSubscriptionsService = (subscriptions: TSubscription[]): Subscription[] => {
    if (subscriptions.length === 0) {
        return [];
    }
    let earliestDate = dayjs(subscriptions[0].startDate);

    subscriptions.forEach(item => {
        if(dayjs(item.startDate).isSameOrBefore(earliestDate)) {
            earliestDate = dayjs(item.startDate);
        };
    })

    let todaysDate = dayjs()
    let monthlyResult: Subscription[] = [];
    let currentDate = earliestDate.startOf('month')

    while (currentDate.isSameOrBefore(todaysDate, 'month')) {
        const monthSubscriptions = subscriptions.filter(sub => {
            const start = dayjs(sub.startDate).startOf('month');
            const end = sub.endDate ? dayjs(sub.endDate).endOf('month') : null
            return start.isSameOrBefore(currentDate) && (!end || end.isSameOrAfter(currentDate))
        });

        const total = monthSubscriptions.reduce((sum, {price}) => sum + price, 0);

        monthlyResult.push({
            month: currentDate.format("YYYY-MM"),
            subscriptions: monthSubscriptions.map(({name, price}) => ({name, price})),
            total
        });

        currentDate = currentDate.add(1, 'month')
    }

   return monthlyResult 
}
