import React from "react";
import { createGlobalStyle } from "styled-components";
import { LangProvider } from "./LangContext";
import { ThemeProviderContext } from "./ThemeContext";
import { UserProviderContext } from "./UserContext";
import { AuthProvider } from "./AuthContext";
const ContextContainer = ({ children, ...props }) => {
  return (
    <AuthProvider>
      <UserProviderContext>
        <ThemeProviderContext>
          <GlobalStyle />
          <LangProvider>{children}</LangProvider>
        </ThemeProviderContext>
      </UserProviderContext>
    </AuthProvider>
  );
};
const GlobalStyle = createGlobalStyle`
body,html {
  background-color:${(props) => props.theme.colors.secondary};
  color:${(props) => props.theme.colors.primary};
  border-color:${(props) => props.theme.colors.primary};
  transition:color 0.1s,background-color 0.1s,border-color 0.1s;
}
`;

export default ContextContainer;
