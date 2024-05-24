const options = {
  autoPlayInterval: 2000,
  isControlButtonsEnabled: true,
  isControlPlayPauseEnabled: true,
  isIndicatorsEnabled: true,
  isPauseAfterAction: true,
  isAnimateButtonsHandler: true,
  isAnimateButtonAutoplay: true,
  isPauseWhenMouseFocus: false,
}

function createCarousel(options) {
  try {
    const carousel = new SwipeCarousel(options);
    console.log('SwipeCarousel available.');
    return carousel;
  } catch (error) {
    console.log('SwipeCarousel not available. Falling back to Carousel.');
    return new Carousel(options);
  }
}

const carousel = createCarousel(options);
carousel.initCarousel();