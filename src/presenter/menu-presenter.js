import { UpdateType } from '../const';
import { RenderPosition, remove,  render } from '../framework/render';
import HeadersView from '../view/headers';


export default class MenuPresenter{
  #menuContainer = null;
  #pointModel = null;
  #menuComponent = null;


  constructor({container,   pointModel}){
    this.#menuContainer = container;
    this.#pointModel = pointModel;
    this.#pointModel.addObserver(this.#handleModelEvent);
  }

  get points(){
    return this.#pointModel.points;
  }

  get destination(){
    return this.#pointModel.destination;
  }

  get offers(){
    return this.#pointModel.offers;
  }

  init = () => {
    remove(this.#menuComponent);
    this.#menuComponent = new HeadersView(this.points, this.destination, this.offers);
    render(this.#menuComponent, this.#menuContainer, RenderPosition.AFTERBEGIN);
  }

  #handleModelEvent = (updateType) => {
    switch(updateType){
      case UpdateType.MINOR:
      case UpdateType.MAJOR:
        this.init();
        break;
      case UpdateType.INIT:
        this.init();
    }
  }

}
