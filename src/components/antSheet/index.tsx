import { Actionsheet, Box, Divider, Text } from "native-base";

import { AntDto } from "../../dtos/AntDto";

type AntSheetProps = {
  isOpen: boolean;
  onClose: () => void;
  ant: AntDto;
};

export const AntSheet = ({ ant, isOpen, onClose }: AntSheetProps) => {
  return (
    <Actionsheet isOpen={isOpen} onClose={onClose}>
      <Actionsheet.Content>
        <Box w="100%" h={60} px={4} justifyContent="center">
          <Text fontSize="xl" pt={10} pb={10} bold>
            {ant?.name}
          </Text>
          <Divider mb={10} />
        </Box>
        {ant &&
          Object.keys(ant).map(
            (key) =>
              key !== "name" && (
                <Text
                  textTransform={"capitalize"}
                  key={key}
                  px={4}
                  fontSize="md"
                  w={"100%"}
                  bold
                >
                  {key}: {ant[key]}
                </Text>
              )
          )}
      </Actionsheet.Content>
    </Actionsheet>
  );
};
