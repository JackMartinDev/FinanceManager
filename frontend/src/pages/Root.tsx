import { Outlet } from "react-router"
import Navbar from "../components/Navbar/Navbar"
import { AppShell, Burger, Group, LoadingOverlay, Title } from "@mantine/core"
import { IconHomeDollar } from "@tabler/icons-react"
import { useDisclosure } from "@mantine/hooks"
import { useIsFetching } from "@tanstack/react-query"

const RootPage = ():JSX.Element =>{
    const [opened, { toggle }] = useDisclosure();
    const isFetching = useIsFetching();
    return(
        <AppShell
            header={{height: 60}}   
            navbar={{width: 82, breakpoint: "sm"}}
            padding="xl"
        >
            <AppShell.Header>
                <Group h="100%" px="md">
                    <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
                    <IconHomeDollar size={30} />
                    <Title size={30}>Finance Manager</Title>
                </Group>
            </AppShell.Header>
            <AppShell.Navbar p="md">
                <Navbar/>

            </AppShell.Navbar>
            <AppShell.Main>
                <LoadingOverlay
                    visible={!!isFetching}
                    zIndex={1000}
                    overlayProps={{ radius: 'sm', blur: 2 }}
                    loaderProps={{ color: 'blue', type: 'bars' }}
                />

                <Outlet/>
            </AppShell.Main>

        </AppShell>
    )
}

export default RootPage
