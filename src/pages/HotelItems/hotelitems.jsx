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
} from '@chakra-ui/react';

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
            >
                <Box p={20}>


                    <Heading as="h2" size="xl" mb={5} align={'center'} color={"green.300"} >
                        Items
                    </Heading>


                    <InputGroup   >
                        <InputLeftElement pointerEvents='none'>
                            <SearchIcon color='gray.300' />
                        </InputLeftElement>
                        <Input
                            width="1200px"
                            placeholder="Search items..."
                            mb={4}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            borderColor={"black"}
                        />
                    </InputGroup>
                    {
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
                                                <Flex height="450px" overflowY="auto" maxW={"350px"}>
                                                    <Box width="350px" >
                                                        <Box direction="column" alignItems="center" textAlign="center" >

                                                            <Heading as="h3" size="lg" mb={2}>
                                                                {item.name}
                                                            </Heading>
                                                            <Image src={item?.imageLink ? item?.imageLink : food} alt={item?.name} mb={4} boxSize={'150px'} aspectRatio={3 / 2} objectFit={'contain'} width={"100%"} height={"100%"} />
                                                            <Text fontSize="xl" color="black">
                                                                Price: {item?.price.toFixed(2)} Rs
                                                            </Text>
                                                            <Text fontSize="xl" color="black" mb={4} >
                                                                Description: {item?.description}
                                                            </Text>
                                                            <Flex justify={"space-between"}>

                                                                <Button
                                                                    mt={6}
                                                                    colorScheme="red"
                                                                    onClick={() => removeItem(item?._id)}
                                                                >
                                                                    Delete
                                                                </Button>
                                                                <Button
                                                                    mt={6}
                                                                    colorScheme="green"
                                                                    onClick={() => {
                                                                        setSelectedItem(item);
                                                                        onOpen();
                                                                    }}
                                                                >
                                                                    Update
                                                                </Button>
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
                    }
                </Box>
            </Flex>

            <Modal size="lg" onClose={onClose} isOpen={isOpen} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader align={"center"} fontSize={40} fontWeight="bold" >{selectedItem?.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Stack spacing={4}>

                            <FormControl id="name" isRequired>
                                <FormLabel>Name of Item</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="Name of Item"
                                    value={selectedItem?.name}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, name: e.target.value })}
                                />
                            </FormControl>

                            <FormControl id="description" isRequired>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    placeholder="Description"
                                    mb={4}
                                    value={selectedItem?.description}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, description: e.target.value })}
                                />
                            </FormControl>

                            <FormControl id="price" isRequired>
                                <FormLabel>Price</FormLabel>
                                <Input
                                    type="number"
                                    placeholder="Price"
                                    value={selectedItem?.price}
                                    onChange={(e) => setSelectedItem({ ...selectedItem, price: e.target.value })}
                                />
                            </FormControl>

                            <FormControl id="pic" isRequired>
                                <FormLabel>Upload your Picture</FormLabel>
                                <Input
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



