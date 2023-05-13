import { Box, Flex, Heading, Link, Stack, useColorModeValue as mode, Spinner, Alert, AlertTitle, AlertIcon, AlertDescription, Wrap, HStack } from '@chakra-ui/react';
import { Link as ReactLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import CartItem from '../components/CartItem';
import CartOrderSummary from '../components/CartOrderSummary';

const CartScreen = () => {
    const cartInfo = useSelector((state) => state.cart);
    const { loading, error, cart } = cartInfo
    const getHeadingContent = () => (cart.length === 1 ? '(1 Item)': `(${cart.length} Items)`);
    return (
        <Wrap spacing='30px' justify='center' minHeight='100vh'>
            {loading ? 
                (<Stack direction='row' spacing={4}>
                    <Spinner mt={20} thickness='2px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl'/>
                </Stack>) : 
                error ? 
                (<Alert status='error'>
                    <AlertIcon/>
                    <AlertTitle>Lo sentimos!!</AlertTitle>
                    <AlertDescription>{error}</AlertDescription>
                </Alert>) : 
                cart.length <=0 ? 
                (<Alert status='warning'>
                    <AlertIcon/>
                    <AlertTitle>Tu carro esta vacio!!</AlertTitle>
                    <AlertDescription>
                        <Link as={ReactLink} to='/products'>
                            Haz click aqui para ver nuestros productos
                        </Link>
                    </AlertDescription>
                </Alert>
                ) :
                (<Box maxW={{base: '3xl', lg: '7x1'}} mx='auto' px={{base: '4', md: '8', lg: '12'}} py={{base: '6', md: '8', lg: '12'}}>
                    <Stack direction={{base: 'column', lg: 'row'}} align={{lg: 'flex-start'}} spacing={{base: '8', md: '16'}}>
                        <Stack spacing={{base: '8', md: '10'}} flex='2'>
                            <Heading fontSize='2x1' fontWeight='extrabold'>
                                Shopping Cart {getHeadingContent()}
                            </Heading>
                            <Stack spacing='6'>
                                {cart.map((cartItem) => (
                                    <CartItem key={cartItem.id} cartItem={cartItem}/>
                                ))}
                            </Stack>
                        </Stack>
                        <Flex direction='column' align='center' flex='1'>
                            <CartOrderSummary/>
                            <HStack mt='6' fontWeight='semibold'>
                                <p>or</p>
                                <Link as={ReactLink} to='/products' color={mode('blue.500', 'blue.200')}>
                                    Continue Shopping
                                </Link>
                            </HStack>
                        </Flex>
                    </Stack>
                </Box>

                )
            }
        </Wrap>
    )
}

export default CartScreen