import styled from "styled-components";
import StyledTheme from "../StyledComponents/StyledTheme";
import { motion } from "framer-motion";
const Input = styled(StyledTheme)`
  &:not([type="Submit"]) {
    padding: 0px 30px 0px 2px;
    width: 100%;
    cursor: pointer;
    margin: 5px;
    color: ${(props) => props.theme.colors.primary};
    border: unset;
    border-bottom: 2px solid #cbd5e1;
    background-color: unset;
    box-shadow: 0 0 0 0 rgb(108 41 245 / 0.05);
    outline: 0;
    transition: border-color 0.3s, box-shadow 0.3s ease;
    &:not(:last-child) {
      margin-bottom: 12px;
    }
    &:hover {
    }
    &:focus {
      border-color: ${(props) => props.theme.colors.primary};
      // box-shadow: 0 0 0 4px rgb(108 41 245 / 0.05);
    }
    &::placeholder {
      color: ${(props) => props.theme.colors.primary};
      opacity: 0.8;
    }
  }
  &[type="Submit"] {
    letter-spacing:5px;
    padding: 10px 40px 10px 40px;
    cursor: pointer;
    margin: 5px;
    text-transform:capitalize;
    color: ${(props) => props.theme.colors.secondary};
    background: ${(props) => props.theme.colors.primary};
    box-shadow: 0 0 0 0 rgb(108 41 245 / 0.05);
    outline: 0;
    transition: border-color 0.3s, box-shadow 0.3s ease;
    &:not(:last-child) {
      margin-bottom: 12px;
    }
    &:disabled{
      background:pink!important;
    }
    &:hover {
    }
    &:focus {
      border-color: ${(props) => props.theme.colors.primary};
      // box-shadow: 0 0 0 4px rgb(108 41 245 / 0.05);
    }
    &::placeholder {
      color: ${(props) => props.theme.colors.primary};
      opacity: 0.8;
    }
    @media (max-width: 768px) {
      padding: 10px 20px 10px 20px;
    }
  }
`;
Input.defaultProps = {
  as: motion.div,
};
export default Input;
