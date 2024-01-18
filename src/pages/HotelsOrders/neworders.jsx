import React, { useState } from 'react';
import {
    Box,
    Flex,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
    Text
} from '@chakra-ui/react';
import Header from '../../Header/header';
import Footer from '../../Footer/footer';
import Pagination from '../Pagination/pagination';
import axios from "axios"
import { FaTimes, FaCheck } from 'react-icons/fa';
import FoodBackgroundImage from '../../foodbackgroundimage.jpg';

const NewOrders = () => {


    const orders = [
        { id: 1, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
        { id: 2, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
        { id: 3, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
        { id: 4, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
        { id: 5, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
        { id: 6, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
        { id: 7, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
        { id: 8, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
        { id: 9, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
        { id: 10, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
        { id: 11, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
        { id: 12, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
        { id: 13, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
        { id: 14, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
        { id: 15, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
        { id: 16, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
        { id: 17, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
        { id: 18, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
        { id: 19, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
        { id: 20, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
        { id: 21, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
        { id: 22, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
        { id: 23, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
        { id: 24, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
        { id: 25, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
        { id: 26, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
        { id: 27, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
        { id: 28, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
        { id: 29, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Pending' },
        { id: 30, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Pending' },
    ];


    const handleAccept = async (orderId) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "http://localhost:5000/api/orders/acceptOrder",
                {
                    "orderId": orderId,
                },
                config
            );

        } catch (error) {
            console.log(error)
        }
    };

    const handleReject = async (orderId) => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "http://localhost:5000/api/orders/rejectOrder",
                {
                    "orderId": orderId,
                },
                config
            );

        } catch (error) {
            console.log(error)
        }
    };

    const [currentPage, setCurrentPage] = useState(0);
    const ordersPerPage = 6;
    const totalPages = Math.ceil(orders.length / ordersPerPage)

    const indexOfLastOrder = (currentPage + 1) * ordersPerPage;
    const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
    const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
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
                {orders.length > 0 ? (
                    <Box p={8} width="80%" bg="white" borderRadius="md" boxShadow="md">
                        <Text fontSize="50px" align={'center'} mb={6} color={"black"}>
                            New Orders
                        </Text>
                        <Table variant="striped">
                            <Thead>
                                <Tr>
                                    <Th>ID</Th>
                                    <Th>Name</Th>
                                    <Th>Items</Th>
                                    <Th>Status</Th>
                                    <Th>Accept</Th>
                                    <Th>Reject</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {currentOrders.map((order) => (
                                    <Tr key={order.id}>
                                        <Td color="black">{order.id}</Td>
                                        <Td color="black">{order.name}</Td>
                                        <Td color="black">{order.items.join(', ')}</Td>
                                        <Td color="red"><Box border={"1px solid pale"} borderRadius={"10px"} w={"55%"} p={3} color="black" bg="green.300">{order.status}</Box></Td>
                                        <Td>

                                            <Button
                                                colorScheme="green"
                                                onClick={() => handleAccept(order.id)}
                                            >
                                                {/* Accept */}
                                                <FaCheck />
                                            </Button>

                                        </Td>
                                        <Td>
                                            <Button
                                                ml={2}
                                                bg="red.200"
                                                onClick={() => handleReject(order.id)}
                                            >
                                                {/* Reject */}
                                                <FaTimes />
                                            </Button>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>

                        {(orders.length > 6) &&
                            <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                        }

                    </Box>
                ) : (
                    <Box p={20} width="70%" color="red" align="center" marginTop={40}>
                        -- No Orders --
                    </Box>
                )}
            </Flex>
            <Footer />
        </>
    );
};

export default NewOrders;



