function Carousel(options = {}) {
  try {
    const {
      containerIdName = '#carousel',
      slidesClassName = '.slide__item',

      isAutoplayCarousel = true,
      AutoplayInterval = 10000,
      isControlButtonsEnabled = true,
      isControlPlayPauseEnabled = true,
      isIndicatorsEnabled = true,
      isPauseAfterAction = false,
      isAnimateButtonsHandler = true,
      isAnimateButtonAutoplayAndIndicators = false,
      isPauseWhenMouseFocus = false,

      iconPause = '<i class="fas fa-pause" id="pause-btn"></i>',
      iconPlay = '<i class="fas fa-play" id="play-btn"></i>',
      iconPrev = '<i class="fas fa-angle-left" id="prev-btn"></i>',
      iconNext = '<i class="fas fa-angle-right" id="next-btn"></i>',
      iconDownload = '<i class="fa-solid fa-spinner"></i>',

      userStyles = {},
    } = options;

    this.container = document.querySelector(containerIdName);
    this.slides = this.container.querySelectorAll(slidesClassName);

    this.autoplay = isAutoplayCarousel;
    this.interval = AutoplayInterval;
    this.isControlEnabled = isControlButtonsEnabled;
    this.isPauseBtnEnabled = this.isControlEnabled ? isControlPlayPauseEnabled : false;
    this.isIndicatorEnabled = isIndicatorsEnabled;
    this.pauseAfterAction = this.isControlEnabled ? isPauseAfterAction : false;
    this.animateHandler = this.isControlEnabled ? isAnimateButtonsHandler : false;
    this.animateGoTo = this.isControlEnabled ? isAnimateButtonAutoplayAndIndicators : false;
    this.pauseWhenMouseFocus = isPauseWhenMouseFocus;

    this.FA_PAUSE = iconPause;
    this.FA_PLAY = iconPlay;
    this.FA_PREV = iconPrev;
    this.FA_NEXT = iconNext;
    this.FA_DOWNLOAD = iconDownload;

    this.userStyles = userStyles;

    this.SLIDES_COUNT = this.slides.length
    this.CODE_ARROW_LEFT = 'ArrowLeft'
    this.CODE_ARROW_RIGHT = 'ArrowRight'
    this.CODE_SPACE = 'Space'

    this.currentSlide = 0
    this.isPlaying = this.autoplay

  } catch (error) {
    console.error(error)
  }
}


