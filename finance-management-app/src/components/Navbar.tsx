// filepath: /c:/Users/user/Desktop/Finance Management with Authentication/finance-management-app/src/components/Navbar.tsx
import { Box, Button, Flex, Heading, Spacer } from "@chakra-ui/react";

const Navbar: React.FC = () => {
  return (
    <Flex as="nav" padding="1.5rem" bg="teal.500" color="white">
      <Heading as="h1" size="lg">
        Finance Management
      </Heading>
      <Spacer />
      <Button variant="outline" mr="4">
        Login
      </Button>
      <Button variant="solid" colorScheme="teal">
        Sign Up
      </Button>
    </Flex>
  );
};

export default Navbar;