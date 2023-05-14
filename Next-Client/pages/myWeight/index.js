import React, { Component } from 'react';
import { RadialChart } from 'react-vis';
import { Box, Button, Checkbox, Flex, Heading, Icon, Table, Tbody, Td, Text, Th, Thead, Tr, useBreakpointValue } from "@chakra-ui/react";
import Link from "next/link";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";

const ReputationTable = ({ reputationChanges }) => {
    return (
        <Table variant="simple" ml={8} maxW={'45%'}>
            <Thead>
                <Tr>
                    <Th>Event ID</Th>
                    <Th>Reputation Change</Th>
                    <Th>Event Type</Th>
                    <Th>DAO</Th>
                </Tr>
            </Thead>
            <Tbody>
                {reputationChanges.map((event) => (
                    <Tr key={event.id}>
                        <Td>{event.id}</Td>
                        <Td>{event.reputationChange}</Td>
                        <Td>{event.eventType}</Td>
                        <Td>{event.dao}</Td> {/* Add the DAO field */}
                    </Tr>
                ))}
            </Tbody>
        </Table>
    );
};


const reputationChanges = [
    { id: 1, reputationChange: 10, eventType: 'Increase', dao: 'DAO A' },
    { id: 2, reputationChange: -5, eventType: 'Decrease', dao: 'DAO B' },
    { id: 3, reputationChange: 20, eventType: 'Increase', dao: 'DAO A' },
    { id: 4, reputationChange: -3, eventType: 'Decrease', dao: 'DAO C' },
    { id: 5, reputationChange: 15, eventType: 'Increase', dao: 'DAO B' },
];


const myWeight = () => {
    const data = [
        { angle: 2, label: 'Mantle DAO' },
        { angle: 5, label: 'SISI DAO' },
        { angle: 3, label: 'HI DAO' },
    ];


    const totalScore = data.reduce((acc, { angle }) => acc + angle, 0);

    const percentageData = data.map(({ angle, label }) => ({
        angle,
        label,
        percentage: ((angle / totalScore) * 100).toFixed(2),
    }));

    return (
        <Box alignItems={'center'}>
            <Header balance={0} address={'a'} />
            <Flex w="100%" my="6" maxWidth={1480} mx="auto" px="6">
                <Sidebar />
                <Flex w="100%" my="6" mx="auto" px="3" flexDir={'row'} justifyContent={'space-around'}>
                    <Flex flexDir={'column'} align={'center'}>
                        <RadialChart
                            data={data}
                            width={300}
                            height={300}
                            innerRadius={100}
                            radius={140}
                            labelsRadiusMultiplier={1.15}
                            showLabels
                            labelsStyle={{ fill: "white", fontSize: "16px" }}
                        />
                        <Box ml="4" p="4" bg="white" borderRadius="lg" boxShadow="md" mt={10}>
                            <Text fontSize="2xl" mb="4" color={'black'}>Overall Reputation: {totalScore}</Text>
                            {percentageData.map(({ label, percentage }) => (
                                <Flex key={label} justify="space-between">
                                    <Text color={'black'}>{label}</Text>
                                    <Text color={'black'}>{percentage}%</Text>
                                </Flex>
                            ))}
                        </Box>
                    </Flex>
                    <ReputationTable reputationChanges={reputationChanges} />
                </Flex>
            </Flex>
        </Box>

    );
}

export default myWeight;
