import react, { useState, useEffect } from "react"
import { Flex, useToast, useColorModeValue, Image, Text } from "@chakra-ui/react";
import axios from "axios";
import Header from "../Header/header";
import Footer from "../Footer/footer";
import verifyemail from "../verifyemail.png"


const VerifiedMail = () => {


    return (
        <>
            <Header Flag={0} />
            <Flex
                minH={'80vh'}
                align={'center'}
                justify={'center'}
                // bg={useColorModeValue('gray.50', 'gray.800')}
                bg="gray"
            >
                <div>
                    <Text fontSize={"50px"} textAlign={"center"} color="white">Verify Your Email</Text>
                    <Image
                        src={verifyemail}
                        alt='verifyemail'
                        align={'center'}
                    />
                </div>
            </Flex>
            <Footer />
        </>
    )
};

export default VerifiedMail;