import {
    Flex,
    Heading,
    Stack,
    Text,
    useColorModeValue as mode,
    Badge,
    Box,
    Link,
    Divider,
    useToast,
    useDisclosure,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { Link as ReactLink } from 'react-router-dom';
import { PhoneIcon, EmailIcon, ChatIcon } from '@chakra-ui/icons';
import { createOrder, resetOrder } from '../redux/actions/orderActions';
import { useEffect, useState, useCallback } from 'react';
import CheckoutItem from './CheckoutItem';
import PayPalButton from './PayPalButton';
import PaymentSuccessModal from './PaymentSuccessModal';
import PaymentErrorModal from './PaymentErrorModal';

import { resetCart } from '../redux/actions/cartActions';
import { useNavigate } from 'react-router-dom';

const CheckoutOrderSummary = () => {
    const { onClose: onErrorClose, onOpen: onErrorOpen, isOpen: isErrorOpen } = useDisclosure();
    const { onClose: onSuccessClose, onOpen: onSuccessOpen, isOpen: isSuccessOpen } = useDisclosure();
    const colorMode = mode('gray.600', 'gray.400');
    const cartItems = useSelector((state) => state.cart);
    const { cart, subtotal, expressShipping } = cartItems;
    const user = useSelector((state) => state.user);
    const { userInfo } = user;
    const shippingInfo = useSelector((state) => state.order);
    const { error, shippingAddress } = shippingInfo;
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast();

    const shipping = useCallback(
        () => (expressShipping === 'true' ? 14.99 : subtotal <= 1000 ? 4.99 : 0),
        [expressShipping, subtotal]
    );

    const total = useCallback(
        () => Number(shipping() === 0 ? Number(subtotal) : Number(subtotal) + shipping()).toFixed(2),
        [shipping, subtotal]
    );

    useEffect(() => {
        if (!error) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [error, shippingAddress, total, expressShipping, shipping, dispatch]);

    const onPaymentSuccess = async (data) => {
        onSuccessOpen()
        dispatch(
            createOrder({
                orderItems: cart,
                shippingAddress,
                paymentMethod: data.paymentSource,
                paymentDetails: data,
                shippingPrice: shipping(),
                totalPrice: total(),
                userInfo,
            })
        );
        dispatch(resetOrder());
        dispatch(resetCart());
    };

    const onPaymentError = (error) => {
        toast({
            description:
            'Something went wrong during the payment process. Please try again or make sure that your PayPal account balance is enough for this purchase.',
            status: 'error',
    
            duration: '600000',
            isClosable: true,
        });
    };

    return (
        <Stack spacing='8' rounded='xl' padding='8' width='full'>
            <Heading size='md'>Resumen del pedido</Heading>
            {cart.map((item) => (
                <CheckoutItem key={item.id} cartItem={item} />
            ))}
    
            <Stack spacing='6'>
            <Flex justify='space-between'>
                <Text fontWeight='medium' color={colorMode}>
                Subtotal
                </Text>
                <Text fontWeight='medium' color={colorMode}>
                {subtotal}
                </Text>
            </Flex>
            <Flex justify='space-between'>
                <Text fontWeight='medium' color={colorMode}>
                Envio
                </Text>
                <Text fontWeight='medium' color={colorMode}>
                {shipping() === 0 ? (
                    <Badge rounded='full' px='2' fontSize='0.8em' colorScheme='green'>
                    Gratis
                    </Badge>
                ) : (
                    `$${shipping()}`
                )}
                </Text>
            </Flex>
    
            <Flex justify='space-between'>
                <Text fontSize='lg' fontWeight='semibold'>
                Total
                </Text>
                <Text fontSize='xl' fontWeight='extrabold'>
                ${Number(total())}
                </Text>
            </Flex>
            </Stack>
            <PayPalButton
            total={total}
            onPaymentSuccess={onPaymentSuccess}
            onPaymentError={onPaymentError}
            disabled={buttonDisabled}
            />
            <Box align='center'>
            <Text fontSize='sm'>Tienes preguntas? o necesitas ayuda para completar tu pedido?</Text>
            <Flex justifyContent='center' color={mode('blue.500', 'blue.100')}>
                <Flex align='center'>
                <ChatIcon />
                <Text m='2'>Live Chat</Text>
                </Flex>
                <Flex align='center'>
                <PhoneIcon />
                <Text m='2'>Phone</Text>
                </Flex>
                <Flex align='center'>
                <EmailIcon />
                <Text m='2'>Email</Text>
                </Flex>
            </Flex>
            </Box>
            <Divider bg={mode('gray.400', 'gray.800')} />
            <Flex justifyContent='center' my='6' fontWeight='semibold'>
            <p>o</p>
            <Link as={ReactLink} to='/products' ml='1'>
                Continuar Comprando
            </Link>
            </Flex>
            <PaymentErrorModal onClose={onErrorClose} onOpen={onErrorOpen} isOpen={isErrorOpen}/>
            <PaymentSuccessModal onClose={onSuccessClose} onOpen={onSuccessOpen} isOpen={isSuccessOpen}/>
        </Stack>
    );
};

export default CheckoutOrderSummary;