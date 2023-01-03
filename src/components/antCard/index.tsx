import { memo } from "react";
import { Text, Box, Flex, Divider, Pressable } from "native-base";
import { AntDto } from "../../dtos/AntDto";

type AntCardProps = {
  ant: AntDto;
  position: number;
  onPress: (ant: AntDto) => void;
};

export const AntCard = memo(({ ant, position, onPress }: AntCardProps) => {
  return (
    <Box
      style={{ backgroundColor: ant.color.toLocaleLowerCase() }}
      borderRadius={5}
      marginBottom={2}
      p={5}
      w={"100%"}
    >
      <Pressable onPress={() => onPress(ant)}>
        <Flex direction="row" h="58" p="4">
          <Text
            fontSize={"md"}
            bold
            color={"white"}
            alignSelf={"center"}
            mr={2}
          >
            {`${position}°`}
          </Text>
          <Text
            w={"70%"}
            isTruncated
            fontSize={"md"}
            bold
            color={"white"}
            textAlign={"left"}
          >
            {ant.name}
          </Text>
          <Divider bg="white" thickness="2" mx="2" orientation="vertical" />
          <Text fontSize={"md"} bold color={"white"} alignSelf={"center"}>
            {ant.probability}%
          </Text>
        </Flex>
      </Pressable>
    </Box>
  );
});
