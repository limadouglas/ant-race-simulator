import { Heading } from "native-base";

type HeaderProps = {
  title: string;
};

export const Header = ({ title }: HeaderProps) => (
  <Heading fontSize="2xl" pb="10">
    {title}
  </Heading>
);
