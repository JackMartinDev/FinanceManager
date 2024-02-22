import { useToggle, upperFirst } from '@mantine/hooks';
import { useForm } from '@mantine/form';
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    PaperProps,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Stack,
    Center,
} from '@mantine/core';
import GoogleButton from '../buttons/GoogleButton';
import TwitterButton from '../buttons/TwitterButton';
import { useState } from 'react';
import { Form } from 'react-router-dom';

const LoginForm = (props: PaperProps) => {
    const [type, toggle] = useToggle(['login', 'register']);
    const [buttonAvailableError, setButtonAvailableError] = useState<boolean>(false)
    const form = useForm({
        initialValues: {
            email: '',
            username: '',
            password: '',
            terms: true,
        },

        validate: {
            email: (val) => (/^\S+@\S+\.\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(val) ? null : 'Your password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, a number and a symbol'),
        },
    });

    const formSubmitHandler = () => {
        //Have the functionality of the submit change based on type login or register
       console.log(type) 
    }

    const typeChangeHandler = () => {
        toggle();
        form.reset();
    }

    return (
        <Center>
            <Paper radius="md" p="xl" w={450} mt={200} withBorder {...props}>
                <Text size="lg" fw={500}>
                    Welcome to your Financial Manager, {type} with
                </Text>

                <Group grow mb="md" mt="md">
                    <GoogleButton onClick={()=>{setButtonAvailableError(true)}} radius="xl">Google</GoogleButton>
                    <TwitterButton onClick={()=>{setButtonAvailableError(true)}} radius="xl">Twitter</TwitterButton>
                </Group>

                {buttonAvailableError && <Text c="red" size='sm'>Sorry, Third party login is not currently available.</Text>}

                <Divider label="Or continue with email" labelPosition="center" my="lg" />

                <Form method='POST'>
                    <Stack>
                        {type === 'register' && (
                            <TextInput
                                label="Username"
                                placeholder="Username"
                                value={form.values.username}
                                onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
                                radius="md"
                            />
                        )}

                        <TextInput
                            required
                            name='email'
                            label="Email"
                            placeholder="email@gmail.com"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'}
                            radius="md"
                        />

                        <PasswordInput
                            required
                            name='password'
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Your password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, a number and a symbol.'}
                            radius="md"
                        />

                        {type === 'register' && (
                            <Checkbox
                                label="I accept terms and conditions"
                                checked={form.values.terms}
                                onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                            />
                        )}
                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Anchor component="button" type="button" c="dimmed" onClick={typeChangeHandler} size="xs">
                            {type === 'register'
                                ? 'Already have an account? Login'
                                : "Don't have an account? Register"}
                        </Anchor>
                        <Button type="submit" radius="xl">
                            {upperFirst(type)}
                        </Button>
                    </Group>
                </Form>
            </Paper>
        </Center>
    );
}

export default LoginForm
