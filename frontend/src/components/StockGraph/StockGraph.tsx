import { useState } from "react";
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from "recharts";
import testData from "./tempData.json"
import { Anchor, Box, Container, Flex, Group, Text, Title } from "@mantine/core";
import classes from "./StockGraph.module.css";
import CustomTooltip from "./CustomTooltip";

const formatDateStringAxis = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options);
}

const formatDateStringTooltip = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options).replace(',','');
}

const parseData = (active: number) => {
    const comparisonDate = new Date();
    const parsedData = testData.map(data => ({date: formatDateStringTooltip(data.date), IVV: data.close}))

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
        const itemDate = new Date(item.date);
        return itemDate >= comparisonDate;
    });
    return filteredData
}


const StockGraph = () => {
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

    //Maybe refactor into a function
    //base this off the selected peroid
    const closeValues = filteredData.map(item => item.IVV);
    const yesterdayClose = closeValues.pop();
    const gain = yesterdayClose! - closeValues[0];
    const gainPercentage = (yesterdayClose! / closeValues[0] - 1) * 100
    console.log(gainPercentage)

    if(yesterdayClose){
        console.log(closeValues[0] * IVVStockAmount);
        console.log(yesterdayClose * IVVStockAmount);
    }
    console.log(closeValues)

    const minClose = Math.min(...closeValues);
    const maxClose = Math.max(...closeValues);

    const minDomain = Math.floor(minClose / 5) * 5;
    const maxDomain = Math.ceil(maxClose / 5) * 5;

    //Have these values also determined by the selected peroid state. 
    const tickCount = (maxDomain - minDomain) / 5 + 1;


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
                    <Group gap={0} justify="flex-end" className={classes.mainLinks}>
                        {peroidButtons}
                    </Group>
                </Box>

                <LineChart width={800} height={300} margin={{right:20}} data={filteredData}>

                    <CartesianGrid opacity={0.3} vertical={false}/>
                    <XAxis dataKey="date" tickFormatter={formatDateStringAxis} interval={40} tick={{fontSize: 12, fill: "#868e96"}} />
                    <YAxis domain={[minDomain, maxDomain]} tickCount={tickCount} tick={{fontSize: 12, fill: "#868e96"}}/>
                    <Tooltip position={{y:10}} content={<CustomTooltip/>} cursor={{strokeDasharray: "3 3"}} isAnimationActive={false} />
                    <Line type="linear" dataKey="IVV" stroke="#228AE5" strokeWidth={2} dot={false} />
                </LineChart>
            </Container>
    )
}

export default StockGraph
