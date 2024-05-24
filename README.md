# Cool Slide

Cool Slide is a lightweight, minimalist, and elegant carousel slider with smooth animations and extensive customization options. This project is designed with two different approaches available in separate GitHub branches: one using ES6 classes and constructor functions (this branch), and the other using functional prototyping and inheritance.

## Getting Started

### Prerequisites

To use Cool Slide, you need to include the following dependencies in your HTML file:

- Font Awesome for control icons
- Cool Slide CSS and JavaScript files

### Installation

1. Clone the repository:

```
git clone git@github.com:aleksandrbondar/Carousel.git
```

2. Include the required CSS and JS files in your HTML:

```
<link rel="stylesheet" href="assets/css/style.css">
<script src="assets/js/index.js"></script>
```

3. Add the HTML structure for the carousel:

- Body of slider

```
<div class="carousel" id="carousel">
  <div class="slide" id="slide-container">
    <div class="slide__item"><img src="assets/img/1.jpg" alt="Image 1"></div>
    <div class="slide__item"><img src="assets/img/2.jpg" alt="Image 2"></div>
    <!-- Add more slides as needed -->
  </div>
</div>
```

- If You need carousel with swipes

Use the following JavaScript code in index.html

```
  <script src="assets/js/carousel.js"></script>
  <script src="assets/js/swipe.js"></script>
  <script src="assets/js/index.js"></script>
```

- Or without swipes

Use the following JavaScript code in index.html

```
  <script src="assets/js/carousel.js"></script>
  <script src="assets/js/index.js"></script>
```


4. Initialization

To initialize the slider, use the following JavaScript code options in index.js:

```
const options = {
  containerIdName: '#carousel',
  slidesClassName: '.slide__item',
  isAutoplayCarousel: true,
  AutoplayInterval: 5000,
  isControlButtonsEnabled: true,
  isControlPlayPauseEnabled: true,
  isIndicatorsEnabled: true,
  isPauseAfterAction: true,
  isAnimateButtonsHandler: true,
  isAnimateButtonAutoplayAndIndicators: true,
  isPauseWhenMouseFocus: false,
};
```


### Configuration Options

The slider can be customized with the following options:

| Option | Type    | Default Value | Description                           |
|--------|---------|---------------|---------------------------------------|
| containerIdName | String  | '#carousel'    | The ID of the carousel container.    |
| slidesClassName | String  | '.slide__item' | The class name of each slide.        |
| isAutoplayCarousel | Boolean | true          | Enables or disables autoplay.        |
| AutoplayInterval | Number  | 10000         | The interval between slide changes in milliseconds. |
| isControlButtonsEnabled | Boolean | true     | Shows or hides the control buttons (next/prev). |
| isControlPlayPauseEnabled | Boolean | true   | Shows or hides the play/pause button. |
| isIndicatorsEnabled | Boolean | true        | Shows or hides the slide indicators. |
| isPauseAfterAction | Boolean | false        | Pauses autoplay after user interaction. |
| isAnimateButtonsHandler | Boolean | true    | Enables or disables button animation on hover. |
| isAnimateButtonAutoplayAndIndicators | Boolean | false | Enables or disables animation for indicators and autoplay button. |
| isPauseWhenMouseFocus | Boolean | false     | Pauses autoplay when the mouse is over the carousel. |
| iconPause | String  | '<i class="fas fa-pause"></i>' | HTML for the pause icon. |
| iconPlay | String  | '<i class="fas fa-play"></i>'   | HTML for the play icon. |
| iconPrev | String  | '<i class="fas fa-angle-left"></i>' | HTML for the previous icon. |
| iconNext | String  | '<i class="fas fa-angle-right"></i>' | HTML for the next icon. |
| iconDownload | String | '<i class="fa-solid fa-spinner"></i>' | HTML for the loading spinner icon. |


## For example, you can use this code in index,js, object options

```
const options = {
  containerIdName: '#carousel', // default: '#carousel', id of container for carousel
  slidesClassName: '.slide__item', // default: '.slide__item', class of slides in carousel

  isAutoplayCarousel: true, // true or false, default: true, autoplay carousel true, or false if dont need autoplay
  autoPlayInterval: 5000, // NUMBER, default: 10000, autoplay interval in ms
  isControlButtonsEnabled: true, // true or false, default: true, if need buttons for next and prev slides
  isControlPlayPauseEnabled: true, // true or false, default: true, if need buttons for play and pause
  isIndicatorsEnabled: true, // true or false, default: true, if need indicators
  isPauseAfterAction: true, // true or false, default: true, if need pause after action (buttons, sipe, indicators)
  isAnimateButtonsHandler: true, // true or false, default: true, if need animate buttons
  isAnimateButtonAutoplayAndIndicators: true, // true or false, default: true, if need animate buttons autoplay and indicators
  isPauseWhenMouseFocus: false, // true or false, default: false, if need pause when mouse focus on slide

  // You can change icons or imgs in buttons in html format. This option is only for example
  userIcons: {
  iconPause: '<img src="https://smash-cs.ru/uploads/posts/2017-12/4506.jpg" alt="">',
  iconPlay: '<img src="https://play-lh.googleusercontent.com/rOUBIcG7fDsC7hJsAZtJShIlONJ0-X-D5Wu4jROuAXPLxZmsVyoc3Vw1M6UnNm9jkA" alt="">',
  iconPrev: '<i class="fas fa-angle-left" id="prev-btn"></i>',
  iconNext: '<img src="https://img.freepik.com/premium-photo/red-arrow-isolated-with-white-background_698953-6319.jpg" alt="">',
  iconDownload: '<i class="fa-solid fa-spinner"></i>'
  },

  // custom user css styles, for example if you want to change color of indicators or control buttons. This classes is only for example
  userStyles: {
    // for carousel container style, height and width or other properties
    'carousel': '',

    // for slides container style, position and height or width or other properties
    'slide': '',

    // for indicator style
    'indicator': '',
    'indicator__item': 'background-color: red; border-color: yellow; border-radius: 0; opacity: 1;',

    // for control buttons style
    'control': '',
    'control__item': '',

    // for loading screen style
    'loading-screen': 'background-color: red;'
  }
};
```


### GitHub Branches
Cool Slide is available in two different approaches, available on separate branches:

1. Class-Based Implementation (this branch): Uses ES6 classes and constructor functions for a modern JavaScript approach.
2. Functional Prototyping and Inheritance: Uses traditional prototyping and inheritance for compatibility with older JavaScript versions.

To switch between branches, use the following commands:

# For class-based implementation
```
git checkout classes-based
```

# For functional prototyping and inheritance
```
git checkout functional-prototyping
```

### This project is licensed under the MIT License - see the LICENSE file for details.


This `README.md` provides a comprehensive guide to setting up and customizing the slider, with clear instructions on initialization and configuration. It also highlights the two different implementation approaches available on separate branches.