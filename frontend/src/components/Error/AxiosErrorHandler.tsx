import { ReactNode, useEffect } from "react";
import { useAuth } from "../../context/AuthContext"
import { client } from "../../utils/axios";
import { Button, Group, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

type Props = {
    children: ReactNode,
}

const AxiosErrorHandler = ( {children}: Props ) => {
    const { logout } = useAuth();
    const [opened, {open, close}] = useDisclosure();

    useEffect(() => {
        const responseInterceptor = client.interceptors.response.use(
            response => response, 
            async(error) => {
                if(error.response){
                    const status = error.response.status;
                    switch(status){
                        case 401:
                            console.log("Not authenticated");
                            open();
                            break;
                        default:
                            console.log("Something went wrong!");
                    }
                } else {
                    console.log("Error without response. Network etc")
                }

                return Promise.reject(error);
            })

        return () => {
            client.interceptors.response.eject(responseInterceptor)
        }
    }, [logout])


    const onCloseHandler = () => {
        close();
        logout();
    }
    return (
        <>
            <Modal opened={opened} onClose={onCloseHandler} title="Session has expired" centered>
                <div>Please log in again after being redirected to the login screen</div>
                <Group justify="right" mt="md">
                    <Button onClick={onCloseHandler} radius="xl" justify="right">
                        Ok
                    </Button>
                </Group>
            </Modal>
            {children}
        </>
    )
}

export default AxiosErrorHandler
