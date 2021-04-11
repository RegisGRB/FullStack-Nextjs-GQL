import React from "react";
import Slider from "react-slick";
import useSize from "../../Hooks/useSize";
import { ThemeContext } from "../../context";
import styled from "styled-components";
const Carousel = ({ children }) => {
  const [active, setactive] = React.useState(false); // just for grabbing the slider and make it scale
  const screenWidth = useSize().width;
  const ThemeContextx = React.useContext(ThemeContext);
  const list = React.useRef(null);

  React.useEffect(() => {
    if (screenWidth >= ThemeContextx.breakpoints.md) MouseScreen();
  }, [screenWidth,ThemeContextx]);

  const MouseScreen = () => {
    list.current.addEventListener("mousedown", () => {
      setactive(true);
    });
    list.current.addEventListener("mouseleave", () => {
      setactive(false);
    });
    list.current.addEventListener("mouseup", () => {
      setactive(false);
    });
  };
  return (
    <StyledlList ref={list} active={active}>
      {/* slider from react slick */}
      <Slider {...settings}>{children}</Slider> 
    </StyledlList>
  );
};

export default Carousel;

const settings = {
  infinite: true,
  lazyload: false,
  speed: 600,
  centerMode: true,
  centerPadding: 0,
  arrows: false,
  easing: "linear",
  focusOnSelect: true,
  swipeToSlide: true,
  slidesToShow: 3,
  initialSlide: 0,

  responsive: [
    {
      breakpoint: 768,
      settings: {
        slidesToShow: 1,
        initialSlide:0,
      },
    },
  ],
};
const StyledlList = styled.div`
  transform: scale(0.98);
  transition: all 0.2s;
  user-select: none;
  cursor: pointer;
  background: ${(props) => (props.active ? "" : "")};
  cursor: ${(props) => (props.active ? "grabbing" : "")};
  cursor: ${(props) => (props.active ? "-webkit-grabbing" : "")};
  transform: ${(props) => (props.active ? "scale(1)" : "")};
`;
