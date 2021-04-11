import React, { useEffect, useState } from "react";
import styled from "styled-components";
import helpers from "../../../utils/helpers";
import StyledTheme from "../../StyledComponents/StyledTheme";
import { AnimatePresence } from "framer-motion";
function Carousel({
  slideDuration = 20000,
  autoPlay = false,
  children,
  controls = false,
  progress = false,
  indicator = false,
  scrollcontrols = false,
}) {
  const [currentSlide, setSlide] = useState(0);
  const [isPlaying, setIsPlaying] = useState(autoPlay);
  const [showInfo, setShowInfo] = useState(false);
  const [isAnim, setisAnim] = useState(false);
  const numSlides = children ? children.length : 0;
  let slides = [];
  React.useEffect(() => {
    if (isPlaying) {
      const timeoutId = setTimeout(() => {
        handleNextClick();
      }, slideDuration);
      return () => clearTimeout(timeoutId);
    }
  }, [isPlaying, currentSlide,isAnim]);

  const GenerateSlide = () => {
    slides = React.Children.map(children, (child, i) => {
      if (i === currentSlide) {
        return React.cloneElement(child);
      }
    });
  };
  GenerateSlide();

  const scrollEvents = () => {
    let x = 0;
   let y = window.addEventListener("wheel", (e) => {
      if (!isAnim) {
        x += Math.sign(Math.abs(e.deltaY)) * 0.2;
        if (x === 1) {
          x = 0;
          if (e.deltaY > 0) {
            handleNextClick();
          } else {
            handlePrevClick();
          }
        }
      }
    });
  };
  React.useEffect(() => {
    scrollEvents();
  }, []);

  const handleIndexClick = (index) => {
    setisAnim(true);
    setSlide(index);
  };

  const handlePrevClick = () => {
    setisAnim(true);
    const nextIndex = (currentSlide - 1 + numSlides) % numSlides;
    setSlide(nextIndex);
  };

  const handleNextClick = () => {
    setisAnim(true);
    const nextIndex = (currentSlide + 1) % numSlides;
    setSlide(nextIndex);
  };

  const handleShowInfoClick = () => {
    setShowInfo(!showInfo);
  };

  const handlePlayClick = () => {
    setIsPlaying(!isPlaying);
  };

  const slideSelectors = [];
  
  // const DotGenerator = (i) => {
  //   slideSelectors.push(
  //     <Dot
  //       className={`carousel__selector${currentSlide === i ? " selected" : ""}`}
  //       onClick={() => handleIndexClick(i)}
  //     />
  //   );
  // };
  return (
    <div className="carousel">
      <AnimatePresence
        initial={false}
        exitBeforeEnter
        onExitComplete={() => {
          setisAnim(false);
        }}
      >
        {slides}
      </AnimatePresence>
      <div className="carousel__overlay">
        {indicator && (
          <div className="carousel__number">
            <NumberCurrent
              as="span"
              fontcolor
              className="carousel__number__current"
            >
              {numSlides >= 10 ? "" : 0}
              {currentSlide + 1}
            </NumberCurrent>
            <NumberNext as="span" fontcolor className="carousel__number__next">
              {numSlides >= 10 ? "" : 0}
              {numSlides}
            </NumberNext>
          </div>
        )}

        {controls && (
          <div className="carousel__controls">
            <IndicatorNext
              as="span"
              fontcolor
              className="carousel__controls__next"
              onClick={handleNextClick}
            >
              &#8594;
            </IndicatorNext>
            <IndicatorPrev
              as="span"
              fontcolor
              className="carousel__controls__prev"
              onClick={handlePrevClick}
            >
              &#8592;
            </IndicatorPrev>
          </div>
        )}
        {progress && (
          <ProgressBar
            key={currentSlide + isPlaying}
            animate={isPlaying}
            time={slideDuration}
          />
        )}
      </div>
    </div>
  );
}

const ProgressBar = ({ animate, time }) => {
  let progress = helpers.useProgress(animate, time);
  return (
    <div className="progress-bar">
      <Bar className="bar">
        <Progress
          className="progress"
          style={{ width: `${progress * 100}%` }}
        />
      </Bar>
    </div>
  );
};

const Bar = styled(StyledTheme)`
  ${(props) => props.theme.colors.primary};
  opacity: 0.3;
`;
const Progress = styled(StyledTheme)`
  ${(props) => props.theme.colors.primary};
`;
const NumberCurrent = styled(StyledTheme)``;
const NumberNext = styled(StyledTheme)``;
const IndicatorNext = styled(StyledTheme)``;
const IndicatorPrev = styled(StyledTheme)``;
const Dot = styled(StyledTheme)``;
export default Carousel;
