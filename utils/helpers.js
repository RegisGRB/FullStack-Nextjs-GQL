import React from "react";
import { ThemeContext } from "../context";

const helpers = {
  getrandomInt: (max) => {
    return Math.floor(Math.random() * Math.floor(max));
  },
  randomizeArray: (array) => {
    var i, j, tmp;
    for (i = array.length - 1; i > 0; i--) {
      j = helpers.getrandomInt(i + 1);
      tmp = array[i];
      array[i] = array[j];
      array[j] = tmp;
    }
    return array;
  },
  generateKey: (prefixer) => {
    return `${prefixer}_${new Date().getTime()}`;
  },
  lerp: (a, b, n) => (1 - n) * a + n * b,
  getMousePos: (e) => {
    let posx = 0;
    let posy = 0;
    if (!e) e = window.event;
    if (e.clientX || e.clientY) {
      posx = e.clientX;
      posy = e.clientY;
    }
    return { x: posx, y: posy };
  },
  getSiblings: (e) => {
    let siblings = [];
    if (!e.parentNode) {
      return siblings;
    }
    let sibling = e.parentNode.firstChild;
    while (sibling) {
      if (sibling.nodeType === 1 && sibling !== e) {
        siblings.push(sibling);
      }
      sibling = sibling.nextSibling;
    }
    return siblings;
  },
 useProgress: (animate, time) => {
    let [progress, setProgress] = React.useState(0);
    React.useEffect(
      () => {
        if (animate) {
          let rafId = null;
          let start = null;
          
          let step = timestamp => {
            if (!start) start = timestamp;
            let progress = timestamp - start;
            setProgress(progress);
            if (progress < time) {
              rafId = requestAnimationFrame(step);
            }
          };
          rafId = requestAnimationFrame(step);
          return () => cancelAnimationFrame(rafId);
        }
      },
      [animate, time]
    );
  
    return animate ? Math.min(progress / time, time) : 0;
  },

  ColorDifficulty: (difficulty) => {
    const ThemeContextx = React.useContext(ThemeContext);
    switch (difficulty) {
      case "easy": 
      return ThemeContextx.difficulty.easy;
      case "normal": 
      return ThemeContextx.difficulty.normal;
      case "hard": 
      return ThemeContextx.difficulty.hard;
      case "veryHard": 
      return ThemeContextx.difficulty.veryHard;
      default:
        return ThemeContextx.difficulty.easy;
    }
  },
  
  IsTab: () => {
    const ThemeContextx = React.useContext(ThemeContext);

   return window.innerWidth <= ThemeContextx.breakpointsValue.md
  }
};
export default helpers;
