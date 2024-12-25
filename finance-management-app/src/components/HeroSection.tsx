// filepath: /c:/Users/user/Desktop/Finance Management with Authentication/finance-management-app/src/components/HeroSection.tsx
import { Box, Heading, Text, Button } from "@chakra-ui/react";

const HeroSection: React.FC = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Heading as="h2" size="xl" mt={6} mb={2}>
        Manage Your Finances Efficiently
      </Heading>
      <Text color={"gray.500"}>
        Our app helps you track your expenses, set budgets, and achieve your financial goals.
      </Text>
      <Button colorScheme="teal" mt={4}>
        Learn More
      </Button>
    </Box>
  );
};

export default HeroSection;