import React, { useState, useEffect } from "react";
import {
    Box,
    Flex,
    Heading,
    HStack,
    Stack,
    Text,
    Button,
    Image,
    Center,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Spinner,
    Table,
    Thead,
    Tr,
    Tbody,
    Th,
    Td,

} from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from "../../Footer/footer";
import Header from "../../Header/header";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import FoodBackgroundImage from '../../img4.jpg';

const Group = () => {

    const navigate = useNavigate();
    const params = useParams();
    const GroupName = params.groupname;
    const GroupId = params.groupnumber;
    const HotelId = params.hotelid
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const hotelid = JSON.parse(localStorage.getItem('hotelid'));
    const user = userInfo ? userInfo.User : null;
    const [amount, setAmount] = useState(0);
    const [cartItems, setCartItems] = useState([]);
    const toast = useToast();
    var hotelName = JSON.parse(localStorage.getItem('hotelname'));




    useEffect(() => {
        if (!user) navigate('/login');
    }, [user]);


    const GetAllItems = async () => {

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data } = await axios.post(
                `http://localhost:5000/api/v1/cart/hotel/${hotelid}`,
                {
                    userID: user._id
                },
                config
            );

            var amount1 = 0;
            for (let i = 0; i < data.items.length; i++) {
                amount1 += (data.items[i].price) * (data.items[i].quantity)
            }

            setAmount(amount1)
            setCartItems(data.items);


        } catch (error) {
            console.log(error)
        }
    };


    useEffect(() => {
        GetAllItems()
    }, []);

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [inputValue, setInputValue] = useState("");
    const [groups, setGroup] = useState([]);
    const [loading, setLoading] = useState(false);
    const [generatedNumber, setGeneratedNumber] = useState(null);
    const [flag, setFlag] = useState(0);
    const [display, setDisplay] = useState(0);
    const [price, setPrice] = useState(25);
    const [code, setCode] = useState('');
    const [iseditable, setIsEditable] = useState(false);
    const [count, setCount] = useState(5);

    const Payment = () => {
        console.log(HotelId, GroupId)
    }

    const Delete = () => {
        console.log(HotelId, GroupId)
    }


    return (
        <>
            <Header />
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
                p={20}
            >
                <Box width={"100%"} padding={30} align={'center'} justify={'center'}>
                    {
                        cartItems.length > 0 &&
                        <Text fontSize={"50px"} align={'center'} color={"black"} mb={3}>
                            {GroupName}
                        </Text>
                    }


                    {cartItems.length > 0 ? (
                        <Flex>
                            <Box w="80%">
                                {[1, 2, 3].length > 0 ? (
                                    <Box p={8} width="80%" bg="white" borderRadius="md" boxShadow="md">
                                        {/* <Text fontSize={"50px"} align={'center'} mb={6} color={"black"}>
                                            Orders
                                        </Text> */}
                                        <Table variant="striped">
                                            <Thead >
                                                <Tr >
                                                    <Th>Name</Th>
                                                    <Th>Items</Th>
                                                    <Th>Total</Th>
                                                    <Th>View</Th>
                                                    <Th>Edit</Th>
                                                    <Th>Delete</Th>
                                                </Tr>
                                            </Thead>
                                            <Tbody >
                                                {[1, 2, 3].map((order, ind) => (
                                                    <Tr key={ind}>
                                                        <Td color="black">Sushant</Td>
                                                        <Td color="black">Maggie</Td>
                                                        <Td color="black">25</Td>
                                                        <Td color="black">
                                                            <IconButton
                                                                color="blue.400"
                                                                size="lg"
                                                                fontSize="md"
                                                                icon={<ViewIcon />}
                                                                onClick={() => { onOpen(); setIsEditable(false) }}
                                                                aria-label="View"
                                                            />
                                                        </Td>
                                                        <Td color="black">
                                                            <IconButton
                                                                color="green"
                                                                size="lg"
                                                                fontSize="md"
                                                                icon={<EditIcon />}
                                                                onClick={() => { onOpen(); setIsEditable(true) }}
                                                                aria-label="Edit"
                                                                isDisabled={ind != 1}

                                                            />
                                                        </Td>
                                                        <Td color="black">
                                                            <IconButton
                                                                color="red.400"
                                                                size="lg"
                                                                fontSize="md"
                                                                icon={<DeleteIcon />}
                                                                aria-label="Delete"
                                                                isDisabled={ind != 1}
                                                            />
                                                        </Td>
                                                    </Tr>
                                                ))}
                                            </Tbody>
                                        </Table>

                                    </Box>
                                ) : (
                                    <Text p={8} fontSize="2xl" color="white" align="center">
                                        -- There are no orders from you. --
                                    </Text>
                                )}

                            </Box>
                            <Box w="30%" pl={5}>
                                <Flex
                                    direction="column"
                                    justify="space-between"
                                    mb={4}
                                    p={4}
                                    bg="white"
                                    boxShadow="md"
                                    borderRadius="md"
                                    height="350px"

                                >
                                    <Stack spacing="4" align="left">
                                        <Text fontSize="xl" color="black" fontWeight="semibold">Order Summary</Text>
                                        <HStack justify="space-between">
                                            <Text fontSize="lg" fontWeight="semibold" color="black">Subtotal:</Text>
                                            <Text fontSize="lg" color="black">$300</Text>
                                        </HStack>
                                        <HStack justify="space-between">
                                            <Text fontSize="lg" fontWeight="semibold" color="black">Shipping + Tax:</Text>
                                            <Text fontSize="lg" align="right" color="black">Calculate shipping</Text>
                                        </HStack>
                                        <HStack justify="space-between">
                                            <Text fontSize="lg" fontWeight="semibold" color="black">Coupon Code:</Text>
                                            <Text fontSize="lg" color="black">Add coupon code</Text>
                                        </HStack>
                                        <HStack justify="space-between">
                                            <Text fontSize="lg" fontWeight="semibold" color="black">Total:</Text>
                                            <Text fontSize="lg" color="black">{amount}Rs</Text>
                                        </HStack>
                                        <Box>
                                            <Button colorScheme="green" size="lg" fontSize="md" width={320} onClick={Payment}>
                                                Payment
                                            </Button>
                                        </Box>
                                        <Box>
                                            <Button size="lg" fontSize="md" width={320} onClick={Delete}>
                                                Delete Cart
                                            </Button>
                                        </Box>
                                    </Stack>
                                </Flex>
                            </Box>

                        </Flex>
                    ) : (

                        hotelid ?
                            <Text fontSize={"50px"} color="white" align={"center"}>-- Nothing is Added to the Cart --</Text> :
                            <Text fontSize={"50px"} color="white" align={"center"}>-- Please Select Hotel --</Text>

                    )}
                </Box>


                <Modal size="2xl" onClose={onClose} isOpen={isOpen} isCentered>
                    <ModalOverlay />
                    <ModalContent >
                        <ModalHeader align={"center"} fontSize={"40px"} color="black" fontWeight="bold" >Sushant</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Box maxW="140%" borderWidth='1px' borderRadius='lg' overflow='hidden' ml={10} color="white">
                                <Table variant="striped">
                                    <Thead>
                                        <Tr>

                                            <Th color="black">Item</Th>
                                            <Th color="black">Price</Th>
                                            <Th color="black">Qnt.</Th>
                                            <Th color="black">Inc</Th>
                                            <Th color="black">Dec</Th>
                                            <Th color="black">Total</Th>
                                            <Th color="black">Delete</Th>

                                        </Tr>
                                    </Thead>
                                    <Tbody >
                                        {[1, 2, 3].map((item) => (
                                            <Tr key={item._id}>
                                                <Td color="black">name</Td>
                                                <Td color="black">price</Td>
                                                <Td color="black">{count}</Td>
                                                <Td>
                                                    <Button size="sm" variant="outline" onClick={() => { setCount(count + 1) }} isDisabled={!iseditable}>
                                                        +
                                                    </Button>
                                                </Td>
                                                <Td>
                                                    <Button size="sm" variant="outline" onClick={() => { setCount(count - 1 > -1 ? count - 1 : 0) }} isDisabled={!iseditable}>
                                                        -
                                                    </Button>
                                                </Td>
                                                <Td color="black">25</Td>
                                                <Td color="black">
                                                    <IconButton
                                                        color="red.400"
                                                        size="lg"
                                                        fontSize="md"
                                                        icon={<DeleteIcon />}
                                                        aria-label="Delete"
                                                        isDisabled={!iseditable}
                                                    />
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </Box>
                        </ModalBody>
                        <ModalFooter>
                            <Button colorScheme="blue" mr={3}>
                                Close
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Flex>
            <Footer />
        </>
    );
};

export default Group;
