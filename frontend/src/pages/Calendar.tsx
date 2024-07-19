import { Box, Title } from "@mantine/core"
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'

const CalendarPage = () => {
    return(
        <Box w={1000}>
            <Title mb={16}>Calendar</Title>
            For when bills are due etc.
            <FullCalendar
                plugins={[ dayGridPlugin, interactionPlugin ]}
                initialView="dayGridMonth"
                editable={true}
                events={[
                    { title: 'event 1', date: '2024-07-01' },
                    { title: 'event 2', date: '2024-07-02' }
                ]}
            />
        </Box>
    )
}

export default CalendarPage
