import { Table } from "@mantine/core"

type Props = {
    data: Subscription
}

const SubscriptionList = ({data}: Props) => {
    const rows = data.subscriptions.map((item) => (
        <Table.Tr key={data.month}>
            <Table.Td>{item.name}</Table.Td>
            <Table.Td>{item.price}</Table.Td>
        </Table.Tr>
    ));

    const totalRow = (
        <Table.Tr style={{fontWeight: 500}}>
            <Table.Td>Total</Table.Td>
            <Table.Td>{data.total}</Table.Td>
        </Table.Tr>
    );

    return (
        <Table w={500}>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th>Service name</Table.Th>
                    <Table.Th>Price</Table.Th>
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
