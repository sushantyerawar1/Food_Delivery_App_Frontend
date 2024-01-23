import react, { useState, useEffect } from "react"
import { Flex, useToast, useColorModeValue, Image, Text, Box, Stack } from "@chakra-ui/react";
import axios from "axios";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import verifyemail from "../verifyemail.png"
import FoodBackgroundImage from '../foodbackgroundimage.jpg';
import { useParams } from 'react-router-dom';

const VerifiedMail = () => {

    const params = useParams()
    const email = params.id;

    return (
        <>
            <Header Flag={0} />
            <Flex
                style={{
                    backgroundImage: `url(${FoodBackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                minHeight='100vh'
                color='white'
                align='center'
                justify='center'
                width="100%"
            // minH={'80vh'}
            // align={'center'}
            // justify={'center'}
            // // bg={useColorModeValue('gray.50', 'gray.800')}
            // bg="gray"
            >
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6} >
                    <Stack align={'center'}>
                        <Text fontSize={"40px"} textAlign={"center"} color="white">Mail has send to {email} Please verify your email</Text>
                    </Stack>
                    <Image
                        src={verifyemail}
                        alt='verifyemail'
                        align={'center'}
                    />
                </Stack>
            </Flex>
            <Footer />
        </>
    )
};

export default VerifiedMail;