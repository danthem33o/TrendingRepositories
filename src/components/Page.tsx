import { Container } from "@mui/material";
import { PropsWithChildren } from "react";
import { Header } from "./Header";

export const Page = ({ children }: PropsWithChildren) => {
  return (
    <Container maxWidth="lg">
      <Header />
      <main>{children}</main>
    </Container>
  );
};
