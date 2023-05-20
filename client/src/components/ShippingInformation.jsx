import { Box, Heading, VStack, FormControl, Flex, Stack, Text, Radio, RadioGroup, Tooltip } from '@chakra-ui/react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import TextField from './TextField';
import { useDispatch } from 'react-redux';
import { setExpress } from '../redux/actions/cartActions';
import { useState } from 'react';
import { setShippingAddress, setShippingAddressError } from '../redux/actions/orderActions';

const ShippingInformation = () => {
    const dispatch = useDispatch();
    const [formStateChanged, setFormStateChanged] = useState(false);

    const setErrorState = (input, data) => {
        if (!input) {
            dispatch(setShippingAddress(data));
        }
        if ((!formStateChanged && !input) || (formStateChanged && input)) {
            return;
        } else {
            setFormStateChanged(input);
            dispatch(setShippingAddressError(input));
        }
    };

    return (
        <Formik
        initialValues={{ address: '', postalCode: '', city: '', country: '' }}
        validationSchema={Yup.object({
            address: Yup.string().required('Este campo es requerido.').min(2, 'Esta dirección es muy corta.'),
            postalCode: Yup.string().required('Este campo es requerido.').min(2, 'Este codigo postal es muy corto.'),
            city: Yup.string().required('Este campo es requerido.').min(2, 'El nombre de esta ciudad es muy corta.'),
            country: Yup.string().required('Este campo es requerido.').min(2, 'El nombre de este país es muy corto.'),
        })}>
        {(formik) => (
            <VStack as='form'>
                <FormControl
                    onChange={
                    Object.keys(formik.errors).length === 0 && Object.keys(formik.touched).length >= 2
                        ? setErrorState(false, formik.values)
                        : setErrorState(true)
                    }>
                    <TextField name='address' placeholder='Calle' label='Calle' />
                    <Flex>
                        <Box flex='1' mr='10'>
                            <TextField name='postalCode' placeholder='Codigo Postal' label='Codigo Postal' type='number' />
                        </Box>
                        <Box flex='2'>
                            <TextField name='city' placeholder='Ciudad' label='Ciudad' />
                        </Box>
                    </Flex>
                    <TextField name='country' placeholder='País' label='País' />
                </FormControl>
                <Box w='100%' h='180px' pr='5'>
                    <Heading fontSize='2xl' fontWeight='extrabold' mb='10'>
                        Metodo de envio
                    </Heading>
                    <RadioGroup
                    defaultValue='false'
                    onChange={(e) => {
                        dispatch(setExpress(e));
                    }}>
                        <Stack direction={{ base: 'column', lg: 'row' }} align={{ lg: 'flex-start' }}>
                            <Stack pr='10' spacing={{ base: '8', md: '10' }} flex='1.5'>
                                <Box>
                                    <Radio value='true'>
                                    <Text fontWeight='bold'>Express 14.99</Text>
                                    <Text>Recíbelo en 24 hours.</Text>
                                    </Radio>
                                </Box>
                                <Stack spacing='6'>Express</Stack>
                            </Stack>
                            <Radio value='false'>
                                <Tooltip label='Free shipping for orders of $1000 or more!'>
                                    <Box>
                                        <Text fontWeight='bold'>Standard $4.99</Text>
                                        <Text>Recíbelo de 2 a 3 dias</Text>
                                    </Box>
                                </Tooltip>
                            </Radio>
                        </Stack>
                    </RadioGroup>
                </Box>
            </VStack>
        )}
        </Formik>
    );
};

export default ShippingInformation;