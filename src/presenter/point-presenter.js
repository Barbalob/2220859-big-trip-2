import { remove, render,  replace} from '../framework/render';
import PointEditView from '../view/edit-form';
import PointView from '../view/point';

const Mode = {
  VIEW: 'view',
  EDIT: 'edit',
};

export default class PointPresenter{
  #pointListContainer = null;
  #handlePointUpdate = null
  #pointComponent = null
  #pointEditComponent = null
  #resetAllPoints = null;
  #point = null;
  #mode = Mode.VIEW;

  constructor(pointListContainer, onPointUpdate, resetAllPoints){
    this.#pointListContainer = pointListContainer;
    this.#handlePointUpdate = onPointUpdate;
    this.#resetAllPoints = resetAllPoints;
  }

  init(point, destination, offers){
    this.#point = point;
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(point, destination, offers);
    this.#pointEditComponent = new PointEditView(point, destination, offers);

    this.#pointComponent.setModeButtonClickHandler(this.#handlePointEditClick);
    this.#pointComponent.setFavoriteButtonClickHandler(this.#handleFavoriteClick);
    this.#pointEditComponent.setModeButtonClickHandler(this.#handlePointResetClick);
    this.#pointEditComponent.setFormSubmutHandler(this.#handleFormSubmitClick);
    this.#pointEditComponent.setFormResetHandler(this.#handleFormResetClick);

    if (prevPointComponent === null || prevPointEditComponent === null){
      render(this.#pointComponent, this.#pointListContainer);
      return;
    }
    if(this.#pointListContainer.contains(prevPointComponent.element)){
      replace(this.#pointComponent, prevPointComponent);
    }
    if(this.#pointListContainer.contains(prevPointEditComponent.element)){
      replace(this.#pointEditComponent, prevPointEditComponent);
    }

    remove(prevPointComponent);
    remove(prevPointEditComponent);
  }

  resetPoint(){
    if (this.#mode === Mode.EDIT){
      this.#turnPointToView();
    }
  }

  destroy() {
    remove(this.#pointComponent);
    remove(this.#pointEditComponent);
  }

  #onEscKeyup = (evt) => {
    if (evt.key === 'Escape'){
      this.#turnPointToView();
    }
  }

  #turnPointToView(){
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = Mode.VIEW;
    document.removeEventListener('keyup', this.#onEscKeyup);
  }

  #turnPointToEdit(){
    this.#resetAllPoints();
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#mode = Mode.EDIT;
    document.addEventListener('keyup', this.#onEscKeyup);
  }

  #handleFavoriteClick = () => {
    this.#handlePointUpdate({...this.#point, isFavorite : !this.#point.isFavorite});
  }

  #handleFormSubmitClick = (point) => {
    this.#handlePointUpdate(point);
    this.#turnPointToView();
  };

  #handleFormResetClick = () => {
    this.#turnPointToView();
  };

  #handlePointResetClick = () => {
    this.#turnPointToView();
  };

  #handlePointEditClick = () => {
    this.#turnPointToEdit();
  }
}
