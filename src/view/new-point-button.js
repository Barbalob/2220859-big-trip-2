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
      this.element.disable = true;
    }

    enable = () => {
      this.element.disable = false;
    }

    setClickHandler = (callback) => {
      this._callback.clickHandler = callback;
    }

    #clickHandler = (evt) => {
      evt.preventDefaut();
      this._callback.clickHandler();
    }
}
