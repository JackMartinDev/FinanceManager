import { Button, Checkbox, Combobox, Divider, Group, Image, Input, InputBase, Paper, Switch, Text, TextInput, Title, rem, useCombobox, useMantineTheme } from "@mantine/core"
import { IconMoonStars, IconSun } from "@tabler/icons-react";
import { useState } from "react";

interface Item {
    icon: string;
    value: string;
    label: string;
}

const languages: Item[] = [
    { icon: '/icons/GB.png', value: 'en', label: 'English' },
    { icon: '/icons/JP.png', value: 'jp', label: '日本語' },
];

function SelectOption({ icon, label }: Item) {
    return (
        <Group>
            <Image h="20" w="auto" src={icon}/>
            <div>
                <Text fz="sm" fw={400}>
                    {label}
                </Text>
            </div>
        </Group>
    );
}
const SettingsPage = () => {
    const [value, setValue] = useState<string | null>(null);
    const selectedOption = languages.find((item) => item.value === value);

    const options = languages.map((item) => (
        <Combobox.Option value={item.value} key={item.value}>
            <SelectOption {...item} />
        </Combobox.Option>
    ));

    const combobox = useCombobox({
        onDropdownClose: () => combobox.resetSelectedOption(),
    });

    const theme = useMantineTheme();

    const sunIcon = (
        <IconSun
            style={{ width: rem(16), height: rem(16) }}
            stroke={2.5}
            color={theme.colors.yellow[4]}
        />
    );

    const moonIcon = (
        <IconMoonStars
            style={{ width: rem(16), height: rem(16) }}
            stroke={2.5}
            color={theme.colors.blue[6]}
        />
    );
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

                <Combobox
                    store={combobox}
                    withinPortal={false}
                    onOptionSubmit={(val) => {
                        setValue(val);
                        combobox.closeDropdown();
                    }}
                >
                    <Combobox.Target>
                        <InputBase
                            component="button"
                            label="Language"
                            type="button"
                            pointer
                            rightSection={<Combobox.Chevron />}
                            onClick={() => combobox.toggleDropdown()}
                            rightSectionPointerEvents="none"
                            multiline
                            w="30%"
                            miw={300}
                        >
                            {selectedOption ? (
                                <SelectOption {...selectedOption} />
                            ) : (
                                    <Input.Placeholder>Select Language</Input.Placeholder>
                                )}
                        </InputBase>
                    </Combobox.Target>

                    <Combobox.Dropdown>
                        <Combobox.Options>{options}</Combobox.Options>
                    </Combobox.Dropdown>
                </Combobox>
                <Text size="sm" fw={500} mt={16}>Theme</Text>
                <Switch labelPosition="right" size="md" color="dark.4" onLabel={sunIcon} offLabel={moonIcon} />

                <Button type="submit" mt={16}>Apply Changes</Button>

            </Paper >

        </>
    )
}

export default SettingsPage