Carousel.prototype = {
  _initControls() {
    const controls = document.createElement('div')
    controls.setAttribute('class', 'control')
    controls.setAttribute('id', 'control-container')

    const PLAY = `<div class="control__item control-pause"><div id="pause-btn">${this.FA_PLAY}</div></div>`
    const PAUSE = `<div class="control__item control-pause"><div id="pause-btn">${this.FA_PAUSE}</div></div>`
    const PREV = `<div class="control__item control-prev"><div id="prev-btn">${this.FA_PREV}</div></div>`
    const NEXT = `<div class="control__item control-next"><div id="next-btn">${this.FA_NEXT} </div></div>`

    this.PLAY_CLASS = 'control-play';

    controls.innerHTML = this.isPauseBtnEnabled ? PREV + (!this.autoplay ? PLAY : PAUSE) + NEXT : PREV + NEXT;
    this.container.append(controls)
  },

  _initIndicators() {
    const indicators = document.createElement('div')

    indicators.setAttribute('class', 'indicator')
    indicators.setAttribute('id', 'indicator-container')
    this.container.append(indicators)

    this.slides.forEach((item, index) => {
      const indicator = `<div class="indicator__item" data-index="${index}"></div>`
      indicators.innerHTML += indicator
    })
  },


  _initListeners() {
    if (this.isControlEnabled) {
      !this.isPauseBtnEnabled || (this.pauseBtn = this.container.querySelector('#pause-btn'));
      this.prevBtn = this.container.querySelector('#prev-btn')
      this.nextBtn = this.container.querySelector('#next-btn')

      this.pauseBtn?.addEventListener('click', this.pausePlayHandler.bind(this))
      this.nextBtn.addEventListener('click', this.nextHandler.bind(this))
      this.prevBtn.addEventListener('click', this.prevHandler.bind(this))
    }
    if (this.isIndicatorEnabled) {
      this.indicatorsContainer = this.container.querySelector('#indicator-container')
      this.indicatorItems = this.indicatorsContainer.querySelectorAll('.indicator__item').length === 0 ? this.container.querySelector('#indicator-container').childNodes : this.indicatorsContainer.querySelectorAll('.indicator__item')

      this.indicatorsContainer.addEventListener('click', this._indicateHandler.bind(this))
    }

    if (this.pauseWhenMouseFocus) {
      this.slideContainer = this.container.querySelector('#slide-container')

      this.container.addEventListener('mouseenter', this.pausePlayHandler.bind(this));
      this.container.addEventListener('mouseleave', this.pausePlayHandler.bind(this));
    }

    document.addEventListener('keydown', this._pressKey.bind(this))
  },

  _initUserClasses() {
    Object.keys(this.userStyles).forEach(key => {
      const element = key === 'carousel' ? [this.container] : this.container.querySelectorAll(`.${key}`)
      element.forEach(item => item.setAttribute('style', this.userStyles[key]))
    })
  },

  _initFirstSlide() {
    this.slides[this.currentSlide].classList.toggle('slide__item--active')
    !this.isIndicatorEnabled || this.indicatorItems[this.currentSlide].classList.toggle('indicator__item--active')
  },

  _indicateHandler(e) {
    const { target } = e
    if (target.classList.contains('indicator__item')) {
      this.pauseHandler()
      this.gotoNth(+target.dataset.index)
    }
  },

  _pressKey(e) {
    const { code } = e

    if (code === this.CODE_ARROW_LEFT) { this.prevHandler(), e.preventDefault() }
    if (code === this.CODE_ARROW_RIGHT) { this.nextHandler(), e.preventDefault() }
    if (code === this.CODE_SPACE) { this.pausePlayHandler(), e.preventDefault() }
  },

  _autoPlaySlide() {
    this.timerId = setInterval(() => this.gotoNext(), this.interval)
  },

  gotoNth(n) {
    this.slides[this.currentSlide].classList.toggle('slide__item--active');
    !this.isIndicatorEnabled || this.indicatorItems[this.currentSlide].classList.toggle('indicator__item--active');
    !this.animateGoTo || (n < this.currentSlide ? this.btnAnimation(this.prevBtn) : this.btnAnimation(this.nextBtn));
    this.currentSlide = (n + this.SLIDES_COUNT) % this.SLIDES_COUNT;
    this.slides[this.currentSlide].classList.toggle('slide__item--active');
    !this.isIndicatorEnabled || this.indicatorItems[this.currentSlide].classList.toggle('indicator__item--active');
  },

  gotoNext() {
    (!this.isControlEnabled && !this.animateHandler) || this.btnAnimation(this.nextBtn);
    this.gotoNth(this.currentSlide + 1)
  },

  gotoPrev() {
    (!this.isControlEnabled && !this.animateHandler) || this.btnAnimation(this.prevBtn);
    this.gotoNth(this.currentSlide - 1)
  },

  pauseHandler() {
    if (this.isControlEnabled && this.isPauseBtnEnabled) {
      this.isPlaying = false
      clearInterval(this.timerId)
      this.pauseBtn.classList.add(this.PLAY_CLASS)
      this.pauseBtn.innerHTML = this.FA_PLAY
    }
  },

  playHandler() {
    if (this.isControlEnabled && this.isPauseBtnEnabled) {
      this.isPlaying = true
      this.pauseBtn.classList.remove(this.PLAY_CLASS)
      this.pauseBtn.innerHTML = this.FA_PAUSE
      this._autoPlaySlide()
    }
  },

  pausePlayHandler() {
    this.isPlaying ? this.pauseHandler() : this.playHandler()
  },

  nextHandler() {
    !this.pauseAfterAction || this.pauseHandler();
    this.gotoNext()
  },

  prevHandler() {
    !this.pauseAfterAction || this.pauseHandler();
    this.gotoPrev()
  },

  btnAnimation(btn) {
    btn.classList.add('handleAnimation')
    setTimeout(() => btn.classList.remove('handleAnimation'), 500)
  },

  hideLoadingScreen() {
    this.container.classList.toggle('carousel--loading')
    setTimeout(() => this.container.querySelector('#loading-screen').remove(), 1000)
    window.removeEventListener('load', this.hideLoadingScreen.bind(this))
    !this.autoplay || this._autoPlaySlide()
  },

  initLoadingScreen() {
    this.container.classList.toggle('carousel--loading')
    this.container.insertAdjacentHTML('beforeend', `<div class="loading-screen" id="loading-screen">${this.FA_DOWNLOAD ?? ''}</div>`);

    window.addEventListener('load', this.hideLoadingScreen.bind(this))
  },

  initCarousel() {
    this.initLoadingScreen()
    !this.isControlEnabled || this._initControls()
    !this.isIndicatorEnabled || this._initIndicators()
    this._initListeners()
    this._initUserClasses()
    this._initFirstSlide()
  }
}

Carousel.prototype.constructor = Carousel;