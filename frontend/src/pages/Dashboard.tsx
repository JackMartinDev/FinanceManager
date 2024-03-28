import { useQuery } from "@tanstack/react-query";
import { useAuth } from "../context/AuthContext";
import { client } from "../utils/axios";

const DashboardPage = () => {
    const {user} = useAuth()

//    const { data: holdingsData, isLoading } = useQuery<StockData[]>({
//        queryKey: ['holdings', user?.id], 
//        queryFn: () => client.get(`holdings/${user?.id}`).then((res) => res.data),
//    });
//
//        const {data: subscriptionsData} = useQuery<SubscriptionList>({
//        queryKey: ['subscriptions', user?.id],
//        queryFn: () => client.get(`subscriptions/${user?.id}`).then((res) => res.data),
//    });

    return(
        <>
            Dashboard
        </>
    )
}

export default DashboardPage
