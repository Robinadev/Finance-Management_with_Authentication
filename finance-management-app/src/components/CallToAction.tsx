// filepath: /c:/Users/user/Desktop/Finance Management with Authentication/finance-management-app/src/components/CallToAction.tsx
import { Box, Button } from "@chakra-ui/react";

const CallToAction: React.FC = () => {
  return (
    <Box textAlign="center" py={10} px={6}>
      <Button colorScheme="teal" size="lg">
        Sign Up
      </Button>
    </Box>
  );
};

export default CallToAction;