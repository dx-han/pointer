import { HStack, Icon, Text } from "@chakra-ui/react";
import { VscCircleFilled } from "react-icons/vsc";
import mytheme from "./const";

type ConnectionStatusProps = {
  connection: "connected" | "disconnected" | "desynchronized";
};

function ConnectionStatus({ connection }: ConnectionStatusProps) {
  return (
    <HStack spacing={1} mt={3}>
      <Icon
        as={VscCircleFilled}
        color={
          {
            connected: "green.500",
            disconnected: "orange.500",
            desynchronized: "red.500",
          }[connection]
        }
      />
      <Text fontSize="sm" fontWeight="bold" color={mytheme.color.shallow2dark}>
        {
          {
            connected: "You are connected!",
            disconnected: "Connecting to the server...",
            desynchronized: "Disconnected, please refresh.",
          }[connection]
        }
      </Text>
    </HStack>
  );
}

export default ConnectionStatus;
