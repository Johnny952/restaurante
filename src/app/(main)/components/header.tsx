import React, { useState, useEffect } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Box,
    Container,
    IconButton,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    useScrollTrigger,
    Fade,
} from '@mui/material';
import Image from 'next/image';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import WorkIcon from '@mui/icons-material/Work';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import MenuIcon from '@mui/icons-material/Menu';
import { keyframes } from '@emotion/react';

const menuItems = [
    { name: '', icon: <HomeIcon /> },
    { name: 'Acerca', icon: <InfoIcon /> },
    { name: 'Servicios', icon: <BusinessCenterIcon /> },
    { name: 'Proyectos', icon: <WorkIcon /> },
    { name: 'Contacto', icon: <ContactMailIcon /> },
];

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(-20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const Header = () => {
    const [drawerOpen, setDrawerOpen] = useState(false);
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 100,
    });

    const getAppBarStyle = (scrolled: boolean) => ({
        backgroundColor: scrolled ? 'rgba(33, 150, 243, 0.95)' : 'transparent',
        boxShadow: scrolled ? 1 : 0,
        transition: 'background-color 0.3s ease, box-shadow 0.3s ease',
        backdropFilter: scrolled ? 'blur(10px)' : 'none',
    });

    const getTextStyle = (scrolled: boolean) => ({
        color: scrolled ? 'white' : 'white',
        transition: 'color 0.3s ease',
    });

    const toggleDrawer = (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
        if (event.type === 'keydown' && ((event as React.KeyboardEvent).key === 'Tab' || (event as React.KeyboardEvent).key === 'Shift')) {
            return;
        }
        setDrawerOpen(open);
    };

    const drawerContent = (
        <Box
            sx={{
                width: 250,
                height: '100%',
                background: 'linear-gradient(45deg, #2196f3 30%, #21CBF3 90%)',
            }}
            role="presentation"
            onClick={toggleDrawer(false)}
            onKeyDown={toggleDrawer(false)}
        >
            <List>
                {menuItems.map((item, index) => (
                    <Fade in={true} key={index} style={{ transitionDelay: `${index * 100}ms` }}>
                        <ListItem button key={item.name} sx={{
                            '&:hover': {
                                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            },
                        }}>
                            <ListItemIcon sx={{ color: 'white' }}>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.name} sx={{ color: 'white' }} />
                        </ListItem>
                    </Fade>
                ))}
            </List>
        </Box>
    );

    return (
        <AppBar position="fixed" sx={getAppBarStyle(trigger)}>
            <Container maxWidth="lg">
                <Toolbar disableGutters>
                    <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
                        <Image src="/logo.png" alt="Logo" width={40} height={40} style={{
                            animation: `${fadeIn} 0.5s ease-out`,
                        }} />
                        <Typography variant="h6" component="div" sx={{
                            ...getTextStyle(trigger),
                            ml: 2,
                            fontWeight: 700,
                            animation: `${fadeIn} 0.5s ease-out 0.2s both`,
                        }}>
                            VirtualTable Solutions
                        </Typography>
                    </Box>

                    <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
                        {menuItems.map((item, index) => (
                            <Button
                                key={item.name}
                                sx={{
                                    ...getTextStyle(trigger),
                                    mx: 1,
                                    textTransform: 'capitalize',
                                    position: 'relative',
                                    '&::after': {
                                        content: '""',
                                        position: 'absolute',
                                        width: '0%',
                                        height: '2px',
                                        bottom: 0,
                                        left: '50%',
                                        backgroundColor: 'white',
                                        transition: 'all 0.3s ease',
                                    },
                                    '&:hover::after': {
                                        width: '100%',
                                        left: '0%',
                                    },
                                    animation: `${fadeIn} 0.5s ease-out ${index * 100 + 300}ms both`,
                                }}
                                startIcon={item.icon}
                            >
                                {item.name}
                            </Button>
                        ))}
                    </Box>

                    <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="open drawer"
                            onClick={toggleDrawer(true)}
                            sx={getTextStyle(trigger)}
                        >
                            <MenuIcon />
                        </IconButton>
                    </Box>

                    <Button
                        variant="contained"
                        sx={{
                            ml: 2,
                            bgcolor: trigger ? 'white' : '#2196f3',
                            color: trigger ? '#2196f3' : 'white',
                            '&:hover': {
                                bgcolor: trigger ? 'rgba(255, 255, 255, 0.9)' : '#1976d2',
                                transform: 'scale(1.05)',
                            },
                            textTransform: 'capitalize',
                            borderRadius: '50px',
                            px: 3,
                            display: { xs: 'none', md: 'block' },
                            transition: 'all 0.3s ease',
                            animation: `${fadeIn} 0.5s ease-out 0.8s both`,
                        }}
                    >
                        Comenzar
                    </Button>
                </Toolbar>
            </Container>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
                sx={{
                    '& .MuiDrawer-paper': {
                        backgroundColor: 'transparent',
                        boxShadow: 'none',
                    },
                }}
            >
                {drawerContent}
            </Drawer>
        </AppBar>
    );
};

export default Header;