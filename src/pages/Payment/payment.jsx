// src/App.js
import React, { useState } from 'react';
import {
    Box,
    FormControl,
    FormLabel,
    Input,
    Button,
    Stack,
    Flex,
    useColorModeValue,
    Center,
    Heading
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import Header from '../../Header/Header';
import Footer from '../../Footer/footer';

const Payment = () => {


    const params = useParams()
    const [cardNumber, setCardNumber] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [cvc, setCVC] = useState('');
    const [amount, setAmount] = useState(params.id);
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");


    const handlePayment = () => {
        alert('Payment successful!');
    };

    return (
        <>
            <Header />
            <Flex
                minH={'80vh'}
                align={'center'}
                justify={'center'}
                bg={useColorModeValue('gray.50', 'gray.800')}
                padding={10}
            >
                <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>

                    <Box
                        width={"150%"}
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        border="1px solid"
                        boxShadow="5px 10px 18px #888888"
                        p={5}
                    >
                        <Heading as="h2" size="xl" align={'center'} color={"black.300"} mb={3}>
                            Shipping Information
                        </Heading>
                        <FormControl id="personName" isRequired>
                            <FormLabel>Person Name</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter user name"
                                value={userName}
                                onChange={(e) => setUserName(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="emailId" isRequired>
                            <FormLabel>Email Id</FormLabel>
                            <Input
                                type="email"
                                placeholder="Enter email id"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </FormControl>
                        <FormControl id="cardNumber" isRequired>
                            <FormLabel>Card Number</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter card number"
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                            />
                        </FormControl>

                        <FormControl id="expiryDate" isRequired>
                            <FormLabel>Expiry Date</FormLabel>
                            <Input
                                type="text"
                                placeholder="MM/YY"
                                value={expiryDate}
                                onChange={(e) => setExpiryDate(e.target.value)}
                            />
                        </FormControl>

                        <FormControl id="cvc" isRequired>
                            <FormLabel>CVC</FormLabel>
                            <Input
                                type="text"
                                placeholder="Enter CVC"
                                value={cvc}
                                onChange={(e) => setCVC(e.target.value)}
                            />
                        </FormControl>

                        <FormControl id="amount" >
                            <FormLabel>Total Amount</FormLabel>
                            <Input
                                disabled
                                type="number"
                                placeholder="Enter amount"
                                value={amount}
                                onChange={(e) => setAmount(e.target.value)}
                            />
                        </FormControl>


                        <Center >
                            <Button colorScheme="green" size="lg" fontSize="md" mt="4" width={300} onClick={handlePayment}>
                                Place Order
                            </Button>

                        </Center>

                    </Box>
                </Stack>
            </Flex >
            <Footer />
        </>


    );
}

export default Payment;




