import React from 'react';

const DEFAULT_OPTIONS = {
  position : 'top-left',
  autoClose : 3000,
  text : 'message',
  canClose : true,
  showProgress : true,
}

class Toast{
  #toastElem 
  #autoCloseTimeout
  #parentContainer
  #removeBinded
  #createdAt
  #autoClose
  #progressInterval
  #bindedMouseLeave
  #bindedMouseEnter
  #hovering
  #timeDiff = -1

  constructor(options){
    this.#toastElem = document.createElement('div');
    this.#toastElem.classList.add('toast');
    requestAnimationFrame(()=>{
      this.#toastElem.classList.add('show');
    });
    this.#createdAt = new Date()-0;
    this.#removeBinded = this.removeElem.bind(this);
    this.#bindedMouseLeave = this.onMouseLeave.bind(this);
    this.#bindedMouseEnter = this.onMouseEnter.bind(this);
    this.update(options);
    this.#toastElem.addEventListener('mouseleave',this.#bindedMouseLeave)
    this.#toastElem.addEventListener('mouseenter',this.#bindedMouseEnter)
    
  }

  set showProgress(value){
    if( value===false || this.#autoClose===false ) return;
    // this.#toastElem.style.setProperty('--progress',0);
    this.#progressInterval = setInterval(() => {
      let timePassed = new Date() - this.#createdAt;
      if( this.#hovering && this.#timeDiff===-1 ){
        this.#timeDiff = timePassed;
        // console.log(this.#timeDiff);
        return;
      }
      if( this.#hovering )
        return;
      let progress = (timePassed/this.#autoClose)*100;

      if( progress>100 ){
        clearInterval(this.#progressInterval);
        this.removeElem();
        return;
      }
      this.#toastElem.style.setProperty('--progress',progress);
    }, 10);
    
  }

  set canClose(value){
    if( !value ) return;
    this.#toastElem.addEventListener('click',this.#removeBinded);
  }

  set position(value){
    const selector = `.toast-container[data-position=${value}]`;
    const container = document.querySelector(selector) || 
      this.createContainer(value);

    container.append(this.#toastElem);
  }

  set text(value){
    this.#toastElem.textContent = value;
  }

  set autoClose(value){
    this.#autoClose = value;
    if( value===false ) return;
    if( this.#autoCloseTimeout )
      clearTimeout(this.#autoCloseTimeout);
  }

  removeElem(){
    this.#toastElem.removeEventListener('click',this.#removeBinded);
    this.#toastElem.removeEventListener('mouseleave',this.#bindedMouseLeave)
    this.#toastElem.removeEventListener('mouseenter',this.#bindedMouseEnter)
    
    this.#toastElem.classList.remove('show');
    this.#toastElem.addEventListener('transitionend',()=>{
      clearInterval(this.#progressInterval);

      const container = this.#toastElem.parentElement;
      this.#toastElem.remove();
      if( container?.hasChildNodes() ) 
        return;
      
      container?.remove();
    })
  }

  update(options){
    Object.entries({...DEFAULT_OPTIONS,...options}).forEach(([key,value])=>{
      this[key] = value;
    })
  }

  createContainer(value){
    if( this.#parentContainer && !this.#parentContainer?.hasChildNodes() )
      this.#parentContainer.remove();

    this.#parentContainer = document.createElement('div');
    this.#parentContainer.classList.add('toast-container');
    this.#parentContainer.dataset.position = value;
    document.body.append(this.#parentContainer);
    return this.#parentContainer;
  }
  onMouseLeave(){
    this.#hovering = false;
    // console.log(this.#createdAt-0);
    this.#createdAt = new Date() - this.#timeDiff;
    // console.log(this.#createdAt);
    this.#timeDiff = -1;
    console.log('leave');
  }
  onMouseEnter(){
    console.log('entered');
    this.#timeDiff = -1;
    this.#hovering = true;
  }
}


function useToast() {
  const createToast = (options)=>{
    return new Toast(options);
  }

  return createToast;
}

export default useToast