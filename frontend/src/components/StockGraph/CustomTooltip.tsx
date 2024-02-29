import { TooltipProps } from "recharts";

const formatDateStringTooltip = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = { year: 'numeric', month: 'short', day: '2-digit' };
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', options).replace(',','');
}

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div style={{ 
                backgroundColor: '#fff', 
                border: '1px solid #868e96', 
                padding: '6px',
            }}>
                <span>{`${payload[0].value} AUD  `}</span><span style={{color: "grey"}}>{formatDateStringTooltip(label)}</span>
            </div>
        );
    }
    return null;
};

export default CustomTooltip
