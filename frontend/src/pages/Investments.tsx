import StockGraph from "../components/StockGraph/StockGraph"
import StockTable from "../components/StockTable/StockTable"

const InvestmentsPage = () => {
    return(
        <>
            Investments
            <StockTable/>
            <StockGraph/>
        </>
    )
}

export default InvestmentsPage
