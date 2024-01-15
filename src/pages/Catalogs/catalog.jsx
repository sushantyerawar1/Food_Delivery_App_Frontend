import React, { useState, useEffect } from 'react';
import {
    Box,
    Heading,
    Grid,
    GridItem,
    Text,
    Button,
    Flex,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Image,
    InputGroup,
    InputLeftElement,
    useColorModeValue,
    Badge,
    // StarIcon
} from '@chakra-ui/react';
import { SearchIcon } from "@chakra-ui/icons";
import axios from "axios";
import Header from '../../Header/Header';
import Footer from '../../Footer/footer';
import food from '../../food.png';
import { useParams } from 'react-router-dom';
import { useToast } from "@chakra-ui/react";
import Pagination from '../Pagination/pagination';
import { StarIcon } from '@chakra-ui/icons';

const Catalog = () => {

    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const params = useParams();
    var hotelid = JSON.parse(localStorage.getItem('hotelid'));
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));


    const keys = ["name", "description"];
    const initialCatalogItems = [
        { _id: 1, name: 'Groceries', price: 20.0, description: "dummy1", pic: "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg" },
        { _id: 2, name: 'Pharmacy', price: 15.0, description: "dummy2", pic: "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg" },
        { _id: 3, name: 'Favorite Dishes', price: 25.0, description: "dummy3", pic: "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg" },
        { _id: 4, name: 'Groceries', price: 20.0, description: "dummy4", pic: "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg" },
        { _id: 5, name: 'Pharmacy', price: 15.0, description: "dummy5", pic: "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg" },
        { _id: 6, name: 'Favorite Dishes', price: 25.0, description: "dummy6", pic: "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg" },
        { _id: 7, name: 'Groceries', price: 20.0, description: "dummy7", pic: "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg" },
        { _id: 8, name: 'Pharmacy', price: 15.0, description: "dummy8", pic: "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg" },
        { _id: 9, name: 'Favorite Dishes', price: 25.0, description: "dummy9", pic: "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg" },
    ];


    useEffect(() => {
        if (hotelid != params.id || hotelid == null) {
            localStorage.setItem("hotelid", JSON.stringify(params.id));
            hotelid = params.id;

        }
    }, [])

    const fetchallitems = async () => {
        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                },
            };

            const { data, status } = await axios.get(
                "http://localhost:5000/api/items/getitems",
                config
            );

            if (status == 201)
                setCatalogItems(data.items);

        } catch (error) {

            console.log("Error")
        }
    }

    useEffect(() => {
        fetchallitems();
    }, [])


    const AddtoCart = async (item) => {

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                    "authorization": `Bearer ${userInfo?.Token['token']}`
                },
            };

            const { data } = await axios.post(
                "http://localhost:5000/api/v1/cart/add",
                {
                    "hotelID": hotelid,
                    "item": item,
                },
                config
            );

            toast({
                title: "Added Successful",
                status: "success",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });


        } catch (error) {

            console.log(error)
        }
    }




    const [catalogItems, setCatalogItems] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);


    const [currentPage, setCurrentPage] = useState(0);
    const ItemsPerPage = 6;
    const totalPages = Math.ceil(catalogItems.length / ItemsPerPage)

    const indexOfLastItem = (currentPage + 1) * ItemsPerPage;
    const indexOfFirstItem = indexOfLastItem - ItemsPerPage;
    const currentItems = catalogItems.slice(indexOfFirstItem, indexOfLastItem);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };


    const property = {
        imageUrl: 'https://bit.ly/2Z4KKcF',
        imageAlt: 'Rear view of modern home with pool',
        beds: 3,
        baths: 2,
        title: 'Modern home in city center in the heart of historic Los Angeles',
        formattedPrice: '$1,900.00',
        reviewCount: 34,
        rating: 4,
    }


    return (
        <>
            <Header />
            <Flex
                minH={'80vh'}
                align={'left'}
                justify={'center'}
                bg="gray"
            >
                <Box p={20}>
                    <Text fontSize={"50px"} mb={5} align={'center'} color={"white"} >
                        Catalogs
                    </Text>

                    <InputGroup   >
                        <InputLeftElement pointerEvents='none'>
                            <SearchIcon color='gray.300' />
                        </InputLeftElement>
                        <Input
                            color="white"
                            width="1190px"
                            placeholder="Search items..."
                            mb={4}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            borderColor={"black"}
                        />
                    </InputGroup>

                    {
                        catalogItems.length ?
                            <Box>
                                <Grid templateColumns={['1fr', '1fr', 'repeat(3, 1fr)']} gap={4} width={"100%"} >
                                    {currentItems.filter((item) => keys.some((key) => item[key].toLowerCase().includes(searchQuery))).map((item) => (
                                        <GridItem key={item._id} bg="white" maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' _hover={{ bg: 'green.400', }}>

                                            <Box >
                                                <Box
                                                    onClick={() => {
                                                        setSelectedItem(item);
                                                        onOpen();
                                                    }}

                                                >
                                                    {/* <Image src={item?.imageLink ? item?.imageLink : food} alt={item?.name} mb={4} boxSize={'100%'} aspectRatio={3 / 2} objectFit={'cover'} width={"100%"} height={"100%"} /> */}
                                                    <Image src={item?.imageLink ? item?.imageLink : food} alt={item?.name} mb={4} boxSize={'80%'} ml={"10%"} p={2} aspectRatio={3 / 2} objectFit={'cover'} height={"100%"} />


                                                    <Box p='4'>
                                                        <Box display='flex' alignItems='baseline'>
                                                            <Badge borderRadius='10px' px='2' bg='green.600'>
                                                                <Text color="white" p={"2px"}>{item?.rating}★</Text>
                                                            </Badge>
                                                            <Box
                                                                width="70%"
                                                                color='black'
                                                                fontWeight='semibold'
                                                                letterSpacing='wide'
                                                                fontSize='xs'
                                                                textTransform='uppercase'
                                                                ml='2'
                                                            >
                                                                {item?.name}
                                                            </Box>

                                                            {/* <Box> */}
                                                            <Box color='black' fontWeight='semibold' width="40%" fontSize='sm'>
                                                                ₹{item?.price} for one
                                                            </Box>
                                                            {/* </Box> */}
                                                        </Box>



                                                        <Box
                                                            mt='1'
                                                            fontWeight='semibold'
                                                            as='h4'
                                                            lineHeight='tight'
                                                            noOfLines={2}
                                                        >
                                                            {item?.description}
                                                        </Box>


                                                        <Box display='flex' mt='2' alignItems='center'>
                                                            {/* {Array(5)
                                                                .fill('')
                                                                .map((_, i) => (
                                                                    <StarIcon
                                                                        key={i}
                                                                        color={i < item?.rating ? 'teal.500' : 'gray.300'}
                                                                    />
                                                                ))} */}
                                                            {
                                                                item?.reviews.length > 0 &&
                                                                <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                                                    {item?.reviews.length} reviews
                                                                </Box>
                                                            }
                                                        </Box>

                                                    </Box>
                                                </Box>
                                                <Button
                                                    mt={3}
                                                    colorScheme="blue"
                                                    onClick={(e) => { AddtoCart(item) }}
                                                    ml={"33%"}
                                                    mb={2}
                                                >
                                                    Add to Cart
                                                </Button>
                                            </Box>
                                            {/* </Box> */}
                                        </GridItem>
                                    ))}
                                </Grid>

                                {
                                    (catalogItems.length > 6) &&
                                    <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                                }
                            </Box>
                            :
                            <Box align={'center'} color={"red"}  >
                                -- No Items --
                            </Box>
                    }

                    {/* ============================================================================================================================================================================== */}

                    {/* {
                        catalogItems.length ?
                            <Box>
                                <Grid templateColumns={['1fr', '1fr', 'repeat(3, 1fr)']} gap={4} width={"100%"}>
                                    {currentItems.filter((item) => keys.some((key) => item[key].toLowerCase().includes(searchQuery))).map((item) => (
                                        <GridItem key={item._id}>
                                            <Box
                                                _hover={{
                                                    bg: 'green.200',
                                                    cursor: 'pointer',
                                                }}
                                                border="1px"
                                                p={4}
                                                borderRadius="md"
                                                boxShadow="md">
                                                <Flex height="420px" overflowY="auto" maxW={"350px"}>
                                                    <Box width="350px" >
                                                        <Box
                                                            onClick={() => {
                                                                setSelectedItem(item);
                                                                onOpen();
                                                            }}
                                                            direction="column" alignItems="center" textAlign="center"
                                                        >

                                                            <Heading as="h3" size="lg" mb={2}>
                                                                {item.name}
                                                            </Heading>
                                                            <Box
                                                                w="200px"
                                                                h="200px"
                                                                borderRadius="full"
                                                                overflow="hidden"
                                                                // bg="green"
                                                                color="white"
                                                                display="flex"
                                                                align="center"
                                                                justify="center"
                                                                ml={"20%"}
                                                                position="relative"
                                                            >

                                                                <Image src={item?.imageLink ? item?.imageLink : food} alt={item?.name} mb={4} boxSize={'100%'} aspectRatio={3 / 2} objectFit={'cover'} width={"100%"} height={"100%"} />
                                                            </Box>
                                                            <Text fontSize="xl" color="black">
                                                                Price: {item?.price.toFixed(2)} Rs
                                                            </Text>
                                                            <Text fontSize="xl" color="black">
                                                                Rating: {item?.rating}
                                                            </Text>
                                                            <Text fontSize="xl" color="black" mb={4} >
                                                                Description: {item?.description}
                                                            </Text>
                                                        </Box>

                                                        <Button
                                                            mt={6}
                                                            colorScheme="blue"
                                                            onClick={(e) => { AddtoCart(item) }}
                                                            ml={"33%"}
                                                        >
                                                            Add to Cart
                                                        </Button>
                                                    </Box>
                                                </Flex>
                                            </Box>
                                        </GridItem>
                                    ))}
                                </Grid>

                                {
                                    (catalogItems.length > 6) &&
                                    <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />
                                }
                            </Box>
                            :
                            <Box align={'center'} color={"red"}  >
                                -- No Items --
                            </Box>
                    } */}


                    {/* ========================================================================================================================================================================== */}

                </Box>
            </Flex>

            <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent bg="gray">
                    <ModalHeader align={"center"} fontSize={"40px"} color="white" fontWeight="bold" >{selectedItem?.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' ml={10} color="white">
                            <Image src={selectedItem?.imageLink ? selectedItem?.imageLink : food} alt={selectedItem?.name} mb={4} boxSize={'90%'} aspectRatio={3 / 2} objectFit={'cover'} p={2} ml="5%" height={"100%"} />
                            <Box ml={3} mb={2}>

                                <Box display='flex' alignItems='baseline'>
                                    <Badge borderRadius='10px' px='2' bg='green.600'>
                                        <Text color="white" p={"2px"}>{selectedItem?.rating}★</Text>
                                    </Badge>
                                    <Box
                                        width="70%"
                                        color='black'
                                        fontWeight='semibold'
                                        letterSpacing='wide'
                                        fontSize='xs'
                                        textTransform='uppercase'
                                        ml='2'
                                    >
                                        {selectedItem?.name}
                                    </Box>

                                    {/* <Box> */}
                                    <Box color='black' fontWeight='semibold' width="40%" fontSize='sm'>
                                        ₹{selectedItem?.price} for one
                                    </Box>
                                    {/* </Box> */}
                                </Box>



                                <Box
                                    mt='1'
                                    fontWeight='semibold'
                                    as='h4'
                                    lineHeight='tight'
                                    noOfLines={2}
                                >
                                    {selectedItem?.description}
                                </Box>


                                <Box display='flex' mt='2' alignItems='center'>
                                    {/* {Array(5)
                                                                .fill('')
                                                                .map((_, i) => (
                                                                    <StarIcon
                                                                        key={i}
                                                                        color={i < item?.rating ? 'teal.500' : 'gray.300'}
                                                                    />
                                                                ))} */}
                                    {
                                        selectedItem?.reviews.length > 0 &&
                                        <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                            {selectedItem?.reviews.length} reviews
                                        </Box>
                                    }
                                </Box>
                            </Box>
                        </Box>
                        {/* <Flex direction="column" alignItems="center" textAlign="center">
                            <Box
                                w="200px"
                                h="200px"
                                borderRadius="full"
                                overflow="hidden"
                                // bg="green"
                                color="white"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                // ml={"35%"}
                                position="relative"
                            >
                                <Image src={selectedItem?.imageLink} alt={selectedItem?.name} mb={4} boxSize={'100%'} aspectRatio={3 / 2} objectFit={'cover'} width={"100%"} height={"100%"} />
                            </Box>
                            <Text fontSize="xl" color="black">
                                Price: {selectedItem?.price.toFixed(2)} Rs
                            </Text>
                            <Text fontSize="xl" color="black">
                                rating: {selectedItem?.rating}
                            </Text>
                            <Text fontSize="xl" color="black" mb={4} width="500px" overflowY="auto">
                                Description: {selectedItem?.description}
                            </Text>
                        </Flex> */}
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Footer />
        </>
    );
};

export default Catalog;



