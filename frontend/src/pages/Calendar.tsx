import { Box, Title } from "@mantine/core"
import { Calendar } from 'rsuite';
import 'rsuite/Calendar/styles/index.css';

const CalendarPage = () => {
    return(
        <Box w={1000}>
            <Title mb={16}>Calendar</Title>
            For when bills are due etc.
            <Calendar bordered/>
        </Box>
    )
}

export default CalendarPage
