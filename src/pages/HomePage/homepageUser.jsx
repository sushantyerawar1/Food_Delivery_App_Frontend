import react, { useState, useEffect } from "react"
import { useNavigate } from 'react-router-dom';
import { Input, InputGroup } from "@chakra-ui/input";
import {
    Flex,
    Box,
    Heading,
    Text,
    Grid,
    GridItem,
    InputLeftElement,
    Badge
} from '@chakra-ui/react'
import { SearchIcon } from "@chakra-ui/icons";
import Pagination from "../Pagination/pagination";
import { StarIcon } from '@chakra-ui/icons';

const HomePageUser = () => {


    const navigate = useNavigate();
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    const hotelid = JSON.parse(localStorage.getItem('hotelid'));
    const keys = ["name", "description"]
    const initialHotels = [
        { id: 1, name: 'Tech Cafe', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry. PageMaker including versions of Lorem Ipsum" },
        { id: 2, name: 'D-Mark', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" },
        { id: 3, name: 'Galav', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" },
        { id: 4, name: 'Sai', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" },
        { id: 5, name: 'amrutulya ', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" },
        { id: 6, name: 'kumar', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" },
        { id: 7, name: 'Tech Cafe', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" },
        { id: 8, name: 'D-Mark', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" },
        { id: 9, name: 'Galav', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" },
        { id: 10, name: 'Sai', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" },
        { id: 11, name: 'amrutulya ', description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum" },
        { id: 12, name: 'kumar', description: "Lorem Ipsum is simply dummy " },
    ];

    const [hotels, setHotels] = useState(initialHotels);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (hotelid) {
            localStorage.removeItem("hotelid");
        }
    }, [])

    const [currentPage, setCurrentPage] = useState(0);
    const HotelsPerPage = 6;
    const totalPages = Math.ceil(hotels.length / HotelsPerPage)

    const indexOfLastHotel = (currentPage + 1) * HotelsPerPage;
    const indexOfFirstHotel = indexOfLastHotel - HotelsPerPage;
    const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    return (
        <>
            <Flex
                minH={'80vh'}
                align={'left'}
                justify={'center'}
                bg="gray"
            >
                <Box p={20}>
                    <Text fontSize={"50px"} mb={5} align={'center'} color={"white"} >
                        Hotels
                    </Text>

                    <InputGroup   >
                        <InputLeftElement pointerEvents='none'>
                            <SearchIcon color='gray.300' />
                        </InputLeftElement>
                        <Input
                            width="1190px"
                            placeholder="Search items..."
                            mb={4}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            borderColor={"black"}
                        />

                    </InputGroup>


                    {
                        hotels.length ?
                            <Box>
                                <Grid templateColumns={['1fr', '1fr', 'repeat(3, 1fr)']} gap={4} width="100%">
                                    {currentHotels.filter((item) => keys.some((key) => item[key].toLowerCase().includes(searchQuery))).map((item) => (
                                        <GridItem key={item.id} height="50%" maxH={"50%"}>
                                            <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden' _hover={{ bg: 'green.100', cursor: "pointer" }} >
                                                <Box p='6' onClick={() => { navigate(`/catalog/${item.id}`) }} >
                                                    <Text fontSize={"50px"} mb={2} align="center" textTransform='uppercase' color="white">
                                                        {item.name}
                                                    </Text>
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
                                                        noOfLines={5}
                                                    >
                                                        {item?.description}
                                                    </Box>


                                                    <Box display='flex' mt='2' alignItems='center'>
                                                        {Array(5)
                                                            .fill('')
                                                            .map((_, i) => (
                                                                <StarIcon
                                                                    key={i}
                                                                    color={i < 3 ? 'teal.500' : 'gray.300'}
                                                                />
                                                            ))}
                                                        {/* <Box as='span' ml='2' color='gray.600' fontSize='sm'>
                                                            {item?.reviews.length} reviews
                                                        </Box> */}
                                                    </Box>

                                                </Box>
                                            </Box>
                                        </GridItem>

                                    ))}
                                </Grid>
                                {
                                    (hotels.length > 6) &&
                                    <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />

                                }
                            </Box> :
                            <Box align={'center'} color={"red"}  >
                                -- No Hotels Listed --
                            </Box>
                    }


                    {/* ========================================================================================================================================================================= */}
                    {/* 
                    {
                        hotels.length ?
                            <Box>
                                <Grid templateColumns={['1fr', '1fr', 'repeat(3, 1fr)']} gap={4} width="100%">
                                    {currentHotels.filter((item) => keys.some((key) => item[key].toLowerCase().includes(searchQuery))).map((item) => (
                                        <GridItem key={item.id} onClick={() => { navigate(`/catalog/${item.id}`) }}>
                                            <Box
                                                _hover={{
                                                    bg: 'green.200',
                                                    cursor: 'pointer',
                                                }}
                                                border="1px"
                                                p={4}
                                                borderRadius="md"
                                                boxShadow="md">
                                                <Flex height="100px" overflowY="auto" >
                                                    <Box width="350px">
                                                        <Box direction="column" alignItems="center" textAlign="center" >
                                                            <Heading as="h3" size="lg" mb={2}>
                                                                {item.name}
                                                            </Heading>
                                                            <Text fontSize="xl" color="blue" mb={4} >
                                                                {item?.description}
                                                            </Text>
                                                        </Box>

                                                    </Box>
                                                </Flex>
                                            </Box>
                                        </GridItem>

                                    ))}
                                </Grid>
                                {
                                    (hotels.length > 6) &&
                                    <Pagination totalPages={totalPages} currentPage={currentPage} handlePageChange={handlePageChange} />

                                }
                            </Box> :
                            <Box align={'center'} color={"red"}  >
                                -- No Hotels Listed --
                            </Box>
                    } */}
                </Box>
                {/* ========================================================================================================================================================================= */}
            </Flex >
        </>
    )
}

export default HomePageUser;

