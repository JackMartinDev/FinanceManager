import { useState } from "react";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import testData from "./tempData.json"
import { Anchor, Box, Container, Flex, Group, Text, Title } from "@mantine/core";
import classes from "./StockGraph.module.css";
import CustomTooltip from "./CustomTooltip";

const parseData = (active: number) => {
    const comparisonDate = new Date();
    const parsedData = testData.map(data => ({date: data.date, IVV: data.close}))

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

    const filteredData = parsedData.filter(item => {
        const itemDate = new Date((item.date));
        return itemDate >= comparisonDate;
    });
    return filteredData
}

const generateTicks = (data: {date: string, IVV: number}[], active: number) => {
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

type GraphProps = {
    lineColor: string
}

const StockGraph = (props: GraphProps) => {
    const [active, setActive] = useState(3);
    const peroidOptions = ["1M", "3M", "6M", "1Y"];
    const IVVStockAmount = 201;

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

    const filteredData = parseData(active);
    const ticks = generateTicks(filteredData, active);

    const closeValues = filteredData.map(item => item.IVV);
    const yesterdayClose = closeValues[closeValues.length -1];
    const gain = yesterdayClose! - closeValues[0];
    const gainPercentage = (yesterdayClose! / closeValues[0] - 1) * 100

    const minClose = Math.min(...closeValues);
    const maxClose = Math.max(...closeValues);

    const range = Math.ceil(maxClose - minClose);

    let interval;
    let tickCount;

    if(range >= 10) {
        interval = 5;
        tickCount = 5;
    } else if(range >= 8) {
        interval = 5;
        tickCount = 4;
    } else if(range >= 6) {
        interval = 2;
        tickCount = 5;
    } else if(range >= 1) {
        interval = 1;
        tickCount = 6;
    } else{
        interval = 5;
        tickCount = 6;
    }

    const minDomain = Math.floor(minClose / interval) * interval;
    const maxDomain = Math.ceil(maxClose / interval) * interval;

    const formatXAxis = (dateString: string) => {
        const options: Intl.DateTimeFormatOptions = active > 1 ? { year: 'numeric', month: 'short' } : {month: "short", day: "numeric"};
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', options);
    }

    return(
        <Container w={800}>
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
                    <Title style={{fontWeight:600, marginLeft: 60}}>IVV</Title>
                    <Group gap={0} justify="flex-end" className={classes.mainLinks}>
                        {peroidButtons}
                    </Group>
                </Group>
            </Box>

            <LineChart width={800} height={300} margin={{right:20}} data={filteredData}>
                <CartesianGrid opacity={0.3} vertical={false}/>
                <XAxis dataKey="date" tickFormatter={formatXAxis} ticks={ticks} tick={{fontSize: 12, fill: "#868e96"}} />
                <YAxis domain={[minDomain, maxDomain]} tickCount={tickCount} tick={{fontSize: 12, fill: "#868e96"}}/>
                <Tooltip position={{y:10}} content={<CustomTooltip/>} cursor={{strokeDasharray: "3 3"}} isAnimationActive={false} />
                <Line type="linear" dataKey="IVV" stroke={props.lineColor} strokeWidth={2} dot={false} />
            </LineChart>
        </Container>
    )
}

export default StockGraph
