import { Fab, IFabProps } from "native-base";

type ButtonFabProps = IFabProps & {
  label: string;
  onPress: () => void;
  isLoading: boolean;
};

export const ButtonFab = ({
  onPress,
  isLoading,
  label,
  ...rest
}: ButtonFabProps) => (
    <Fab
      shadow={2}
      bottom={10}
      bgColor={"#18a100e2"}
      size="lg"
      label={label}
      onPress={onPress}
      isLoadingText="Loading"
      isLoading={isLoading}
      w={'92%'}
      {...rest}
    />
);
