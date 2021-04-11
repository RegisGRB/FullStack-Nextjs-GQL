import styled from "styled-components";
import StyledTheme from "../StyledComponents/StyledTheme";

const ThemeSize = ({ theme, size }, reduce) => {
  switch (size - reduce) {
    case 1:
      return `${theme.fontsize.mic}`;
    case 2:
      return `${theme.fontsize.sm}`;
    case 3:
      return `${theme.fontsize.md}`;
    case 4:
      return `${theme.fontsize.lg}`;
    case 5:
      return `${theme.fontsize.xl}`;
    default:
      return `${theme.fontsize.mic}`;
  }
};

const StyledText = styled(StyledTheme)`
  font-size: ${(props) => ThemeSize(props, 0)};

  @media (max-width: 768px) {
    font-size: ${(props) => ThemeSize(props, 1)};
  }
  @media (max-width: 468px) {
    font-size: ${(props) => ThemeSize(props, 2)};
  }
`;
StyledText.defaultProps = {
  fontcolor: "true",
  as: "span",
};
export default StyledText;
