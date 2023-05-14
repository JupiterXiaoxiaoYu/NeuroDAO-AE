import { Box, VStack, Badge, Text, Flex } from '@chakra-ui/react';
import { Header } from "../../components/Header";
import { Sidebar } from "../../components/Sidebar";

const NotificationItem = ({ title, message, timestamp }) => {
    return (
        <Box borderWidth="1px" borderRadius="md" p={4} mb={4}>
            <VStack spacing={2} align="start">
                <Badge colorScheme="blue">{title}</Badge>
                <Text>{message}</Text>
                <Text fontSize="sm" color="gray.500">{timestamp}</Text>
            </VStack>
        </Box>
    );
};

const NotificationList = ({ notifications }) => {
    return (
        <VStack spacing={4} align="stretch">
            {notifications.map((notification, index) => (
                <NotificationItem
                    key={index}
                    title={notification.title}
                    message={notification.message}
                    timestamp={notification.timestamp}
                />
            ))}
        </VStack>
    );
};

const notifications = [
    {
        title: 'Notification 1',
        message: 'This is the content of notification 1.',
        timestamp: '2022-05-31 10:00 AM',
    },
    {
        title: 'Notification 2',
        message: 'This is the content of notification 2.',
        timestamp: '2022-05-31 11:30 AM',
    },
    // Add more notifications as needed
];

const Notifications = () => {
    return (

        <Box alignItems={'center'}>
            <Header balance={0} address={'a'} />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />
                <Flex w="100%" my="6" mx="auto" px="6">
                    <Box p={4} w={'100%'}>
                        <NotificationList notifications={notifications} />
                    </Box>
                </Flex>
            </Flex>
        </Box>

    );
};

export default Notifications