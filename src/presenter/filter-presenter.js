import { render } from '../render';
import FiltersView from '../view/filters';


export default class FilterPresenter{
  #filterContainer = null;
  #pointModel = null;

  constructor({container,   pointModel}){
    this.#filterContainer = container;
    this.#pointModel = pointModel;
  }

  init(){
    const points = this.#pointModel.getPoints();
    const pastPoints = points.filter((point) => new Date(point.dateTo).getTime() < Date.now());
    const futurePoints = points.filter((point) => new Date(point.dateTo).getTime() >= Date.now());

    render(new FiltersView(pastPoints,futurePoints), this.#filterContainer);
  }
}
