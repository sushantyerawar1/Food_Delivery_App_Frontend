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
    Text
} from '@chakra-ui/react';
import Header from '../../Header/Header';
import Footer from '../../Footer/footer';
import Pagination from '../Pagination/pagination';


const UserOrders = () => {


    const orders = [
        { id: 1, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending', hotelName: "Tech cafe", },
        { id: 2, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Accepted', hotelName: "Tech cafe", },
        { id: 3, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected', hotelName: "Tech cafe", },
        { id: 4, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending', hotelName: "Tech cafe", },
        { id: 5, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Accepted', hotelName: "Tech cafe", },
        { id: 6, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected', hotelName: "Tech cafe", },
        { id: 7, name: 'John Doe', items: ['Item 1', 'Item 2'], status: 'Pending', hotelName: "Tech cafe", },
        { id: 8, name: 'Jane Doe', items: ['Item 3', 'Item 4'], status: 'Accepted', hotelName: "Tech cafe", },
        { id: 9, name: 'Jane Doe', items: ['Item 5', 'Item 6'], status: 'Rejected', hotelName: "Tech cafe", },
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
                align={'center'}
                justify={'center'}
                bg="gray"
                p={20}
            >
                {orders.length > 0 ? (
                    <Box p={8} width="80%" bg="white" borderRadius="md" boxShadow="md">
                        <Text fontSize={"50px"} align={'center'} mb={6} color={"black"}>
                            Orders
                        </Text>
                        <Table variant="striped">
                            <Thead >
                                <Tr >
                                    <Th>ID</Th>
                                    <Th>Name</Th>
                                    <Th>Items</Th>
                                    <Th>Hotel Name</Th>
                                    <Th>Status</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody >
                                {currentOrders.map((order) => (
                                    <Tr key={order.id}>
                                        <Td>{order.id}</Td>
                                        <Td>{order.name}</Td>
                                        <Td>{order.items.join(', ')}</Td>
                                        <Td >{order.hotelName}</Td>
                                        {/* <Td color={order.status == "Accepted" ? 'green' : (order.status == "Rejected") ? 'red' : "black"}>{order.status}</Td> */}
                                        <Td color="red"><Box border={"1px solid pale"} borderRadius={"10px"} w={"62%"} p={3} color="white" bg="green.500">{order.status}</Box></Td>
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

                        {orders.length > 6 && (
                            <Pagination
                                totalPages={totalPages}
                                currentPage={currentPage}
                                handlePageChange={handlePageChange}
                            />
                        )}
                    </Box>
                ) : (
                    <Text p={8} fontSize="2xl" color="gray.600" align="center">
                        -- There are no notifications for you. --
                    </Text>
                )}
            </Flex>
            <Footer />
            {/* <Header />
            <Flex
                minH={'80vh'}
                align={'left'}
                justify={'center'}
                bg="gray"
            >
                {orders.length > 0 ?
                    <Box width={"100%"} padding={30} align={'center'} justify={'center'}>

                        <Table variant="striped">
                            <Thead >
                                <Tr >
                                    <Th>ID</Th>
                                    <Th>Name</Th>
                                    <Th>Items</Th>
                                    <Th>Hotel Name</Th>
                                    <Th>Status</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody >
                                {currentOrders.map((order) => (
                                    <Tr key={order.id}>
                                        <Td>{order.id}</Td>
                                        <Td>{order.name}</Td>
                                        <Td>{order.items.join(', ')}</Td>
                                        <Td >{order.hotelName}</Td>
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
            </Flex>
            <Footer /> */}
        </>
    );
};

export default UserOrders;



