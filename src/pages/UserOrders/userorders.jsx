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
} from '@chakra-ui/react';
import Header from '../../Header/Header';
import Footer from '../../Footer/footer';
import Pagination from '../Pagination/pagination';


const UserOrders = () => {


    const orders = [
        { id: 1, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
        { id: 2, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Accepted' },
        { id: 3, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
        { id: 4, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
        { id: 5, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Accepted' },
        { id: 6, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
        { id: 7, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending' },
        { id: 8, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Accepted' },
        { id: 9, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected' },
    ];

    const handleAccept = (orderId) => {
        console.log(`Order ${orderId} accepted`);
    };

    const handleReject = (orderId) => {
        console.log(`Order ${orderId} rejected`);
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
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {currentOrders.map((order) => (
                                    <Tr key={order.id}>
                                        <Td>{order.id}</Td>
                                        <Td>{order.name}</Td>
                                        <Td>{order.items.join(', ')}</Td>
                                        <Td color={order.status == "Accepted" ? 'green' : (order.status == "Rejected") ? 'red' : "black"}>{order.status}</Td>
                                        <Td>
                                            <Flex justify={"space-between"}>
                                                <Button ml={2} colorScheme="red" onClick={() => handleReject(order.id)} isDisabled={(order.status == "Rejected") || (order.status == "Accepted") ? true : false}>
                                                    Reject
                                                </Button>
                                            </Flex>
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

                        -- No Orders --
                    </Box>

                }
            </Flex >
            <Footer />
        </>
    );
};

export default UserOrders;



