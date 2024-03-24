import { Group } from "@mantine/core"
import SubscriptionsGraph from "../components/Subscriptions/Graph/SubscriptionsGraph"
import SubscriptionList from "../components/Subscriptions/List/SubscriptionsList"

//Current thoughts
//The subscription table will be a component that is managed using a tab system. 1 tab will be generated for each month in the data array.
//The data for that specific month will be passed into the list as a prop;
//The year can also be used to add tabs/filtering for the yearly graph

const test = [
    {
        month: "2024-02",
        subscriptions: [{name: "ChatGPT", price: 23.50}],
        total: 23.50
    },
    {
        month: "2024-03",
        subscriptions: [{name: "Youtube", price: 5.99}, {name: "ChatGPT", price: 23.50}],
        total: 29.49
    },
]

const SubscriptionsPage = () => {
    return(
        <>
            Subscriptions
            <div>Tabs</div>
            <Group align="start">
                <SubscriptionList data={test[1]}/>
                <SubscriptionsGraph data={test}/>
            </Group>
        </>
    )
}

export default SubscriptionsPage
