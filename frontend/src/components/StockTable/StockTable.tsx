import { Container, Table, ColorSwatch, Box } from "@mantine/core"
import { formatAUD } from "../../utils/utils";

const stockData = [
    { code: "IVV", name: "S&P 500 ETF", avgPrice: 38.08, gainLoss: 2898.42, units: 201, price: 52.50, change: 0.23, value: 10550, color: "#009790"},
    { code: "APPL", name: "Apple", avgPrice: 109, gainLoss: 1.42, units: 1, price: 111.50, change: 0.01, value: 101, color: "#999790"},
    { code: null, name: "Total", avgPrice: null, gainLoss: 9000, units: null, price: null, change: 0.01, value: 101, color: "#228AE5" },
];
//Add bold for final row
//
//
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
    const rows = data.map((stock) => (
        
        <Table.Tr key={stock.code}>
            <Table.Td><ColorSwatch color={stock.color} size={15}/></Table.Td>
            <Table.Td>{stock.code}</Table.Td>
            <Table.Td>{stock.name}</Table.Td>
            <Table.Td>{stock.avgPrice}</Table.Td>
            <Table.Td>{((stock.data![stock.data!.length -1].close - stock.avgPrice) * stock.volume).toFixed(2)}</Table.Td>
            <Table.Td>{stock.volume}</Table.Td>
            <Table.Td>{stock.data![stock.data!.length -1].close}</Table.Td>
            <Table.Td>{(stock.data![stock.data!.length -1].close - stock.data![stock.data!.length -2].close).toFixed(2)}</Table.Td>
            <Table.Td>{stock.volume * stock.data![stock.data!.length -1].close}</Table.Td>
        </Table.Tr>
    ));

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
