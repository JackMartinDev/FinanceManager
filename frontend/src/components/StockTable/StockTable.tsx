import { Table, ColorSwatch, Group, ActionIcon, Modal } from "@mantine/core"
import { IconEdit, IconTrash } from "@tabler/icons-react";
import StockModal from "../StockModal/StockModal";
import { useDisclosure } from "@mantine/hooks";
import { modals } from "@mantine/modals";

type Props = {
    data: StockInfo[]
}

const StockTable = ({data}: Props) => {
    const [opened, { open, close }] = useDisclosure(false);
    let totalProfit = 0;
    let totalChange = 0;

    const totalValue = data.reduce((acc, { volume, data }) => {
        const lastClose = data?.[data.length - 1]?.close ?? 0;
        return acc + (lastClose * volume);
    }, 0);

        const openEditModal = (holding:UserHolding | undefined) => {
        console.log(holding)
        if(holding){
            modals.open({
                title: "Edit",
                centered: true,
                children:
                <StockModal holding={holding} close={modals.closeAll} type="edit"/>
            })
        } else {
            modals.closeAll();
        }
    }


    const rows = data.map(({id, code, name, color, buyPrice, volume, data}) => {
        const lastClose = data?.[data.length -1]?.close ?? 0;
        const previousClose = data?.[data.length -2]?.close ?? 0;
        const profit = (lastClose - buyPrice) * volume; 
        const initialInvestment = buyPrice * volume;
        const profitPercentage = initialInvestment > 0 ? (profit / initialInvestment) * 100 : 0; //Ternarary used to prevent divide by 0 errors.
        const change = lastClose - previousClose;
        const changePercentage = previousClose > 0 ? ((change) / previousClose) * 100 : 0; //Ternarary used to prevent divide by 0 errors.
        const value = lastClose * volume;
        const weight = (value / totalValue) * 100;

        totalProfit += profit;
        totalChange += change * volume;

        return (
            <Table.Tr key={code}>
                <Table.Td><ColorSwatch color={color} size={15}/></Table.Td>
                <Table.Td>{code}</Table.Td>
                <Table.Td>{name}</Table.Td>
                <Table.Td>{buyPrice}</Table.Td>
                <Table.Td>{`${profit.toFixed(2)} (${profitPercentage.toFixed(2)}%)`}</Table.Td>
                <Table.Td>{volume}</Table.Td>
                <Table.Td>{lastClose}</Table.Td>
                <Table.Td>{`${change.toFixed(2)} (${changePercentage.toFixed(2)}%)`}</Table.Td>
                <Table.Td>{value.toFixed(2)}</Table.Td>
                <Table.Td>{weight.toFixed(2)}%</Table.Td>
                <Table.Td>
                    <Group>
                        <ActionIcon
                            variant="default" 
                            aria-label="Edit"
                            onClick={() => {openEditModal({id, code, name, color, buyPrice, volume})}}    
                        >
                            <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>

                        <ActionIcon
                            variant="default" 
                            aria-label="Delete"
                            onClick={() => console.log("delete", code)}    
                        >
                            <IconTrash style={{ width: '70%', height: '70%' }} stroke={1.5} />
                        </ActionIcon>
                    </Group>
                </Table.Td>

            </Table.Tr>
        );
    });

    const totalRow = (
        <Table.Tr>
            <Table.Td></Table.Td>
            <Table.Td></Table.Td>
            <Table.Td>Total Holdings</Table.Td>
            <Table.Td></Table.Td>
            <Table.Td>{totalProfit.toFixed(2)}</Table.Td>
            <Table.Td></Table.Td>
            <Table.Td></Table.Td>
            <Table.Td>{totalChange.toFixed(2)}</Table.Td>
            <Table.Td>{totalValue.toFixed(2)}</Table.Td>
            <Table.Td>100%</Table.Td>
        </Table.Tr>
    );

    return (
        <>
            <Modal opened={opened} onClose={close} title="Add stock" centered>
                <StockModal close={close} type="edit"/>
            </Modal>

        <Table>
            <Table.Thead>
                <Table.Tr>
                    <Table.Th></Table.Th>
                    <Table.Th>Code</Table.Th>
                    <Table.Th>Name</Table.Th>
                    <Table.Th>Avg Price</Table.Th>
                    <Table.Th>Profit/Loss (%)</Table.Th>
                    <Table.Th>Units</Table.Th>
                    <Table.Th>Price</Table.Th>
                    <Table.Th>Change (%)</Table.Th>
                    <Table.Th>Value</Table.Th>
                    <Table.Th>Weight</Table.Th>
                    <Table.Th></Table.Th>
                </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
                {rows}
                {totalRow}
            </Table.Tbody>
        </Table>
        </>
    );
}

export default StockTable
