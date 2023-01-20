import React from 'react';

const DEFAULT = {
  type: 'message',
  text: 'hello',
  position: 'top-right',
  autoClose: 5000,
  showProgress: true
}

class Toast {
  #toastElem
  #parentContainer
  #bindedRemove
  #autoCloseTimeout
  #progressInterval
  #bindedAutoRemove
  #startTime
  #autoClose
  #showProgress
  #bindedOnEnter
  #bindedOnLeave
  #hovering = false
  #timeDiff = 0


  constructor(options) {
    this.#toastElem = document.createElement('div');
    this.#toastElem.classList.add('toast');
    this.#bindedRemove = this.remove.bind(this);
    this.#bindedAutoRemove = this.autoRemove.bind(this);
    this.#bindedOnEnter = this.onhover.bind(this);
    this.#bindedOnLeave = this.onleave.bind(this);
    // this.#setH
    this.#toastElem.addEventListener('click', this.#bindedRemove);
    this.#toastElem.addEventListener('mouseenter',this.#bindedOnEnter);
    this.#toastElem.addEventListener('mouseleave',this.#bindedOnLeave);
    this.update(options);
  }

  set type(value) {
    this.#toastElem.dataset.type = value;
  }

  set text(value) {
    this.#toastElem.textContent = value;
  }

  set position(value) {
    if (this.#parentContainer && this.#parentContainer.hasChildNodes())
      this.#parentContainer.remove();

    this.#parentContainer = createParent(value);
    this.#parentContainer.append(this.#toastElem);
    requestAnimationFrame(() => {
      this.#toastElem.classList.add('show');
    })
    // // console.log(this.#parentContainer);
  }

  set autoClose(value) {
    this.#autoClose = value;
    this.#toastElem.style.setProperty('--progress', 0);
  }

  set showProgress(value) {
    this.#showProgress = value;
  }


  update(options) {
    options = { ...DEFAULT, ...options };
    // console.log(options);

    if (options.type === 'promise-pending')
      options = { ...options, autoClose: false, showProgress: false };

    // // console.log(options);
    Object.entries(options).forEach(([key, value]) => {
      this[key] = value;
    })
    this.#startTime = new Date() - 0;
    this.#bindedAutoRemove();

  }

  remove() {
    clearTimeout(this.#autoCloseTimeout);
    clearInterval(this.#progressInterval);
    this.#toastElem.removeEventListener('click', this.#bindedRemove);
    this.#toastElem.classList.remove('show');
    const fun = () => {
      this.#toastElem.removeEventListener('transitionend',fun);
      this.#toastElem.remove();
      if (this.#parentContainer?.hasChildNodes())
        return;
      this.#parentContainer.remove();
    }
    this.#toastElem.addEventListener('transitionend',fun);
  }

  autoRemove() {
    if (this.#autoClose === false)
      return;

    if (this.#showProgress === false) {
      this.#autoCloseTimeout = setTimeout(() => {
        this.remove();
      }, this.#autoClose);
    }
    else {
      this.onleave();
    }
  }
  
  onhover(){
    this.#hovering = true;
    clearInterval(this.#progressInterval);
    this.#timeDiff = new Date() - this.#startTime;
    // // console.log('enter');
  }
  onleave(){
    this.#hovering = false;
    this.#startTime = new Date() - this.#timeDiff;
    this.#progressInterval = setInterval(() => {        
      let timepassed = new Date() - (this.#startTime);
      let progress = (timepassed / this.#autoClose) * 100;
      if (progress > 100) {
        this.remove();
        return;
      }
      // // console.log(progress)
      this.#toastElem.style.setProperty('--progress', progress);
    }, 10);
    // console.log('leave');
  }
}

const createParent = (value) => {
  const selector = `.toast-container[data-position=${value}]`;
  let container = document.querySelector(selector);
  if (container)
    return container;

  container = document.createElement('div');
  container.classList.add('toast-container');
  container.dataset.position = value;
  document.getElementById('navbar').append(container);
  return container;
}

function useToast() {
  const createToast = (options) => {
    const toast = new Toast(options);

    return toast;
  }

  return createToast;
}

export default useToast