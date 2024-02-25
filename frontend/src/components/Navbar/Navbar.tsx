import { useState } from 'react';
import { Center, Tooltip, UnstyledButton, Stack, rem } from '@mantine/core';
import {
    IconHome2,
    IconGauge,
    IconDeviceDesktopAnalytics,
    IconFingerprint,
    IconCalendarStats,
    IconUser,
    IconSettings,
    IconLogout,
    IconSwitchHorizontal,
} from '@tabler/icons-react';
import classes from './Navbar.module.css';
import { client } from '../../utils/axios';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router';

interface NavbarLinkProps {
    icon: typeof IconHome2;
    label: string;
    active?: boolean;
    onClick?(): void;
}

const NavbarLink = ({ icon: Icon, label, active, onClick }: NavbarLinkProps) => {
    return (
        <Tooltip label={label} position="right" transitionProps={{ duration: 0 }}>
            <UnstyledButton onClick={onClick} className={classes.link} data-active={active || undefined}>
                <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
            </UnstyledButton>
        </Tooltip>
    );
}

const mockdata = [
    { icon: IconHome2, label: 'Home', to: '/home' },
    { icon: IconGauge, label: 'Dashboard', to: '/dashboard' },
    { icon: IconDeviceDesktopAnalytics, label: 'Analytics', to: '/analytics/' },
    { icon: IconCalendarStats, label: 'Releases', to: '/releases' },
    { icon: IconUser, label: 'Account', to: '/account' },
    { icon: IconFingerprint, label: 'Security', to: '/security' },
    { icon: IconSettings, label: 'Settings', to: '/settings' },
];

const Navbar = () => {
    const [active, setActive] = useState(1);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const links = mockdata.map((link, index) => (
        <NavbarLink
            {...link}
            key={link.label}
            active={index === active}
            onClick={() => navigationHandler(index, link.to)}
        />
    ));

    const navigationHandler = (index: number, to: string) => {
        setActive(index);
        navigate(to);
    }

    const test = async() =>{
        try {
            const res = await client.get("test");
            console.log(res)
        } catch (error) {
           console.log(error); 
        }
    }

    const logoutHandler = async() => {
        try {
            const response = await client.get("auth/logout")
            logout();
            navigate("/");
        } catch (error) {
            console.log("Something went wrong during logout")        
        }
    }

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                <Stack justify="center" gap={0}>
                    {links}
                </Stack>
            </div>

            <Stack justify="center" gap={0}>
                <NavbarLink icon={IconSwitchHorizontal} label="Change account" onClick={test}/>
                <NavbarLink icon={IconLogout} onClick={logoutHandler} label="Logout" />
            </Stack>
        </nav>
    );
}

export default Navbar
