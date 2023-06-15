import { UpdateType } from '../const';
import { remove,  render } from '../framework/render';
import FiltersView from '../view/filters';

export default class FilterPresenter{
  #filterContainer = null;
  #pointModel = null;
  #filterModel = null;
  #filterComponent = null;


  constructor({container,   pointModel, filterModel}){
    this.#filterContainer = container;
    this.#pointModel = pointModel;
    this.#pointModel.addObserver(this.#handleModelEvent);

    this.#filterModel = filterModel;
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get points(){
    return this.#pointModel.points;
  }

  init = () => {
    remove(this.#filterComponent);
    this.#filterComponent = new FiltersView(this.points, this.#filterModel.filter);

    render(this.#filterComponent, this.#filterContainer);
    this.#filterComponent.setFilterChangeHandler(this.#handleFilterChange);
  }

  #handleModelEvent = (updateType) => {
    switch(updateType){
      case UpdateType.MINOR:
      case UpdateType.MAJOR:
        this.init();
    }
  }

  #handleFilterChange = (filterType) => {
    if (this.#filterModel.filter === filterType){
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR,filterType);
  }
}
