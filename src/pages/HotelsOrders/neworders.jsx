import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Flex,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Text,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Image,
    Badge
} from '@chakra-ui/react';
import Header from '../../Header/header';
import Footer from '../../Footer/footer';
import Pagination from '../Pagination/pagination';
import axios from "axios"
import { FaTimes, FaCheck } from 'react-icons/fa';
import FoodBackgroundImage from '../../img4.jpg';
import { IconButton } from '@chakra-ui/react';
import { EditIcon, DeleteIcon, ViewIcon } from '@chakra-ui/icons';
import { useNavigate } from 'react-router-dom';
const NewOrders = () => {

    const navigate = useNavigate();
    const [orders, setOrders] = useState([]);
    const [allorders, setAllOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));

    const user = userInfo ? userInfo.User : null
    const path = window.location.pathname;
    // const orders = [
    //     { id: 1, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
    //     { id: 2, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
    //     { id: 3, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
    //     { id: 4, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
    //     { id: 5, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
    //     { id: 6, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
    //     { id: 7, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
    //     { id: 8, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
    //     { id: 9, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
    //     { id: 10, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
    //     { id: 11, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
    //     { id: 12, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
    //     { id: 13, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
    //     { id: 14, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
    //     { id: 15, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
    //     { id: 16, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
    //     { id: 17, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
    //     { id: 18, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
    //     { id: 19, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
    //     { id: 20, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
    //     { id: 21, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
    //     { id: 22, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
    //     { id: 23, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
    //     { id: 24, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
    //     { id: 25, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
    //     { id: 26, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
    //     { id: 27, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
    //     { id: 28, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
    //     { id: 29, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
    //     { id: 30, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
    // ];


    const handleAccept = async (orderId) => {
        const answer = window.confirm('Are you sure?');
        if (answer) {

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const { data, status } = await axios.post(
                    "http://localhost:5000/api/orders/acceptOrder",
                    {
                        "orderId": orderId,
                    },
                    config
                );

                if (status == 200) {
                    GetHotelOrders()
                }

            } catch (error) {
                console.log(error)
            }
        }
    };

    const handleReject = async (orderId) => {
        const answer = window.confirm('Are you sure?');
        if (answer) {
            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const { data, status } = await axios.post(
                    "http://localhost:5000/api/orders/rejectOrder",
                    {
                        "orderId": orderId,
                    },
                    config
                );

                if (status == 200) {
                    GetHotelOrders()
                }

            } catch (error) {
                console.log(error)
            }
        }
    };

    const GetHotelOrders = async () => {

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "Authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data, status } = await axios.post(
                `http://localhost:5000/api/orders/getOrderByHotel`,
                {
                    hotelId: user._id
                },
                config
            );

            console.log(data)

            if (status == 201) {
                setAllOrders(data.hotelOrders)
            }

        } catch (error) {
            console.log(error)

        }
    };



    useEffect(() => {
        GetHotelOrders()
    }, [])

    useEffect(() => {

        var neworders = [];
        allorders.forEach((order) => {
            if (order.orderAcceptOrDecline == "NULL") {
                neworders.push(order)
            }
        })

        setOrders(neworders)

    }, [allorders])


    const [currentPage, setCurrentPage] = useState(0);
    const ordersPerPage = 6;
    const totalPages = Math.ceil(orders?.length / ordersPerPage)

    const indexOfLastOrder = (currentPage + 1) * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders?.slice(indexOfFirstOrder, indexOfLastOrder);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const [personalOrder, setPersonalOrder] = useState(false);
    const toggleDetails = () => {
        setPersonalOrder(!personalOrder);
    };

    return (
        <>
            <Header />
            <Flex
                p={20}
                style={{
                    backgroundImage: `url(${FoodBackgroundImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
                minHeight='100vh'
                color='white'
                align='center'
                justify='center'
            // minH={'80vh'}
            // align={'left'}
            // justify={'center'}
            // bg="gray"
            // p={20}
            >
                {/* {orders.length > 0 ? ( */}
                <Box p={8} width="80%" bg="white" borderRadius="md" boxShadow="md">
                    <Box display={"flex"} align="center" justify="center" ml={"30%"}>
                        {
                            personalOrder &&
                            <Text fontSize={"50px"} align={'center'} mb={6} color={"black"}>
                                New Orders
                            </Text>
                        }
                        {
                            !personalOrder &&
                            <Text fontSize={"50px"} align={'center'} mb={6} color={"black"}>
                                Group New Orders
                            </Text>
                        }
                        <Button onClick={toggleDetails} colorScheme="blue" mt={6} ml={10} >
                            {personalOrder ? "Group New Orders" : "New Orders"}
                        </Button>
                    </Box>
                    {/* <Text fontSize="50px" align={'center'} mb={6} color={"black"}>
                            New Orders
                        </Text> */}
                    <Table variant="striped">
                        <Thead>
                            <Tr >
                                <Th>ID</Th>
                                <Th>UserName</Th>
                                {personalOrder && <Th>Items</Th>}
                                <Th>Amount</Th>
                                <Th>Status</Th>
                                <Th>Accept</Th>
                                <Th>Reject</Th>
                                {!personalOrder && <Th>View</Th>}
                            </Tr>
                            {/* <Tr>
                                    <Th>ID</Th>
                                    <Th>UserName</Th>
                                    <Th>Items</Th>
                                    <Th>Amount</Th>
                                    <Th>Status</Th>
                                    <Th>Accept</Th>
                                    <Th>Reject</Th>
                                </Tr> */}
                        </Thead>
                        {
                            personalOrder &&
                            <Tbody>
                                {currentOrders.map((order) => (
                                    <Tr key={order._id}>
                                        <Td color="black">{order?._id.slice(0, 10)}....</Td>
                                        <Td color="black">{order.userName}</Td>
                                        {/* <Td color="black">{order.items.join(', ')}</Td> */}
                                        <Td color="black" onClick={() => { setSelectedOrder(order?.cartItems); onOpen(); }} _hover={{ cursor: "pointer" }}>{order.cartItems[0].name}...</Td>
                                        <Td color="black">{order.amount}</Td>
                                        <Td color="red"><Box border={"1px solid pale"} borderRadius={"10px"} w={"80%"} p={3} color="black" bg="green.300">{order.orderStatus}</Box></Td>
                                        <Td>

                                            <Button
                                                colorScheme="green"
                                                onClick={() => handleAccept(order._id)}
                                            >
                                                {/* Accept */}
                                                <FaCheck />
                                            </Button>

                                        </Td>
                                        <Td>
                                            <Button
                                                ml={2}
                                                bg="red.200"
                                                onClick={() => handleReject(order._id)}
                                            >
                                                {/* Reject */}
                                                <FaTimes />
                                            </Button>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        }
                        {
                            !personalOrder &&
                            <Tbody>
                                {currentOrders.map((order) => (
                                    <Tr key={order._id}>
                                        <Td color="black">{order?._id.slice(0, 10)}....</Td>
                                        <Td color="black">{order.userName}</Td>
                                        {/* <Td color="black">{order.items.join(', ')}</Td> */}
                                        {/* <Td color="black" onClick={() => { setSelectedOrder(order?.cartItems); onOpen(); }} _hover={{ cursor: "pointer" }}>{order.cartItems[0].name}...</Td> */}
                                        <Td color="black">{order.amount}</Td>
                                        <Td color="red"><Box border={"1px solid pale"} borderRadius={"10px"} w={"80%"} p={3} color="black" bg="green.300">{order.orderStatus}</Box></Td>
                                        <Td>

                                            <Button
                                                colorScheme="green"
                                                onClick={() => handleAccept(order._id)}
                                            >
                                                {/* Accept */}
                                                <FaCheck />
                                            </Button>

                                        </Td>
                                        <Td>
                                            <Button
                                                ml={2}
                                                bg="red.200"
                                                onClick={() => handleReject(order._id)}
                                            >
                                                {/* Reject */}
                                                <FaTimes />
                                            </Button>
                                        </Td>
                                        <Td color="black">
                                            <IconButton
                                                color="blue.400"
                                                size="lg"
                                                fontSize="md"
                                                icon={<ViewIcon />}
                                                onClick={() => { navigate("/grouporder/123456/1233/pigeons") }}
                                                aria-label="View"
                                            />
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        }
                        {orders.length == 0 && personalOrder &&
                            <Tbody >
                                <Box color="black" >-- No Orders --</Box>
                            </Tbody>
                        }
                        {orders.length == 0 && !personalOrder &&
                            <Tbody >
                                <Box color="black"  >-- No Orders --</Box>
                            </Tbody>
                        }
                    </Table>


                    {(orders.length > 6) && personalOrder &&
                        <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                    }
                    {(orders.length > 6) && !personalOrder &&
                        <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                    }
                    {/* {orders.length > 6 && (
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                handlePageChange={handlePageChange}
                            />
                        )} */}

                </Box>
                {/* )
                : (
                <Text p={8} fontSize="30px" color="black" align="center">
                    -- No Orders --
                </Text>
                )} */}
            </Flex>


            <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent bg="green.300">
                    <ModalHeader align={"center"} fontSize={"40px"} color="white" fontWeight="bold" >{selectedOrder?.hotelName}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' ml={10} color="white">
                            <Table variant="striped">
                                <Thead >
                                    <Tr >

                                        <Th color="black">Item Name</Th>
                                        <Th color="black">Price</Th>
                                        <Th color="black">Quantity</Th>

                                    </Tr>
                                </Thead>
                                <Tbody >
                                    {selectedOrder.map((item) => (
                                        <Tr key={item._id}>
                                            <Td color="black">{item.name}</Td>
                                            <Td color="black">{item.price}</Td>
                                            <Td color="black">{item.quantity}</Td>
                                        </Tr>
                                    ))}
                                </Tbody>
                            </Table>
                        </Box>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => { onClose(); setSelectedOrder([]) }}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Footer />
        </>
    );
};

export default NewOrders;



