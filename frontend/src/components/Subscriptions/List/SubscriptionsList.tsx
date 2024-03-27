import { Table } from "@mantine/core"

type Props = {
    data: MonthlySubscription | undefined
}

const SubscriptionList = ({data}: Props) => {
    if(!data) return(
        <Table withTableBorder>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Service name</Table.Th>
                    <Table.Th>Price</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
        <Table.Tr>
            <Table.Td>No Subscriptions for this month</Table.Td>
        </Table.Tr>
            </Table.Tbody>
        </Table>

    )
    const rows = data.subscriptions.map((item) => (
        <Table.Tr key={item.name}>
            <Table.Td>{item.name}</Table.Td>
            <Table.Td>{item.price}</Table.Td>
        </Table.Tr>
    ));

    const totalRow = (
        <Table.Tr style={{fontWeight: 500}}>
            <Table.Td>Total</Table.Td>
            <Table.Td>{Math.round(data.total * 100)/100}</Table.Td>
        </Table.Tr>
    );

    return (
        <Table withTableBorder>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Service Name</Table.Th>
                    <Table.Th>Monthly Fee</Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows}
                {totalRow}
            </Table.Tbody>
        </Table>
    );
}

export default SubscriptionList
