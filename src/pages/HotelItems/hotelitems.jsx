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
    Textarea,
    Stack,
    FormControl,
    FormLabel,
    Badge,
} from '@chakra-ui/react';
import { StarIcon } from '@chakra-ui/icons';
import { SearchIcon } from "@chakra-ui/icons";
import { useToast } from "@chakra-ui/react";
import Header from '../../Header/Header';
import Footer from '../../Footer/footer';
import food from '../../food.png';
import axios from "axios"
import Pagination from "../Pagination/pagination"
import { useNavigate } from 'react-router-dom';

const HotelItems = () => {

    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();
    const [picLoading, setPicLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedItem, setSelectedItem] = useState(null);


    const keys = ["name", "description"];
    const [catalogItems, setCatalogItems] = useState([]);

    useEffect(() => {
        if (!user) navigate('/login')
    }, [user])

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


    const postDetails = (pics) => {
        setPicLoading(true);
        if (pics === undefined) {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "dojtv6qwl");

            fetch("https://api.cloudinary.com/v1_1/dojtv6qwl/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setSelectedItem({ ...selectedItem, pic: data.url.toString() })
                    setPicLoading(false);
                })
                .catch((err) => {
                    console.log(err);
                    setPicLoading(false);
                });
        } else {
            toast({
                title: "Please Select an Image!",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            setPicLoading(false);
            return;
        }
    };



    const handleUpdateItem = async () => {
        const answer = window.confirm('Do you want to Update?');
        if (answer) {

            if (selectedItem.rating > 5 || selectedItem.rating < 1) {
                toast({
                    title: "Rating Should be between 1 and 5 (both included)",
                    status: "warning",
                    duration: 5000,
                    isClosable: true,
                    position: "bottom",
                });
                return;
            }

            if (selectedItem.name === '' || selectedItem.description === '' || selectedItem.price === 0 || selectedItem.photo === null || selectedItem.rating == 0) {
                toast({
                    title: "Please Fill all fields",
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

                const { data, status } = await axios.post(
                    "http://localhost:5000/api/items/updateitem",
                    {
                        "_id": selectedItem._id,
                        "name": selectedItem.name,
                        "hotelId": user._id,
                        "price": selectedItem.price,
                        "imageLink": selectedItem.pic,
                        "quantity": 1,
                        "availabilityStatus": true,
                        "description": selectedItem.description,
                        "rating": selectedItem.rating
                    },
                    config
                );

                if (status == 200) {

                    toast({
                        title: "Item Updated Successful",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                    });
                    setTimeout(() => { fetchallitems() }, 200);
                }

            } catch (error) {
                console.log("Error")
            }
        }

    }

    const SubmitupdateForm = () => {
        setTimeout(() => { handleUpdateItem() }, 500);
    }

    const removeItem = async (itemId) => {
        const answer = window.confirm('Do you want to Delete?');
        if (answer) {

            try {
                const config = {
                    headers: {
                        "Content-type": "application/json",
                    },
                };

                const { data, status } = await axios.post(
                    "http://localhost:5000/api/items/deleteitem",
                    {
                        "itemId": itemId
                    },
                    config
                );

                if (status == 200) {

                    toast({
                        title: "Item Delete Successful",
                        status: "success",
                        duration: 5000,
                        isClosable: true,
                        position: "bottom",
                    });
                    setTimeout(() => { fetchallitems() }, 200);
                }

            } catch (error) {
                console.log("Error")
            }
        }
    };

    useEffect(() => {
        fetchallitems();
    }, [])


    const [currentPage, setCurrentPage] = useState(0);
    const ItemsPerPage = 6;
    const totalPages = Math.ceil(catalogItems.length / ItemsPerPage)

    const indexOfLastItem = (currentPage + 1) * ItemsPerPage;
    const indexOfFirstItem = indexOfLastItem - ItemsPerPage;
    const currentItems = catalogItems.slice(indexOfFirstItem, indexOfLastItem);

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
                <Box p={20}>


                    <Text fontSize={"50px"} mb={5} align={'center'} color={"white"} >
                        Items
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
                                <Grid templateColumns={['1fr', '1fr', 'repeat(3, 1fr)']} gap={4} width={"100%"}>
                                    {currentItems.filter((item) => keys.some((key) => item[key].toLowerCase().includes(searchQuery))).map((item) => (
                                        <GridItem key={item._id} >
                                            {/* <Box
                                                _hover={{
                                                    bg: 'green.100',
                                                    cursor: 'pointer',
                                                }}
                                                border="1px"
                                                p={4}
                                                borderRadius="md"
                                                boxShadow="md"
                                            > */}
                                            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' _hover={{ bg: 'green.400', }}>
                                                <Box>
                                                    <Image src={item?.imageLink ? item?.imageLink : food} alt={item?.name} mb={4} boxSize={'100%'} aspectRatio={3 / 2} objectFit={'cover'} width={"100%"} height={"100%"} />
                                                    {/* <Box
                                                                w="200px"
                                                                h="200px"
                                                                borderRadius="full"
                                                                overflow="hidden"
                                                                color="white"
                                                                display="flex"
                                                                align="center"
                                                                justify="center"
                                                                ml={"20%"}
                                                                mt={2}
                                                                position="relative"
                                                            >
                                                                <Image src={item?.imageLink ? item?.imageLink : food} alt={item?.name} mb={4} boxSize={'100%'} aspectRatio={3 / 2} objectFit={'cover'} width={"100%"} height={"100%"} />
                                                            </Box> */}

                                                    <Box p='6'>
                                                        <Box display='flex' alignItems='baseline'>
                                                            <Badge borderRadius='full' px='2' colorScheme='teal'>
                                                                New
                                                            </Badge>
                                                            <Box
                                                                color='white'
                                                                fontWeight='semibold'
                                                                letterSpacing='wide'
                                                                fontSize='xs'
                                                                textTransform='uppercase'
                                                                ml='2'
                                                            >
                                                                {item?.name}
                                                            </Box>
                                                        </Box>

                                                        <Box
                                                            mt='1'
                                                            fontWeight='semibold'
                                                            as='h4'
                                                            lineHeight='tight'
                                                            noOfLines={4}
                                                        >
                                                            {item?.description}
                                                        </Box>

                                                        <Box>
                                                            <Box as='span' color='black.400' fontWeight='semibold'>
                                                                Price:  {item?.price} RS
                                                            </Box>
                                                        </Box>

                                                        <Box display='flex' mt='2' alignItems='center'>
                                                            {Array(5)
                                                                .fill('')
                                                                .map((_, i) => (
                                                                    <StarIcon
                                                                        key={i}
                                                                        color={i < item?.rating ? 'teal.500' : 'gray.300'}
                                                                    />
                                                                ))}
                                                            <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                                                {item?.reviews.length} reviews
                                                            </Box>
                                                        </Box>

                                                        <Flex justify={"space-between"}>
                                                            <Box>
                                                                <Button
                                                                    mt={5}
                                                                    colorScheme="red"
                                                                    onClick={() => removeItem(item?._id)}
                                                                >
                                                                    Delete
                                                                </Button>
                                                            </Box>
                                                            <Box>
                                                                <Button
                                                                    mt={5}
                                                                    mr={2}
                                                                    colorScheme="green"
                                                                    onClick={() => {
                                                                        setSelectedItem(item);
                                                                        onOpen();
                                                                    }}
                                                                >
                                                                    Update
                                                                </Button>
                                                            </Box>
                                                        </Flex>
                                                    </Box>
                                                </Box>
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
                        catalogItems.length > 0 ?

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
                                                <Flex height="410px" overflowY="auto" maxW={"350px"}>
                                                    <Box width="350px" >
                                                        <Box direction="column" alignItems="center" textAlign="center" >

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
                                                                alignItems="center"
                                                                justifyContent="center"
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
                                                            <Flex justify={"space-between"}>
                                                                <Box>
                                                                    <Button
                                                                        mt={5}
                                                                        colorScheme="red"
                                                                        onClick={() => removeItem(item?._id)}
                                                                    >
                                                                        Delete
                                                                    </Button>
                                                                </Box>
                                                                <Box>
                                                                    <Button
                                                                        mt={5}
                                                                        mr={2}
                                                                        colorScheme="green"
                                                                        onClick={() => {
                                                                            setSelectedItem(item);
                                                                            onOpen();
                                                                        }}
                                                                    >
                                                                        Update
                                                                    </Button>
                                                                </Box>
                                                            </Flex>
                                                        </Box>
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
                            </Box> :
                            <Box align={'center'} color={"red"}  >
                                -- No Items --
                            </Box>
                    } */}

                    {/* ============================================================================================================================================================================== */}

                </Box>
            </Flex>

            <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent bg='gray'>
                    <ModalHeader align={"center"} fontSize={40} fontWeight="bold" color="white">{selectedItem?.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <Stack spacing={4} >

                            <FormControl id="name" isRequired>
                                <FormLabel>Name of Item</FormLabel>
                                <Input
                                    color="white"
                                    type="text"
                                    placeholder="Name of Item"
                                    value={selectedItem?.name}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                                />
                            </FormControl>

                            <FormControl id="description" isRequired>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    color="white"
                                    placeholder="Description"
                                    mb={4}
                                    value={selectedItem?.description}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
                                />
                            </FormControl>

                            <FormControl id="price" isRequired>
                                <FormLabel>Price</FormLabel>
                                <Input
                                    color="white"
                                    type="number"
                                    placeholder="Price"
                                    value={selectedItem?.price}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, price: e.target.value })}
                                />
                            </FormControl>

                            <FormControl id="rating" isRequired>
                                <FormLabel>Rating</FormLabel>
                                <Input
                                    color="white"
                                    type="number"
                                    placeholder="Rating"
                                    value={selectedItem?.rating}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, rating: e.target.value })}
                                />
                            </FormControl>

                            <FormControl id="pic" isRequired>
                                <FormLabel>Upload your Picture</FormLabel>
                                <Input
                                    color="white"
                                    type="file"
                                    p={1.5}
                                    accept="image/*"
                                    onChange={(e) => postDetails(e.target.files[0])}
                                />
                            </FormControl>
                            <Stack spacing={10}>
                                <Button
                                    onClick={SubmitupdateForm}
                                    bg={'green.400'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'green.500',
                                    }}>
                                    Update Item
                                </Button>
                            </Stack>
                        </Stack>
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

export default HotelItems;



