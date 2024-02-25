import { useToggle } from '@mantine/hooks';
import {
    Text,
    Paper,
    Group,
    PaperProps,
    Divider,
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
import LoginForm, { LoginFormValues } from './LoginForm';


const LoginFormWrapper = (props: PaperProps) => {
    const [type, toggle] = useToggle(['login', 'register']);
    const [buttonAvailableError, setButtonAvailableError] = useState<boolean>(false)
    const [loginError, setLoginError] = useState<boolean>(false)
    const [registrationError, setRegistrationError] = useState<boolean>(false)
    const navigate = useNavigate();
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
    const {login} = useAuth();


    const formSubmitHandler = async(formValues: RegistrationFormValues | LoginFormValues) => {
        setIsSubmitting(true);
        const endpoint = type === 'login' ? 'auth/login' : 'auth/register';
        const loginData = formValues;

        try {
            const response: AxiosResponse = await client.post(endpoint, loginData);
            login(response.data.user);
            console.log(response);
            navigate("/");
        } catch (error) {
            if(axios.isAxiosError(error)){
                switch(error.response?.status){
                    case 409:
                        setRegistrationError(true);
                        break;
                    case 401:
                        setLoginError(true);
                        break;
                    default:
                }
            } else {
                console.log(error);
                // Handle non-Axios errors
            }
        } finally{
            setIsSubmitting(false);
        }
    }

    const typeChangeHandler = () => {
        setButtonAvailableError(false);
        setLoginError(false);
        setRegistrationError(false);
        toggle();
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
                    : <RegistrationForm typeChangeHandler={typeChangeHandler} formSubmitHandler={formSubmitHandler} registrationError={registrationError}/>}

            </Paper>
        </Center>
    );
}

export default LoginFormWrapper
