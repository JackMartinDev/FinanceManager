import { TooltipProps } from "recharts";
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

export default CustomTooltip
