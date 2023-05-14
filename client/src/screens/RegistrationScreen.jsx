import {
    Box,
    Button,
    Container,
    FormControl,
    Heading,
    HStack,
    Stack,
    Text,
    useBreakpointValue,
    useColorModeValue as mode,
    AlertIcon,
    AlertTitle,
    Alert,
    AlertDescription,
    useToast,
} from '@chakra-ui/react';
import TextField from '../components/TextField';
import PasswordTextField from '../components/PasswordTextField';
import { useState, useEffect } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link as ReactLink } from 'react-router-dom';
import { register } from '../redux/actions/userActions';

const RegistrationScreen = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user);
    const { loading, error, userInfo } = user;
    const redirect = '/products';
    const toast = useToast();
    const headingBR = useBreakpointValue({ base: 'xs', md: 'sm' });
    const boxBR = useBreakpointValue({ base: 'transparent', md: 'bg-surface' });

    useEffect(() => {
        if (userInfo) {
            navigate(redirect);
            toast({ description: 'Cuenta creada. Bienvenido a bordo.', status: 'success', isClosable: true });
        }
        }, [userInfo, redirect, error, navigate, toast]);
    
    return (
        <Formik
            initialValues={{ email: '', password: '', name: '' }}
            validationSchema={Yup.object({
                name: Yup.string().required('Un nombre es requerido.'),
                email: Yup.string().email('Email invalido.').required('Un email es requerido.'),
                password: Yup.string()
                    .min(1, 'La contraseña es muy corta - Debe de contener al menos un carácter.')
                    .required('La contraseña es requerida.'),
                confirmPassword: Yup.string()
                    .min(1, 'La contraseña es muy corta - Debe de contener al menos un carácter.')
                    .required('La contraseña es requerida.')
                    .oneOf([Yup.ref('password'), null], 'La contraseña debe coincidir.'),
            })}
            onSubmit={(values) => {
                dispatch(register(values.name, values.email, values.password));
            }}>
            {(formik) => (
            <Container maxW='lg' py={{ base: '12', md: '24' }} px={{ base: '0', md: '8' }} minH='4xl'>
                <Stack spacing='8'>
                <Stack spacing='6'>
                    <Stack spacing={{ base: '2', md: '3' }} textAlign='center'>
                    <Heading size={headingBR}>Crear una cuenta.</Heading>
                    <HStack spacing='1' justify='center'>
                        <Text color='muted'>Ya eres un usuario? </Text>
                        <Button as={ReactLink} to='/registration' variant='link' colorScheme='blue'>
                            Iniciar Sesión
                        </Button>
                    </HStack>
                    </Stack>
                </Stack>
                <Box
                    py={{ base: '0', md: '8' }}
                    px={{ base: '4', md: '10' }}
                    bg={{ boxBR }}
                    boxShadow={{ base: 'none', md: 'xl' }}>
                    <Stack spacing='6' as='form' onSubmit={formik.handleSubmit}>
                    {error && (
                        <Alert
                        status='error'
                        flexDirection='column'
                        alignItems='center'
                        justifyContent='center'
                        textAlign='center'>
                        <AlertIcon />
                        <AlertTitle>Lo sentimos!</AlertTitle>
                        <AlertDescription>{error}</AlertDescription>
                        </Alert>
                    )}
                    <Stack spacing='5'>
                        <FormControl>
                        <TextField type='text' name='name' placeholder='Tu nombre y apellidos.' label='Nombre completo' />
                        <TextField type='text' name='email' placeholder='you@example.com' label='Email' />
                        <PasswordTextField type='password' name='password' placeholder='Tu contraseña' label='Contraseña' />
                        <PasswordTextField
                            type='password'
                            name='confirmPassword'
                            placeholder='Confirma tu contraseña'
                            label='Confirma tu contraseña'
                        />
                        </FormControl>
                    </Stack>
                    <Stack spacing='6'>
                        <Button colorScheme='orange' size='lg' fontSize='md' isLoading={loading} type='submit'>
                            Registrarse
                        </Button>
                    </Stack>
                    </Stack>
                </Box>
                </Stack>
            </Container>
            )}
        </Formik>
    );
};

export default RegistrationScreen;