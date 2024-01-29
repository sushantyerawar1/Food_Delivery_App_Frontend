import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Text,
    Input,
    Textarea,
    Button,
    FormControl,
    FormLabel,
    useToast,
} from '@chakra-ui/react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import { useNavigate } from 'react-router-dom';
import FoodBackgroundImage from '../img2.jpg';

const ContactUs = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem('userInfo'));
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const toast = useToast();

    useEffect(() => {
        if (!user) navigate('/');
    }, [user]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,8}$/;

        if (!emailPattern.test(email)) {
            toast({
                title: 'Invalid Email',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            });
            return;
        }


        console.log('Form submitted:', name, email, message);

        setName('');
        setEmail('');
        setMessage('');

        toast({
            title: 'Message Sent',
            description: 'Your message has been successfully sent!',
            status: 'success',
            duration: 5000,
            isClosable: true,
            position: 'bottom',
        });
    };

    return (
        <>
            <Header />
            <Flex
                p={14}
                style={{
                    backgroundImage: `url(${FoodBackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                minHeight='100vh'
                color='white'
                align='center'
                justify='center'
            >
                <Box
                    maxW="600px"
                    mt={10}
                    mx="auto"
                    p={8}
                    rounded="lg"
                    width="100%"
                    bg="rgba(0, 0, 0, 0.8)"
                >
                    <Text mb="4" fontSize="4xl" align="center">
                        Contact Us
                    </Text>
                    <Text mb="6" fontSize="lg" align="center">
                        Have a question or feedback? Reach out to us!
                    </Text>
                    <form onSubmit={handleSubmit}>
                        <FormControl mb="4">
                            <FormLabel>Name</FormLabel>
                            <Input
                                type="text"
                                placeholder="Your Name"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mb="4">
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                placeholder="Your Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl mb="4">
                            <FormLabel>Message</FormLabel>
                            <Textarea
                                placeholder="Your Message"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                            />
                        </FormControl>
                        <Button type="submit" colorScheme="teal">
                            Submit
                        </Button>
                    </form>
                </Box>
            </Flex >
            <Footer />
        </>
    );
};

export default ContactUs;
