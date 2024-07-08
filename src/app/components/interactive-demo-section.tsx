import React, { useState } from 'react';
import { Box, Container, Typography, Paper, Tabs, Tab, useTheme } from '@mui/material';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

const MotionBox = motion(Box);

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`demo-tabpanel-${index}`}
            aria-labelledby={`demo-tab-${index}`}
            {...other}
        >
            {value === index && (
                <MotionBox
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    sx={{ p: 3 }}
                >
                    {children}
                </MotionBox>
            )}
        </div>
    );
}

const demoContent = [
    {
        label: 'Menú Digital',
        image: '/menu-demo.png',
        description: 'Explora nuestros menús digitales interactivos y personalizables.'
    },
    {
        label: 'Pedidos en Línea',
        image: '/order-demo.png',
        description: 'Procesa pedidos en línea de manera eficiente y sin complicaciones.'
    },
    {
        label: 'Análisis',
        image: '/analytics-demo.png',
        description: 'Obtén insights valiosos con nuestras herramientas de análisis en tiempo real.'
    },
];

const InteractiveDemo: React.FC = () => {
    const [value, setValue] = useState(0);
    const theme = useTheme();

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    return (
        <Box sx={{ py: 8, backgroundColor: 'background.paper' }}>
            <Container maxWidth="lg">
                <Typography variant="h4" component="h4" align="center" gutterBottom sx={{
                    color: 'primary.main',
                    fontWeight: 700,
                    mb: 6
                }}>
                    Explora Nuestras Funcionalidades
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', mt: 4 }}>
                    <MotionBox
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        sx={{ width: { xs: '100%', md: '50%' }, mb: { xs: 4, md: 0 } }}
                    >
                        <Paper
                            elevation={6}
                            sx={{
                                position: 'relative',
                                width: '280px',
                                height: '560px',
                                margin: 'auto',
                                borderRadius: '36px',
                                overflow: 'hidden',
                                backgroundColor: 'background.paper',
                                '&::before': {
                                    content: '""',
                                    position: 'absolute',
                                    top: '0',
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '150px',
                                    height: '20px',
                                    backgroundColor: '#000',
                                    borderBottomLeftRadius: '10px',
                                    borderBottomRightRadius: '10px',
                                    zIndex: 2,
                                }
                            }}
                        >
                            <Box sx={{ position: 'relative', width: '100%', height: '100%' }}>
                                <Image
                                    src={demoContent[value].image}
                                    alt={demoContent[value].label}
                                    style={{ objectFit: "cover" }}
                                    layout="fill"
                                />
                            </Box>
                        </Paper>
                    </MotionBox>
                    <MotionBox
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        sx={{ width: { xs: '100%', md: '50%' } }}
                    >
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            aria-label="demo tabs"
                            centered
                            sx={{
                                '& .MuiTabs-indicator': {
                                    backgroundColor: 'primary.main',
                                },
                                '& .MuiTab-root': {
                                    color: 'text.secondary',
                                    '&.Mui-selected': {
                                        color: 'primary.main',
                                    },
                                },
                            }}
                        >
                            {demoContent.map((content, index) => (
                                <Tab label={content.label} key={index} />
                            ))}
                        </Tabs>
                        {demoContent.map((content, index) => (
                            <TabPanel value={value} index={index} key={index}>
                                <Typography variant="body1" sx={{ color: 'text.secondary' }}>
                                    {content.description}
                                </Typography>
                            </TabPanel>
                        ))}
                    </MotionBox>
                </Box>
            </Container>
        </Box>
    );
};

export default InteractiveDemo;