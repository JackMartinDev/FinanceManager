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
import axios, { AxiosResponse } from 'axios';
import { client } from '../../utils/axios';
import { useNavigate } from 'react-router';
import { useAuth } from '../../context/AuthContext';

const LoginForm = (props: PaperProps) => {
    const [type, toggle] = useToggle(['login', 'register']);
    const [buttonAvailableError, setButtonAvailableError] = useState<boolean>(false)
    const [loginError, setLoginError] = useState<boolean>(false)
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const {login} = useAuth();

    const form = useForm({
        initialValues: {
            email: '',
            username: '',
            password: '',
            terms: true,
        },
//Find a way to prevent to input validation to not show on login form, only registration
        validate: {
            email: (val) => (/^\S+@\S+\.\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(val) ? null : 'Your password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, a number and a symbol'),
        },
    });

    const formSubmitHandler = async() => {
        setIsSubmitting(true);
        //Have the functionality of the submit change based on type login or register
        console.log(form.values) 
        const endpoint = type === 'login' ? 'auth/login' : 'auth/register';
        const loginData = {email: form.values.email, password: form.values.password}

        try {
            const response: AxiosResponse = await client.post(endpoint, loginData);
            login(response.data.user);
            console.log(response);
            navigate("/dashboard");
        } catch (error) {
            if(axios.isAxiosError(error)){
                console.log(error.response?.status);
                console.log(error.response);
                setLoginError(true);
                // Handle error, e.g., show an error message in the UI
            } else {
                console.log(error);
                // Handle non-Axios errors
            }
        }
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
                {isSubmitting && <p>Submitting</p>}

                <Group grow mb="md" mt="md">
                    <GoogleButton onClick={()=>{setButtonAvailableError(true)}} radius="xl">Google</GoogleButton>
                    <TwitterButton onClick={()=>{setButtonAvailableError(true)}} radius="xl">Twitter</TwitterButton>
                </Group>

                {buttonAvailableError && <Text c="red" size='sm'>Sorry, Third party login is not currently available.</Text>}

                <Divider label="Or continue with email" labelPosition="center" my="lg" />

                <form onSubmit={form.onSubmit(formSubmitHandler)}>
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
                            label="Email"
                            placeholder="email@gmail.com"
                            value={form.values.email}
                            onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                            error={form.errors.email && 'Invalid email'}
                            radius="md"
                        />

                        <PasswordInput
                            required
                            label="Password"
                            placeholder="Your password"
                            value={form.values.password}
                            onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                            error={form.errors.password && 'Your password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, a number and a symbol.'}
                            radius="md"
                        />

                {loginError && <Text c="red" size='sm'>Email or password is incorrect</Text>}

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
                </form>
            </Paper>
        </Center>
    );
}

export default LoginForm
