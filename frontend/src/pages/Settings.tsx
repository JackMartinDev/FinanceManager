import { Button, Checkbox, Divider, Paper, Switch, Text, TextInput, Title } from "@mantine/core"
import { moonIcon, sunIcon } from "../components/Settings/Icons";
import LanguageSelect from "../components/Settings/LanguageSelect";


const SettingsPage = () => {
    return(
        <>
            <Title mb={16}>Settings</Title>
            <Paper shadow="xs" radius="md" withBorder p="xl" px="md" py="md" mb={32}>
                <Text fw={500} size="lg" mb={16}> Change User Password</Text>
                <TextInput type="password" label="Current password" mb={16} w="30%" miw={300}/>
                <TextInput type="password" label="New password" mb={16} w="30%" miw={300}/>
                <TextInput type="password" label="Confirm new password" mb={16} w="30%" miw={300}/>
                <Button type="submit">Change Password</Button>
            </Paper>

            <Paper shadow="xs" radius="md" withBorder p="xl" px="md" py="md" mb={32}>
                <Text fw={500} size="lg" mb={16}> Change User Email</Text>
                <TextInput type="email" label="New email" mb={16} w="30%" miw={300}/>
                <Button type="submit">Change Email</Button>
            </Paper>

            <Paper shadow="xs" radius="md" withBorder p="xl" px="md" py="md" mb={200}>
                <Text fw={500} size="lg" >User Settings</Text>
                <Checkbox label="Receive Monthly Report Emails" mt="md" size="md"/>
                <Checkbox label="Setting 2" mt="md" size="md"/>
                <Checkbox label="Setting 3" mt="md" size="md"/>
                <Checkbox label="Setting 4" mt="md" size="md"/>
                <Checkbox label="Setting 5" mt="md" size="md"/>
                <Divider mt="lg"/>
                <Text fw={500} size="lg" mt="md" >Display Settings</Text>

                <LanguageSelect/>

                <Text size="sm" fw={500} mt={16}>Theme</Text>
                <Switch labelPosition="right" size="lg" color="dark.4" onLabel={sunIcon} offLabel={moonIcon} />
                <Button type="submit" mt={16}>Apply Changes</Button>
            </Paper >
        </>
    )
}

export default SettingsPage

