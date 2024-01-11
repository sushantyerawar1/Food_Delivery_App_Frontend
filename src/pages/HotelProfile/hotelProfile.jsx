import react, { useState, useEffect } from "react"
import Header from "../../Header/Header";
import Footer from "../../Footer/footer";
import { useNavigate } from 'react-router-dom';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Stack,
    useColorModeValue,
    Input,
    Heading,
    Textarea,
    Button,
    Text,
} from '@chakra-ui/react'
import { useToast } from "@chakra-ui/react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

const HotelProfile = () => {

    const toast = useToast();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const user = userInfo ? userInfo.User : null
    const role = user?.role;
    const navigate = useNavigate();

    const [hotelName, setHotelName] = useState('Tech Cafe');
    const [hotelDescription, setHotelDescription] = useState('Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.');
    const [hotelRating, setHotelRating] = useState(4.5);
    const [selectedFiles, setSelectedFiles] = useState(["http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",
        "http://res.cloudinary.com/dojtv6qwl/image/upload/v1704533187/ptk5pvkpxz1sassuiwfl.jpg",]);

    useEffect(() => {
        if (!userInfo) {
            navigate("/login")
        }
    })

    const handleDelete = (indexToDelete) => {
        const updatedFiles = selectedFiles.filter((_, index) => index !== indexToDelete);
        setSelectedFiles(updatedFiles);
    };



    const postDetails = (pics) => {

        if (pics.type === "image/jpeg" || pics.type === "image/png") {
            const data = new FormData();
            data.append("file", pics);
            data.append("upload_preset", "chat-app");
            data.append("cloud_name", "dojtv6qwl");
            const images = selectedFiles;
            fetch("https://api.cloudinary.com/v1_1/dojtv6qwl/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    images.push(data.url.toString());
                    setSelectedFiles(images);
                })
                .catch((err) => {
                    console.log(err);

                });
        }

    };

    const handleFileChange = (e) => {
        console.log(e.target.files.length)
        for (let i = 0; i < e.target.files.length; i++) {
            const files = e.target.files[i];
            setTimeout(() => { postDetails(files) }, 200);
        }
    };

    const handleUpdate = async () => {


        if (hotelRating != "" && (hotelRating > 5 || hotelRating < 1)) {
            toast({
                title: "Rating Should be between 1 and 5 (both included)",
                status: "warning",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
            return;
        }
        if (hotelName == "" || hotelDescription == "" || hotelRating == "") {


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

            // const { data, status } = await axios.post(
            //     "http://localhost:5000/api/items/additem",
            //     {

            //     },
            //     config
            // );

        } catch (error) {
            toast({
                title: "Unable to Update Profile",
                description: error.response.data.message,
                status: "error",
                duration: 5000,
                isClosable: true,
                position: "bottom",
            });
        }
    };

    return (
        <>
            <Header />
            <Flex
                minH={'80vh'}
                align={'left'}
                justify={'center'}
                padding={10}
                width={"100%"}

            >
                <Stack spacing={8} mx={'auto'} width={'50%'} py={12} px={6} >
                    <Stack align={'center'}>
                        <Heading fontSize={'60px'}>Hotel Details</Heading>
                    </Stack>
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        border="1px solid"
                        boxShadow="5px 10px 18px #888888"
                        p={8}
                    >
                        <Stack spacing={4} align={"center"}>
                            <FormControl id="name" isRequired>
                                <FormLabel>Name of Hotel</FormLabel>
                                <Input
                                    type="text"
                                    placeholder="Enter Name of Hotel"
                                    value={hotelName}
                                    onChange={(e) => { setHotelName(e.target.value) }}
                                />
                            </FormControl>

                            <FormControl id="rating" isRequired>
                                <FormLabel>Rating of Hotel</FormLabel>
                                <Input
                                    type="number"
                                    placeholder="Enter Rating of Hotel"
                                    value={hotelRating}
                                    onChange={(e) => { setHotelRating(e.target.value) }}
                                />
                            </FormControl>

                            <FormControl id="description" isRequired>
                                <FormLabel>Description</FormLabel>
                                <Textarea
                                    size="md"
                                    placeholder="Enter Description of Hotel"
                                    value={hotelDescription}
                                    onChange={(e) => { setHotelDescription(e.target.value) }}
                                />
                            </FormControl>

                            <FormControl id="uploadimage" isRequired>
                                <FormLabel>Upload Images</FormLabel>
                                <Input
                                    p={1.5}
                                    type="file"
                                    multiple
                                    accept=".jpg, .jpeg, .png, .pdf"
                                    onChange={handleFileChange}
                                />
                                {selectedFiles.length > 0 && (
                                    <Box mt={2}>
                                        <Text fontWeight={"bold"}>Uploaded Files:</Text>
                                        <ul>
                                            {Array.from(selectedFiles).map((file, index) => (
                                                <Flex p={2}>
                                                    <li key={index}> {file.slice(0, 20)} ....</li>
                                                    <Button ml={2} height={"30px"} onClick={() => { handleDelete(index) }}> <FontAwesomeIcon icon={faTrash} /></Button>
                                                </Flex>
                                            ))}
                                        </ul>
                                    </Box>
                                )}
                            </FormControl>
                            <Button mt={2} onClick={handleUpdate} colorScheme="blue" width={"50%"} >
                                Update
                            </Button>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>

            <Footer />
        </>
    )
}

export default HotelProfile;

