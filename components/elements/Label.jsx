import styled from "styled-components";
import SpanText from "./SpanText";
const Label = styled.label`
  position: absolute;
  left: 5px;
  top: -3px;
  color: ${(props) => props.theme.colors.primary};
  transition: all 0.3 ease;
  input:not([value=""]) ~ label {
    top: -20px;
    opacity: 0.5;
  }
  input:focus ~ label {
    top: -20px;
    opacity: 0.5;
  }
  select ~ & {
    top: -10px!important;
    opacity: 0.5!important;
  }
  input[type="Checkbox"] ~ & {
    top: -3px!important;
    opacity: 1!important;
  }
`;
Label.defaultProps = {
  as: "label",
};
export default Label;
