import { Table, ColorSwatch } from "@mantine/core"

type Stocks = {
    code: string;
    name: string;
    avgPrice: number;
    volume: number;
    data: StockData | undefined;
    color: string;
}

type Props = {
    data: Stocks[]
}
const StockTable = ({data}: Props) => {
    //Maybe remove the empty table clause since it isnt shown anyway
    const rows = data.length > 0 ? data.map(({code, name, color, avgPrice, volume, data}) => {
        const lastClose = data?.[data.length -1]?.close ?? 0;
        const previousClose = data?.[data.length -2]?.close ?? 0;
        const profit = (lastClose - avgPrice) * volume; 
        const change = lastClose - previousClose;
        const value = lastClose * volume;
        
        return (
        <Table.Tr key={code}>
            <Table.Td><ColorSwatch color={color} size={15}/></Table.Td>
            <Table.Td>{code}</Table.Td>
            <Table.Td>{name}</Table.Td>
            <Table.Td>{avgPrice}</Table.Td>
            <Table.Td>{profit.toFixed(2)}</Table.Td>
            <Table.Td>{volume}</Table.Td>
            <Table.Td>{lastClose}</Table.Td>
            <Table.Td>{change.toFixed(2)}</Table.Td>
            <Table.Td>{value.toFixed(2)}</Table.Td>
            </Table.Tr>
        );
    }) : (
            <Table.Tr>
                <Table.Td colSpan={9} align="center">
                    No stocks available.
                </Table.Td>
            </Table.Tr>
        );

    return (
            <Table>
                <Table.Thead>
                    <Table.Tr>
                        <Table.Th></Table.Th>
                        <Table.Th>Code</Table.Th>
                        <Table.Th>Name</Table.Th>
                        <Table.Th>Avg Price</Table.Th>
                        <Table.Th>Profit/Loss</Table.Th>
                        <Table.Th>Units</Table.Th>
                        <Table.Th>Price</Table.Th>
                        <Table.Th>Change</Table.Th>
                        <Table.Th>Value</Table.Th>
                    </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
    );
}

export default StockTable
