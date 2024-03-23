import { useState } from "react";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import { Anchor, Box, Container, Flex, Group, Text, Title } from "@mantine/core";
import classes from "./StockGraph.module.css";
import CustomTooltip from "./CustomTooltip";

type Props = {
    data: StockData
}

const StockGraph = ({data}: Props) => {
    const [active, setActive] = useState(3);
    const peroidOptions = ["1M", "3M", "6M", "1Y"];

    const peroidButtons = peroidOptions.map((item, index) => (
        <Anchor<'a'>
            href={item}
            key={item}
            className={classes.mainLink}
            data-active={index === active || undefined}
            onClick={(event) => {
                event.preventDefault();
                setActive(index);
            }}
        >
            {item}
        </Anchor>
    ));

    const filteredData = filterByDate(active, data.stockData);
    const XTicks = generateXTicks(filteredData, active);

    const closeValues = filteredData.map(item => item.close);
    const yesterdayClose = closeValues[closeValues.length -1];
    const gain = yesterdayClose! - closeValues[0];
    const gainPercentage = (yesterdayClose! / closeValues[0] - 1) * 100

    const minClose = Math.min(...closeValues);
    const maxClose = Math.max(...closeValues);

    const range = maxClose - minClose;
    const buffer = range * 0.05;

    const maxDomain = maxClose + buffer
    const minDomain = minClose - buffer;

    let startingTickCount = 5;
    const startingInterval = range / (startingTickCount - 1)

    const findNiceNumber = (value: number) => {
        const exponent = Math.floor(Math.log10(value)); 
        const fraction = value / Math.pow(10, exponent);         
        let niceFraction;

        if (fraction < 1.5) niceFraction = 1;
        else if (fraction < 3) niceFraction = 2;
        else if (fraction < 7) niceFraction = 5;
        else niceFraction = 10;

        return niceFraction * Math.pow(10, exponent);

    }
    const interval = findNiceNumber(startingInterval)
    console.log(minDomain, maxDomain, interval)
    //work on getting these ticks to be nicer numbers
    const YTicks = generateYTicks(minDomain, maxDomain, interval);

    const formatXAxis = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = active > 1 ? { year: 'numeric', month: 'short' } : {month: "short", day: "numeric"};
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }

    return(
        <Container w={700}>
            <Flex
                justify="flex-start"
                align="flex-end"
                direction="column"
                wrap="wrap"
            >
                <Title style={{fontWeight:600}}>{yesterdayClose}<span style={{fontSize: '16px', fontWeight: 400}}>AUD</span></Title>

                {Math.sign(gain) === 1 
                    ? <Text style={{color: 'green'}}>{`+${gain.toFixed(2)} (${gainPercentage.toFixed(2)}%)`}</Text>
                    : <Text style={{color: 'red'}}>{`${gain.toFixed(2)} (${gainPercentage.toFixed(2)}%)`} </Text>}

            </Flex>
            <Box className={classes.links}>
                <Group justify="space-between">
                    <Title style={{fontWeight:600, marginLeft: 60}}>{data.holding.code}</Title>
                    <Group gap={0} justify="flex-end" className={classes.mainLinks}>
                        {peroidButtons}
                    </Group>
                </Group>
            </Box>

            <LineChart width={700} height={300} margin={{right:20}} data={filteredData}>
                <CartesianGrid opacity={0.3} vertical={false}/>
                <XAxis dataKey="date" tickFormatter={formatXAxis} ticks={XTicks} tick={{fontSize: 12, fill: "#868e96"}} />
                <YAxis domain={[minDomain, maxDomain]} ticks={YTicks} tick={{fontSize: 12, fill: "#868e96"}}/>
                <Tooltip position={{y:10}} content={<CustomTooltip/>} cursor={{strokeDasharray: "3 3"}} isAnimationActive={false} />
                <Line type="linear" dataKey="close" stroke={data.holding.color} strokeWidth={2} dot={false} />
            </LineChart>
        </Container>
    )
}

export default StockGraph

const filterByDate = (active: number, data: Stock) => {
    const comparisonDate = new Date();

    switch(active){
        case 0:
            comparisonDate.setMonth(comparisonDate.getMonth() -1);
            break;
        case 1:
            comparisonDate.setMonth(comparisonDate.getMonth() -3);
            break;
        case 2:
            comparisonDate.setMonth(comparisonDate.getMonth() -6);
            break;
        case 3:
            comparisonDate.setMonth(comparisonDate.getMonth() -12);
            break;
        default:
            comparisonDate.setMonth(comparisonDate.getMonth() -12);
    }

    const filteredData = data.filter(item => {
        const itemDate = new Date((item.date));
        return itemDate >= comparisonDate;
    });
    return filteredData
}

const generateYTicks = (min: number, max: number, interval: number) => {
    const ticks = [];
    let currentTick = min;

    while (currentTick <= max) {
        ticks.push(Math.round(currentTick * 10000)/10000);
        currentTick += interval
    }
    return ticks
}

const generateXTicks = (data: {date: string, close: number}[], active: number) => {
    const dates = data.map(object => object.date);
    let ticks;
    dates.shift();
    dates.pop();

    const firstDateForEachMonth: string[] = dates.reduce((acc: string[], cur: string) => {
        // Extract the month and year from the current date
        const [year, month] = cur.split('-');
        const monthKey = `${year}-${month}`;

        // Check if we already have an entry for this month
        const lastEntryMonthKey = acc.length > 0 ? acc[acc.length - 1].split('-').slice(0, 2).join('-') : '';

        // If the last entry in the accumulator is not from the current month, add the current date string
        if (monthKey !== lastEntryMonthKey) {
            acc.push(cur);
        }

        return acc;
    }, []);

    switch(active){
        case 0:
            ticks = dates.filter((_,index) => {
                return index % 4 === 0;
            });
            break;
        case 1:
            ticks = dates.filter((_,index) => {
                return index % 10 === 0;
            });
            break;
        case 2:
            ticks = firstDateForEachMonth;
            break;
        case 3:
            ticks = firstDateForEachMonth.filter((_,index) => {
                return index % 2 === 0;
            });
            ticks.shift();
            break;
        default:
    }
    return ticks
}

