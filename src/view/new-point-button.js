export default class NewPointButton{
    #element = null;
    _callback = {};

    constructor(){
      this.#element = document.querySelector('.trip-main__event-add-btn');
      this.#element.addEventListener('click', this.#clickHandler);
    }

    get element() {
      return this.#element;
    }

    disable = () => {
      this.element.disabled  = true;
    }

    enable = () => {
      this.element.disabled  = false;
    }

    setClickHandler = (callback) => {
      this._callback.clickHandler = callback;
    }

    #clickHandler = (evt) => {
      evt.preventDefault();
      this._callback.clickHandler();
    }
}
