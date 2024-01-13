import react, { useState, useEffect } from "react"
import { Input, InputGroup, InputRightElement } from "@chakra-ui/input";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from 'react-router-dom';
import googleImage from '../assets/googleImage.jpg';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    Link,
    useColorModeValue,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    IconButton,
    Image
} from '@chakra-ui/react'
import Footer from "../Footer/footer";
import Header from "../Header/Header";
import { CalendarIcon } from "@chakra-ui/icons";
import { useGoogleLogin } from '@react-oauth/google';

const Login = () => {


    const [show, setShow] = useState(false);
    const [email, setEmail] = useState(null);
    const [forgotemail, setforgotEmail] = useState(null);
    const [password, setPassword] = useState(null);


    const { isOpen, onOpen, onClose } = useDisclosure();
    const handleClick = () => setShow(!show);
    const navigate = useNavigate();
    const toast = useToast();


    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null
    const path = window.location.pathname;


    useEffect(() => {
        if (user) navigate('/')
    }, [user])


    function handleGoogleLoginSuccess(tokenResponse) {
        signinGoogle(tokenResponse)
        // const accessToken = tokenResponse.access_token;
        // dispatch(signinGoogle(accessToken, navigate))
    }

    const login = useGoogleLogin({ onSuccess: handleGoogleLoginSuccess });


    const signinGoogle = async (tokenResponse) => {


        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    "emailId": email,
                    "password": password,
                    "googleAccessToken": tokenResponse.access_token
                },
                config
            );


            toast({
                title: "Login Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });


            localStorage.setItem("userInfo", JSON.stringify(data));
            setTimeout(() => { navigate("/") }, 200);


        } catch (error) {
            toast({
                title: "User not found",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    const submitHandler = async () => {

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

        if (password.length < 6) {
            toast({
                title: "password should be minimum 6 characters",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            return;
        }


        if (!email || !password) {
            toast({
                title: "Please Fill all the fields",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "http://localhost:5000/api/auth/login",
                {
                    "emailId": email,
                    "password": password,
                },
                config
            );


            console.log(data, "data")


            if (data.msg == "Please Verify Mail") {
                toast({
                    title: "Please Verify Mail",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
            } else {
                toast({
                    title: "Login Successful",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                localStorage.setItem("userInfo", JSON.stringify(data));
                setTimeout(() => { navigate("/") }, 500);
            }


        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

        }
    };

    const handleSubmit = async () => {
        if (!forgotemail) {
            toast({
                title: "Please Enter a Email ID",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

            return;
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "http://localhost:5000/api/auth/forgot-password",
                {
                    "emailId": forgotemail,
                },
                config
            );

            // toast({
            //     title: "Please Check Email",
            //     status: "success",
            //     duration: 5000,
            //     isClosable: true,
            //     position: "bottom",
            // });
            if (data) {
                setforgotEmail("")
            }

            setTimeout(() => { navigate("/verifymail") }, 200);



        } catch (error) {
            toast({
                title: "Error Occured!",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });

        }

    }


    return (
        <>
            <Header />
            <Flex
                minH={'80vh'}
                align={'center'}
                justify={'center'}
                // bg={useColorModeValue('gray.50', 'gray.800')}
                padding={10}
                bg="gray"
            >
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                    <Stack align={'center'}>
                        <Heading fontSize={'4xl'}>Sign in to your account</Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        // boxShadow={'lg'}
                        border="1px solid"
                        boxShadow="5px 10px 18px #888888"
                        p={8}
                    >
                        <Stack spacing={4}>
                            <FormControl id="email" isRequired>
                                <FormLabel>Email address</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    placeholder="Enter email"
                                    onChange={(e) => { setEmail(e.target.value) }} />
                            </FormControl>

                            <FormControl id="password" isRequired>
                                <FormLabel>Password</FormLabel>
                                <InputGroup size="md">
                                    <Input
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        type={show ? "text" : "password"}
                                        placeholder="Enter password"
                                    />
                                    <InputRightElement width="4.5rem">
                                        <Button h="1.75rem" size="sm" onClick={handleClick}>
                                            {show ? "Hide" : "Show"}
                                        </Button>
                                    </InputRightElement>
                                </InputGroup>
                            </FormControl>
                            <Stack spacing={2}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox>Remember me</Checkbox>
                                    <Button color={'blue.400'} onClick={onOpen} >Forgot password?</Button>
                                </Stack>

                                <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
                                    <ModalOverlay />
                                    <ModalContent h="300px" w="400px">
                                        <ModalHeader
                                            fontSize="30px"
                                            fontFamily="Work sans"
                                            d="flex"
                                            textAlign="center"
                                        >
                                            Forgot Password
                                        </ModalHeader>
                                        <ModalCloseButton />
                                        <ModalBody
                                            d="flex"
                                            flexDir="column"
                                            alignItems="center"
                                            justifyContent="space-between"
                                        >

                                            <FormControl id="email" isRequired>
                                                <FormLabel>Email address</FormLabel>
                                                <Input
                                                    type="email"
                                                    value={forgotemail}
                                                    placeholder="Enter email"
                                                    onChange={(e) => { setforgotEmail(e.target.value) }} />
                                            </FormControl>
                                            <Button
                                                onClick={handleSubmit}
                                                bg={'blue.400'}
                                                color={'white'}
                                                width="100%"
                                                marginTop={2}
                                                _hover={{
                                                    bg: 'blue.500',
                                                }}>
                                                Submit
                                            </Button>
                                            <ModalCloseButton />
                                            <Stack pt={4}>
                                                <Text align={'center'}>
                                                    Don't have an account?<Link href="/signup" color={'blue.400'}> SignUp</Link>
                                                </Text>
                                            </Stack>
                                        </ModalBody>
                                        {/* 
                                        <ModalFooter>
                                            <Button onClick={onClose}>Close</Button>
                                        </ModalFooter> */}
                                    </ModalContent>
                                </Modal>

                                <Button
                                    onClick={submitHandler}
                                    bg={'blue.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'blue.500',
                                    }}>
                                    Login
                                </Button>
                                <Button
                                    onClick={() => login()}
                                    bg={'green.200'}
                                    color={'black'}
                                    _hover={{
                                        bg: 'green.300',
                                    }}>
                                    <Image
                                        boxSize='15px'
                                        src={googleImage}
                                        alt='Google'
                                        width="10%"
                                        height="60%"
                                        margin="6px"
                                        paddingTop="1%"

                                    />
                                    Sign in with google
                                </Button>
                                <Stack pt={4}>
                                    <Text align={'center'}>
                                        Don't have an account?<Link href="/signup" color={'blue.400'}> SignUp</Link>
                                    </Text>
                                </Stack>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>

            <Footer />
        </>
    )
};

export default Login;