import { SwipeCarousel } from './swipe.js';
const options = {
  containerIdName: '#carousel', // default: '#carousel', id of container for carousel
  slidesClassName: '.slide__item', // default: '.slide__item', class of slides in carousel

  isAutoplayCarousel: true, // true or false, default: true, autoplay carousel true, or false if dont need autoplay
  AutoplayInterval: 5000, // NUMBER, default: 10000, autoplay interval in ms
  isControlButtonsEnabled: true, // true or false, default: true, if need buttons for next and prev slides
  isControlPlayPauseEnabled: true, // true or false, default: true, if need buttons for play and pause
  isIndicatorsEnabled: true, // true or false, default: true, if need indicators
  isPauseAfterAction: true, // true or false, default: true, if need pause after action (buttons, sipe, indicators)
  isAnimateButtonsHandler: true, // true or false, default: true, if need animate buttons
  isAnimateButtonAutoplayAndIndicators: true, // true or false, default: true, if need animate buttons autoplay and indicators
  isPauseWhenMouseFocus: false, // true or false, default: false, if need pause when mouse focus on slide

  // // You can change icons or imgs in buttons in html format. This option is only for example
  // iconPause: '<img src="https://smash-cs.ru/uploads/posts/2017-12/4506.jpg" alt="">',
  // iconPlay: '<img src="https://play-lh.googleusercontent.com/rOUBIcG7fDsC7hJsAZtJShIlONJ0-X-D5Wu4jROuAXPLxZmsVyoc3Vw1M6UnNm9jkA" alt="">',
  // iconPrev: '<i class="fas fa-angle-left" id="prev-btn"></i>',
  // iconNext: '<img src="https://img.freepik.com/premium-photo/red-arrow-isolated-with-white-background_698953-6319.jpg" alt="">',
  // iconDownload: '<i class="fa-solid fa-spinner"></i>',

  // // custom user css styles, for example if you want to change color of indicators or control buttons. This classes is only for example
  // userStyles: {
  //   // for carousel container style, height and width or other properties
  //   'carousel': '',

  //   // for slides container style, position and height or width or other properties
  //   'slide': '',

  //   // for indicator style
  //   'indicator': '',
  //   'indicator__item': 'background-color: red; border-color: yellow; border-radius: 0; opacity: 1;',

  //   // for control buttons style
  //   'control': '',
  //   'control__item': '',

  //   // for loading screen style
  //   'loading-screen': 'background-color: red;'
  // }
};

const carousel = new SwipeCarousel(options);
carousel.initCarousel();