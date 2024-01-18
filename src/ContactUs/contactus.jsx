import { React, useState, useEffect } from 'react';
import {
    Box,
    Heading,
    Text,
    Input,
    Textarea,
    Button,
    FormControl,
    FormLabel,
    Flex
} from '@chakra-ui/react';
import Header from '../Header/header';
import Footer from '../Footer/footer';
import { useNavigate } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";
import FoodBackgroundImage from '../foodbackgroundimage.jpg';
import foodgroundimagecontactuspage from '../foodgroundimagecontactuspage.jpg';
import foodbackground from '../foodbackground.jpg';


const ContactUs = () => {


    const navigate = useNavigate()
    const user = JSON.parse(localStorage.getItem('userInfo'));

    useEffect(() => {
        if (!user) navigate('/')
    }, [user])



    const [name, setName] = useState('');
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const toast = useToast();


    const handleSubmit = (e) => {
        e.preventDefault();
        const pattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,8}$/

        if (!pattern.test(email)) {
            toast({
                title: "Invalid Email",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            return;
        }

        console.log(name, email, message)
    };

    return (
        <>
            <Header />
            <Flex p={14} style={{
                backgroundImage: `url(${FoodBackgroundImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
                color: 'white',
            }}>

                <Box
                    maxW="600px"
                    mt={10}
                    mx="auto"
                    my="10"
                    p={14}
                    // style={{
                    //     backgroundImage: `url(${FoodBackgroundImage})`,
                    //     backgroundSize: 'cover',
                    //     backgroundPosition: 'center',
                    //     minHeight: '100vh',
                    //     color: 'white',
                    // }}
                    rounded={"lg"}
                    width={"100%"}
                >
                    <Text mb="4" fontSize={"50px"} align={"center"}>Contact Us</Text>
                    <Text mb="6" fontSize={"20px"} align={"center"}>Have a question or feedback? Reach out to us!</Text>
                    <form onSubmit={handleSubmit}>
                        <FormControl mb="4">
                            <FormLabel>Name</FormLabel>
                            <Input type="text" placeholder="Your Name" onChange={(e) => { setName(e.target.value) }} />
                        </FormControl>
                        <FormControl mb="4">
                            <FormLabel>Email</FormLabel>
                            <Input type="email" placeholder="Your Email" onChange={(e) => { setEmail(e.target.value) }} />
                        </FormControl>
                        <FormControl mb="4">
                            <FormLabel>Message</FormLabel>
                            <Textarea placeholder="Your Message" onChange={(e) => { setMessage(e.target.value) }} />
                        </FormControl>
                        <Button type="submit" colorScheme="teal" >
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