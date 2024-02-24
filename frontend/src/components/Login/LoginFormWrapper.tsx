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

import RegistrationForm, {RegistrationFormValues} from './RegistrationForm';

type LoginFormValues = {
    email: string,
    password: string
}

const LoginForm = (props: {typeChangeHandler: () => void, formSubmitHandler: (formValues:LoginFormValues) => void, loginError: boolean}) =>{
        const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (val) => (/^\s*\S.*$/.test(val) ? null : 'Email field can not be empty'),
            password: (val) => (/^\s*\S.*$/.test(val) ? null : 'Password field can not be empty'),
        },
    });
    return(
                <form onSubmit={form.onSubmit((values) => props.formSubmitHandler(values))}>
                    <Stack>
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

                        {props.loginError && <Text c="red" size='sm'>Email or password is incorrect</Text>}

                    </Stack>

                    <Group justify="space-between" mt="xl">
                        <Anchor component="button" type="button" c="dimmed" onClick={props.typeChangeHandler} size="xs">
                                Already have an account? Login
                        </Anchor>
                        <Button type="submit" radius="xl">
                            {upperFirst("Login")}
                        </Button>
                    </Group>
                </form>
    );
}

const LoginFormWrapper = (props: PaperProps) => {
    const [type, toggle] = useToggle(['login', 'register']);
    const [buttonAvailableError, setButtonAvailableError] = useState<boolean>(false)
    const [loginError, setLoginError] = useState<boolean>(false)
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const {login} = useAuth();


    const formSubmitHandler = async(formValues: RegistrationFormValues | LoginFormValues) => {
        setIsSubmitting(true);
        //Have the functionality of the submit change based on type login or register
        console.log(formValues) 
        const endpoint = type === 'login' ? 'auth/login' : 'auth/register';
        const loginData = formValues;

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
        } finally{
            setIsSubmitting(false);
        }
    }

    const typeChangeHandler = () => {
        toggle();
        //form.reset();
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
                
                {type === "login" 
                    ? <LoginForm typeChangeHandler={typeChangeHandler} formSubmitHandler={formSubmitHandler} loginError={loginError}/> 
                    : <RegistrationForm typeChangeHandler={typeChangeHandler} formSubmitHandler={formSubmitHandler}/>}

            </Paper>
        </Center>
    );
}

export default LoginFormWrapper
