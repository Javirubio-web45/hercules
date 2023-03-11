import { Box, Flex, HStack, Link, IconButton, Icon, Text, useDisclosure, Button, Stack, useColorModeValue, useColorMode} from '@chakra-ui/react';
import {Link as ReactLink} from 'react-router-dom';
import {HamburgerIcon, CloseIcon, MoonIcon, SunIcon} from '@chakra-ui/icons';
import {GiScrew} from  'react-icons/gi'

const links = [
    {linkname: 'Productos', path: '/products'}, 
    {linkname: 'Carrito', path: '/cart'},
]

const NavLink = ({path, children}) => (
    <Link as={ReactLink} to={path} px={2} py={2} rounded='md' _hover={{textDecoration: 'none', bg: useColorModeValue('gray.200', 'gray.700')}}>{children}</Link>
)

const Navbar = () => {
    const {isOpen, onClose, onOpen} = useDisclosure();
    const {colorMode, toggleColorMode} = useColorMode();
    return (
        <Box bg={useColorModeValue('gray.100', 'gray.900')} px={4}>
            <Flex h={16} alignItems='center' justifyContent='space-between'>
                <IconButton size='md' icon={isOpen ? <CloseIcon /> : <HamburgerIcon />} display={{ md: 'none' }} onClick={isOpen ? onClose: onOpen}/>
                <HStack>
                    <Link as={ReactLink} to='/'>
                        <Flex alignItems='center'>
                            <Icon as={GiScrew} h={6} w={6} color='blue.400'/>
                            <Text fontWeight='extrabold'>Birlos Hercules</Text>
                        </Flex>
                    </Link>
                    <HStack as='nav' spacing={4} display={{ base: 'none', md: 'flex'}}>
                        {links.map((link) => (
                            <NavLink key={link.linkname} path={link.path}>
                                {link.linkname}
                            </NavLink>
                        ))}
                    </HStack>
                </HStack>
                <Flex alignItems='center'>
                    <NavLink>
                        <Icon as={colorMode === 'light' ? MoonIcon: SunIcon} alignSelf='center' onClick={() => toggleColorMode()}/>
                    </NavLink>
                    <Button as={ReactLink} to='/login' p={2} fontSize='sm' fontWeight={400} variant='link'>
                        Ingresar
                    </Button>
                    <Button as={ReactLink} to='/registration' m={2} display={{ base: 'none', md: 'inline-flex'}} fontSize='sm' fontWeight={600} _hover={{bg: 'blue.400'}} bg='blue.500' color='white'>
                        Registrarse
                    </Button>
                </Flex>
            </Flex>
            {isOpen ? <Box pb={4} display={{ md: 'none'}}>
                <Stack as='nav' spacing={4}>
                    {links.map((link) => (
                        <NavLink key={link.linkname} path={link.path}>
                            {link.linkname}
                        </NavLink>
                    ))}
                    <NavLink key='sign up' path='/resistration'>
                        Registrarse
                    </NavLink>
                </Stack>
            </Box>: null}
        </Box>
    )
}

export default Navbar