import React from 'react';
import { Box, Container, Heading, SimpleGrid, Text, Button, Avatar, Stack } from '@chakra-ui/react';

const testimonials = [
  { 
    name: 'Alex', 
    comment: "FitTrack has completely transformed my fitness routine!", 
    avatarUrl: "https://randomuser.me/api/portraits/men/61.jpg" 
  },
  { 
    name: 'Sam', 
    comment: "I love how easy it is to log my meals and workouts.", 
    avatarUrl: "https://randomuser.me/api/portraits/men/9.jpg" 
  },
  { 
    name: 'Jordan', 
    comment: "The progress tracking feature keeps me motivated every day.", 
    avatarUrl: "https://randomuser.me/api/portraits/men/40.jpg" 
  }
];

const Testimonials = () => {
  return (
    <Box py={12} bg="gray.50">
      <Container maxW="container.xl">
        <Heading as="h2" size="2xl" textAlign="center" mb={8}>
          What Our Users Say
        </Heading>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
          {testimonials.map((testimonial, index) => (
            <Box
              key={index}
              borderWidth={1}
              borderColor="orange.400"
              borderRadius="md"
              p={6}
              boxShadow="md"
              bg="white"
              transition="transform 0.2s"
              _hover={{ transform: 'scale(1.05)' }} // Scale effect on hover
            >
              <Stack spacing={4} align="center">
                <Avatar name={testimonial.name} size="xl" src={testimonial.avatarUrl} />
                <Text fontWeight="bold" fontSize="lg">{testimonial.name}</Text>
                <Text color="gray.600" textAlign="center">
                  "{testimonial.comment}"
                </Text>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Container>
    </Box>
  );
};

export default Testimonials;
