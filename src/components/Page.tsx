import { PropsWithChildren } from "react";
import styled from "styled-components";

export interface PageProps {
  className?: string;
}

export const Page = styled(
  ({ className, children }: PropsWithChildren<PageProps>) => {
    return <div className={className}>{children}</div>;
  }
)`
  padding: 30px 20px;
`;
