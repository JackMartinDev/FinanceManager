import { Anchor, Button, Checkbox, Group, Loader, PasswordInput, Stack, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { upperFirst } from "@mantine/hooks";

export type RegistrationFormValues = {
    email: string,
    username:string,
    password:string,
    terms: boolean,
}

const RegistrationForm = (props: {typeChangeHandler: ()=>void, formSubmitHandler: (formValues: RegistrationFormValues)=>void, registrationError:boolean, isSubmitting: boolean}) => {
    const form = useForm<RegistrationFormValues>({
        initialValues: {
            email: '',
            username: '',
            password: '',
            terms: true,
        },
        validate: {
            username: (val) => (/^.{2,16}$/.test(val) ? null : "Username must be between 2 and 16 characters long"),
            email: (val) => (/^\S+@\S+\.\S+$/.test(val) ? null : 'Invalid email'),
            password: (val) => (/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(val) ? null : 'Your password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, a number and a symbol'),
        },
    });

    return(
        <form onSubmit={form.onSubmit((values) => props.formSubmitHandler(values))}>
            <Stack>
                <TextInput
                    label="Username"
                    placeholder="Username"
                    value={form.values.username}
                    onChange={(event) => form.setFieldValue('username', event.currentTarget.value)}
                    error={form.errors.username && "Username must be between 2 and 16 characters long"}
                    radius="md"
                />

                <TextInput
                    label="Email"
                    placeholder="email@gmail.com"
                    value={form.values.email}
                    onChange={(event) => form.setFieldValue('email', event.currentTarget.value)}
                    error={props.registrationError ? "Email is already in use" : form.errors.email && 'Invalid email'}
                    radius="md"
                />

                <PasswordInput
                    label="Password"
                    placeholder="Your password"
                    value={form.values.password}
                    onChange={(event) => form.setFieldValue('password', event.currentTarget.value)}
                    error={form.errors.password && 'Your password must be at least 8 characters long and include at least one lowercase letter, one uppercase letter, a number and a symbol.'}
                    radius="md"
                />

                <Checkbox
                    label="I accept terms and conditions"
                    checked={form.values.terms}
                    onChange={(event) => form.setFieldValue('terms', event.currentTarget.checked)}
                />

            </Stack>

            <Group justify="space-between" mt="xl">
                <Anchor component="button" type="button" c="dimmed" onClick={props.typeChangeHandler} size="xs">
                    Already have an account? Login
                </Anchor>
                <Button type="submit" radius="xl">
                    {props.isSubmitting ? <Loader type="dots" color="rgb(255, 255, 255)"/> : upperFirst("Register")}
                </Button>
            </Group>
        </form>
    )
}

export default RegistrationForm
