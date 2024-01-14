import React, { useState, useEffect } from 'react';
import {
    Box,
    Flex,
    Table,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
    Button
} from '@chakra-ui/react';

import Header from '../../Header/Header';
import Footer from '../../Footer/footer';
import Pagination from '../Pagination/pagination';
import axios from "axios"
const AcceptedOrders = () => {


    const orders = [
        { id: 1, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Delivered' },
        { id: 2, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Process...' },
        { id: 3, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Process...' },
        { id: 4, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Process...' },
        { id: 5, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Process...' },
        { id: 6, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Process...' },
        { id: 7, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Process...' },
        { id: 8, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Process...' },
        { id: 9, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Process...' },
        { id: 10, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Process...' },
        { id: 11, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Process...' },
        { id: 12, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Process...' },
        { id: 13, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Process...' },
        { id: 14, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Process...' },
        { id: 15, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Process...' },
        { id: 16, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Process...' },
        { id: 17, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Process...' },
        { id: 18, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Process...' },
        { id: 19, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Process...' },
        { id: 20, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Process...' },
        { id: 21, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Process...' },
        { id: 22, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Process...' },
        { id: 23, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Process...' },
        { id: 24, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Process...' },
        { id: 25, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Process...' },
        { id: 26, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Process...' },
        { id: 27, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Process...' },
        { id: 28, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Process...' },
        { id: 29, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Process...' },
        { id: 30, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Process...' },
        { id: 31, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Process...' },
        { id: 32, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Process...' },
        { id: 33, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Process...' },
        { id: 34, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Process...' },
        { id: 35, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Process...' },
    ];

    const UpdateStatus = async (orderId) => {

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data } = await axios.post(
                "http://localhost:5000/api/orders/deliveredOrder",
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
                minH={'80vh'}
                align={'left'}
                justify={'center'}
                bg="gray"
            >
                {orders.length > 0 ?
                    <Box p={20} width="70%">

                        <Table variant="striped">
                            <Thead>
                                <Tr >
                                    <Th>ID</Th>
                                    <Th>Name</Th>
                                    <Th>Items</Th>
                                    <Th>Status</Th>
                                    <Th>Status Update</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {currentOrders.map((order) => (
                                    <Tr key={order.id}>
                                        <Td color="black">{order.id}</Td>
                                        <Td color="black">{order.name}</Td>
                                        <Td color="black">{order.items.join(', ')}</Td>
                                        <Td color="blue">{order.status}</Td>
                                        <Td>
                                            <Button
                                                isDisabled={order.status == "Process..." ? false : true}
                                                colorScheme="green"
                                                onClick={() => UpdateStatus(order.id)}
                                            >
                                                Delivered Order
                                            </Button>
                                        </Td>
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                        {(orders.length > 6) &&
                            <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                        }

                    </Box> :
                    <Box p={20} width="70%" color="red" align="center" marginTop={40}>

                        -- No Orders Accepted--
                    </Box>

                }
            </Flex>
            <Footer />
        </>
    );
};

export default AcceptedOrders;



