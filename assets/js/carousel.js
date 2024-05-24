export class Carousel {
  constructor(options = {}) {
    try {
      const {
        containerIdName = '#carousel',
        slidesClassName = '.slide__item',
        isAutoplayCarousel = true,
        autoPlayInterval = 10000,
        isControlButtonsEnabled = true,
        isControlPlayPauseEnabled = true,
        isIndicatorsEnabled = true,
        isPauseAfterAction = false,
        isAnimateButtonsHandler = true,
        isAnimateButtonAutoplay = false,
        isPauseWhenMouseFocus = false,
        iconPause = '<i class="fas fa-pause" id="pause-btn"></i>',
        iconPlay = '<i class="fas fa-play" id="play-btn"></i>',
        iconPrev = '<i class="fas fa-angle-left" id="prev-btn"></i>',
        iconNext = '<i class="fas fa-angle-right" id="next-btn"></i>',
        iconDownload = '<i class="fa-solid fa-spinner"></i>',
        userStyles = {},
      } = options;

      this.containerIdName = containerIdName;
      this.slidesClassName = slidesClassName;

      this.autoplay = isAutoplayCarousel;
      this.interval = autoPlayInterval;
      this.isControlEnabled = isControlButtonsEnabled;
      this.isPauseBtnEnabled = isControlPlayPauseEnabled;
      this.isIndicatorEnabled = isIndicatorsEnabled;
      this.pauseAfterAction = isPauseAfterAction;
      this.animateHandler = isAnimateButtonsHandler;
      this.animateWhenAutoPlay = isAnimateButtonAutoplay;
      this.pauseWhenMouseFocus = isPauseWhenMouseFocus;


      // this.autoplay = isAutoplayCarousel;
      // this.interval = autoPlayInterval;
      // this.isControlEnabled = isControlButtonsEnabled;
      // this.isPauseBtnEnabled = this.isControlEnabled ? isControlPlayPauseEnabled : false;
      // this.isIndicatorEnabled = isIndicatorsEnabled;
      // this.pauseAfterAction = this.isControlEnabled ? isPauseAfterAction : false;
      // this.animateHandler = this.isControlEnabled ? isAnimateButtonsHandler : false;
      // this.animateWhenAutoPlay = this.isControlEnabled ? isAnimateButtonAutoplay : false;
      // this.pauseWhenMouseFocus = isPauseWhenMouseFocus;

      this.FA_PAUSE = iconPause;
      this.FA_PLAY = iconPlay;
      this.FA_PREV = iconPrev;
      this.FA_NEXT = iconNext;
      this.FA_DOWNLOAD = iconDownload;

      this.userStyles = userStyles;

    } catch (error) {
      console.error(error);
    }
  }

  _initProps() {
    this.container = document.querySelector(this.containerIdName);
    this.slides = this.container.querySelectorAll(this.slidesClassName);

    this.CODE_ARROW_LEFT = 'ArrowLeft';
    this.CODE_ARROW_RIGHT = 'ArrowRight';
    this.CODE_SPACE = 'Space';

    this.SLIDES_COUNT = this.slides.length;
    this.currentSlide = 0;

    this.isPlaying = this.autoplay;
    this.isMouseFocus = false;
  }
  _createElements(itemClass, itemId) {
    const control = document.createElement('div');
    control.setAttribute('class', itemClass);
    control.setAttribute('id', itemId);
    this.container.append(control);

    return this.container.querySelector(`#${itemId}`);
  }

  _initButtons() {
    this.PLAY_CLASS = 'control-play';
    return {
      PLAY: `<div class="control__item control-pause"><div id="pause-btn">${this.FA_PLAY}</div></div>`,
      PAUSE: `<div class="control__item control-pause"><div id="pause-btn">${this.FA_PAUSE}</div></div >`,
      PREV: `<div class="control__item control-prev"> <div id="prev-btn">${this.FA_PREV}</div></div >`,
      NEXT: `<div class="control__item control-next"> <div id="next-btn">${this.FA_NEXT} </div></div >`,
    }
  }
  _initControlItem() {
    const { PLAY, PAUSE, PREV, NEXT } = this._initButtons();
    this._createElements('control', 'control-container').innerHTML = this.isPauseBtnEnabled ? PREV + (!this.autoplay ? PLAY : PAUSE) + NEXT : PREV + NEXT;
  }

  _initIndicatorItem() {
    const indicatorContainer = this._createElements('indicator', 'indicator-container');

    this.slides.forEach((item, index) => {
      const indicator = `<div class="indicator__item" data-index="${index}"></div>`;
      indicatorContainer.innerHTML += indicator;
    });
  }


  _initElements() {
    if (this.isControlEnabled) {
      if (this.isPauseBtnEnabled) this.pauseBtn = this.container.querySelector('#pause-btn');
      this.prevBtn = this.container.querySelector('#prev-btn');
      this.nextBtn = this.container.querySelector('#next-btn');
    }

    if (this.isIndicatorEnabled) {
      this.indicatorsContainer = this.container.querySelector('#indicator-container');
      this.indicatorItems = this.indicatorsContainer.querySelectorAll('.indicator__item');
      if (this.indicatorItems.length === 0) this.container.querySelector('#indicator-container').childNodes;
    }
  }

  _initButtonsListeners() {
    this.pauseBtn?.addEventListener('click', this.pausePlayHandler.bind(this));
    this.nextBtn.addEventListener('click', this.nextHandler.bind(this));
    this.prevBtn.addEventListener('click', this.prevHandler.bind(this));
  }

  _initIndicatorsListeners() {
    this.indicatorsContainer.addEventListener('click', this._indicateHandler.bind(this));
  }

  _initMouseListeners() {
    this.container.addEventListener('mouseenter', (event) => this.pauseMouseFocus(event));
    this.container.addEventListener('mouseleave', (event) => this.playMouseFocus(event));
  }

  _initKeyListeners() {
    document.addEventListener('keydown', this._pressKey.bind(this));
  }

  _initListeners() {
    if (this.isControlEnabled) this._initButtonsListeners();
    if (this.isIndicatorEnabled) this._initIndicatorsListeners();
    if (this.pauseWhenMouseFocus) this._initMouseListeners();
    if (this.isControlEnabled || this.isIndicatorEnabled) this._initKeyListeners();
  }

  _initUserClasses() {
    Object.keys(this.userStyles).forEach(key => {
      const element = key === 'carousel' ? [this.container] : this.container.querySelectorAll(`.${key}`);
      element.forEach(item => item.setAttribute('style', this.userStyles[key]));
    });
  }

  _indicateHandler(e) {
    const { target } = e;
    const index = +target.dataset.index;
    if (target.classList.contains('indicator__item')) {
      if (this.animateHandler) {
        const direction = index < this.currentSlide ? this.prevBtn : this.nextBtn;
        this.btnAnimation(direction);
      };
      this.pauseHandler();
      this.gotoNth(index);
    }
  }

  _pressKey(e) {
    const { code } = e;

    if (code === this.CODE_ARROW_LEFT) { this.prevHandler(), e.preventDefault(); }
    if (code === this.CODE_ARROW_RIGHT) { this.nextHandler(), e.preventDefault(); }
    if (code === this.CODE_SPACE) { this.pausePlayHandler(), e.preventDefault(); }
  }

  _autoPlaySlide() {
    this.timerId = setInterval(() => this._autoPlayInterval(), this.interval);
  }

  _autoPlayInterval() {
    if (this.animateWhenAutoPlay) {
      this.btnAnimation(this.nextBtn);
    }
    this.gotoNext();
  }

  _toggleSlideClass() {
    this.slides[this.currentSlide].classList.toggle('slide__item--active');
    if (this.isIndicatorEnabled) { this.indicatorItems[this.currentSlide].classList.toggle('indicator__item--active') };
  }

  _changePauseBtn(btn) {
    if (this.isControlEnabled ?? this.isPauseBtnEnabled) {
      if (btn === 'pause') {
        this.pauseBtn.classList.add(this.PLAY_CLASS);
        this.pauseBtn.innerHTML = this.FA_PLAY;
      }
      if (btn === 'play') {
        this.pauseBtn.classList.remove(this.PLAY_CLASS);
        this.pauseBtn.innerHTML = this.FA_PAUSE;
      }
    }
  }
  gotoNth(n) {
    this._toggleSlideClass();
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this._toggleSlideClass();
  }

  gotoNext() {
    this.btnAnimation(this.nextBtn);
    this.gotoNth(this.currentSlide + 1);
  }

  gotoPrev() {
    this.btnAnimation(this.prevBtn);
    this.gotoNth(this.currentSlide - 1);
  }

  pauseHandler() {
    this.isPlaying = false;
    clearInterval(this.timerId);
    this._changePauseBtn('pause');
  }

  playHandler() {
    this.isPlaying = true;
    this._changePauseBtn('play');
    this._autoPlaySlide();
  }

  pausePlay() {
    this.isPlaying ? this.pauseHandler() : this.playHandler();
  }

  pausePlayHandler() {
    if (this.isControlEnabled && this.isPauseBtnEnabled) this.pausePlay()
  }

  pauseMouseFocus() {
    if (this.isMouseFocus) return
    this.isMouseFocus = true;
    if (this.isPlaying) this.pauseHandler()
  }

  playMouseFocus() {
    this.isMouseFocus = false;
    if (!this.isPlaying) this.playHandler()
  }

  nextHandler() {
    !this.pauseAfterAction || this.pauseHandler();
    this.gotoNext();
  }

  prevHandler() {
    !this.pauseAfterAction || this.pauseHandler();
    this.gotoPrev();
  }

  btnAnimation(btn) {
    if (this.isControlEnabled) {
      btn.classList.add('handleAnimation');
      setTimeout(() => btn.classList.remove('handleAnimation'), 500);
    };
  }

  _loadListener(type) {
    if (type === 'add') window.addEventListener('load', this.hideLoadingScreen.bind(this));
    if (type === 'remove') window.removeEventListener('load', this.hideLoadingScreen.bind(this));
  }

  hideLoadingScreen() {
    this.container.classList.toggle('carousel--loading');
    setTimeout(() => this.container.querySelector('#loading-screen').remove(), 1000);

    this._loadListener('remove');
    if (this.autoplay) this._autoPlaySlide();
  }

  initLoadingScreen() {
    this.container.classList.toggle('carousel--loading');
    this.container.insertAdjacentHTML('beforeend', `<div class="loading-screen" id="loading-screen">${this.FA_DOWNLOAD ?? ''}</div>`);
    this._loadListener('add');
  }

  initCarousel() {
    this._initProps();
    this.initLoadingScreen();
    !this.isControlEnabled || this._initControlItem();
    !this.isIndicatorEnabled || this._initIndicatorItem();
    this._initElements();
    this._initListeners();
    this._initUserClasses();
    this._toggleSlideClass();
  }
};