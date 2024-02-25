import { Outlet } from "react-router"
import Navbar from "../components/Navbar/Navbar"
import { AppShell, Burger, Group, Title } from "@mantine/core"
import { MantineLogo } from "@mantinex/mantine-logo"
import { IconHomeDollar } from "@tabler/icons-react"
import { useDisclosure } from "@mantine/hooks"

const RootPage = ():JSX.Element =>{
    const [opened, { toggle }] = useDisclosure();
    return(
        <AppShell
            header={{height: 60}}   
            navbar={{width: 82, breakpoint: "sm"}}
            padding="md"
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
            <AppShell.Main><Outlet/></AppShell.Main>
        </AppShell>
    )
}

export default RootPage
