import { SwipeCarousel } from './swipe.js';
const options = {
  autoPlayInterval: 2000, // NUMBER, default: 10000, autoplay interval in ms
  isControlButtonsEnabled: true, // true or false, default: true, if need buttons for next and prev slides
  isControlPlayPauseEnabled: false, // true or false, default: true, if need buttons for play and pause
  isIndicatorsEnabled: true, // true or false, default: true, if need indicators
  isPauseAfterAction: false, // true or false, default: true, if need pause after action (buttons, sipe, indicators)
  isAnimateButtonsHandler: true, // true or false, default: true, if need animate buttons
  isAnimateButtonAutoplay: false, // true or false, default: true, if need animate buttons autoplay and indicators
  isPauseWhenMouseFocus: false, // true or false, default: false, if need pause when mouse focus on slide
};

const carousel = new SwipeCarousel(options);
carousel.initCarousel();
