import { Anchor, Button, Group, Loader, PasswordInput, Stack, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst } from "@mantine/hooks";

export type LoginFormValues = {
    email: string,
    password: string
}

const LoginForm = (props: {typeChangeHandler: () => void, formSubmitHandler: (formValues:LoginFormValues) => void, loginError: boolean, isSubmitting: boolean}) =>{
    const form = useForm({
        initialValues: {
            email: '',
            password: '',
        },
        validate: {
            email: (val) => (/^\s*\S.*$/.test(val) ? null : 'Email field must not be empty'),
            password: (val) => (/^\s*\S.*$/.test(val) ? null : 'Password field must not be empty'),
        },
    });

    return(
        <form onSubmit={form.onSubmit((values) => props.formSubmitHandler(values))}>
            <Stack>
                <TextInput
                    label="Email"
                    placeholder="email@gmail.com"
                    value={form.values.email}
                    onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                    error={form.errors.email && 'Email field must not be empty'}
                    radius="md"
                />

                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    value={form.values.password}
                    onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                    error={form.errors.password && 'Password field must not be empty'}
                    radius="md"
                />

                {props.loginError && <Text c="red" size='md'>Email or password is incorrect</Text>}

            </Stack>

            <Group justify="space-between" mt="xl">
                <Anchor component="button" type="button" c="dimmed" onClick={props.typeChangeHandler} size="xs">
                  Don't have an account? Register 
                </Anchor>
                <Button type="submit" radius="xl">
                    {props.isSubmitting ? <Loader type="dots" color="rgb(255, 255, 255)"/> : upperFirst("Login")}
                </Button>
            </Group>
        </form>
    );
}

export default LoginForm
