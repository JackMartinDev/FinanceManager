import { Title, Text, Button, Container, Group } from '@mantine/core';
import classes from './NotFoundError.module.css';
import { Link } from 'react-router-dom';

export default function NotFoundError() {
    return (
        <Container className={classes.root}>
            <div className={classes.label}>404</div>
            <Title size={40} className={classes.title}>You have found a secret place.</Title>
            <Text c="dimmed" size="lg" ta="center" className={classes.description}>
                Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
                been moved to another URL.
            </Text>
            <Group justify="center">
                <Link to={"/dashboard"} >
                    <Button variant="subtle" size="md">
                        Take me back to home page
                    </Button>
                </Link>
            </Group>
        </Container>
    );
}
