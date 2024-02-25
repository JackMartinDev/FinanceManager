import { CartesianGrid, Line, LineChart, Tooltip, TooltipProps, XAxis, YAxis } from "recharts";
import testData from "./tempData.json"
import { LineChart as MantineLineChart } from '@mantine/charts';

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
    const parsedData = testData.map(data => ({date: formatDateStringTooltip(data.date), IVV: data.close}))
    const closeValues = parsedData.map(item => item.IVV);

    const minClose = Math.min(...closeValues);
    const maxClose = Math.max(...closeValues);

    const minDomain = Math.floor(minClose / 5) * 5;
    const maxDomain = Math.ceil(maxClose / 5) * 5;

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
        <LineChart width={800} height={300} margin={{right:20}} data={parsedData}>
            <CartesianGrid opacity={0.3} vertical={false}/>
            <XAxis dataKey="date" tickFormatter={formatDateStringAxis} interval={40} tick={{fontSize: 12, fill: "#868e96"}} />
            <YAxis domain={[minDomain, maxDomain]} tickCount={tickCount} tick={{fontSize: 12, fill: "#868e96"}}/>
            <Tooltip position={{y:10}} content={<CustomTooltip/>} cursor={{strokeDasharray: "3 3"}} isAnimationActive={false} />
            <Line type="linear" dataKey="IVV" stroke="#228AE5" strokeWidth={2} dot={false} />
        </LineChart>
    )
}

export default StockGraph
