import { CartesianGrid, Line, LineChart, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import testData from "./tempData.json"
import { useState } from "react";
import { ActionIcon, Anchor, Box, Burger, Container, Group } from "@mantine/core";
import classes from "./StockGraph.module.css"

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

const StockGraph = () => {
    const currentDate = new Date();

    const [active, setActive] = useState(3);

    const peroidOptions = ["1M", "3M", "6M", "1Y"];


  const mainItems = peroidOptions.map((item, index) => (
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

    switch(active){
        case 0:
            currentDate.setMonth(currentDate.getMonth() -1);
            break;
        case 1:
            currentDate.setMonth(currentDate.getMonth() -3);
            break;
        case 2:
            currentDate.setMonth(currentDate.getMonth() -6);
            break;
        case 3:
            currentDate.setMonth(currentDate.getMonth() -12);
            break;
        default:
            currentDate.setMonth(currentDate.getMonth() -12);
    }

    const comparisonDate = currentDate;

    const parsedData = testData.map(data => ({date: formatDateStringTooltip(data.date), IVV: data.close}))

    const filteredData = parsedData.filter(item => {
        const itemDate = new Date(item.date);
        return itemDate >= comparisonDate;
    });

    const closeValues = filteredData.map(item => item.IVV);

    const minClose = Math.min(...closeValues);
    const maxClose = Math.max(...closeValues);

    const minDomain = Math.floor(minClose / 5) * 5;
    const maxDomain = Math.ceil(maxClose / 5) * 5;

    //Have these values also determined by the selected peroid state. 
    const tickCount = (maxDomain - minDomain) / 5 + 1;

    const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
        if (active && payload && payload.length) {
            return (
                <div style={{ 
                    backgroundColor: '#fff', 
                    border: '1px solid #868e96', 
                    padding: '6px',
                }}>
                    <span>{`${payload[0].value} AUD  `}</span><span style={{color: "grey"}}>{label}</span>
                </div>
            );
        }

        return null;
    };

    return(
        <>
            <Container className={classes.inner}>
                <Box className={classes.links}>
                    <Group gap={0} justify="flex-end" className={classes.mainLinks}>
                        {mainItems}
                    </Group>
                </Box>
            </Container>

            <LineChart width={800} height={300} margin={{right:20}} data={filteredData}>
                <CartesianGrid opacity={0.3} vertical={false}/>
                <XAxis dataKey="date" tickFormatter={formatDateStringAxis} interval={40} tick={{fontSize: 12, fill: "#868e96"}} />
                <YAxis domain={[minDomain, maxDomain]} tickCount={tickCount} tick={{fontSize: 12, fill: "#868e96"}}/>
                <Tooltip position={{y:10}} content={<CustomTooltip/>} cursor={{strokeDasharray: "3 3"}} isAnimationActive={false} />
                <Line type="linear" dataKey="IVV" stroke="#228AE5" strokeWidth={2} dot={false} />
            </LineChart>
        </>
    )
}

export default StockGraph
