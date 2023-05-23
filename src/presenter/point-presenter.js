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
  #mode = Mode.VIEW;

  constructor(pointListContainer, onPointUpdate){
    this.#pointListContainer = pointListContainer;
    this.#handlePointUpdate = onPointUpdate;
  }

  init(point, destination, offers){
    const prevPointComponent = this.#pointComponent;
    const prevPointEditComponent = this.#pointEditComponent;

    this.#pointComponent = new PointView(point, destination, offers);
    this.#pointEditComponent = new PointEditView(point, destination, offers);

    const onEscKeyup = (event) => {
      if (event.key === 'Escape'){
        this.#turnPointToView();
        document.removeEventListener('keyup', onEscKeyup);
      }
    };

    this.#pointComponent.setModeButtonClickHandler(()=>{
      this.#turnPointToEdit();
      document.addEventListener('keyup', onEscKeyup);
    });

    this.#pointComponent.setFavoriteButtonClickHandler(()=>{
      this.#handlePointUpdate({
        ...point,
        isFavorite: !point.isFavorite,
      });
    });

    this.#pointEditComponent.setModeButtonClickHandler(()=>{
      this.#turnPointToView();
      document.removeEventListener('keyup', onEscKeyup);
    });
    this.#pointEditComponent.setFormSubmutHandler(()=>{
      this.#turnPointToView();
      document.removeEventListener('keyup', onEscKeyup);
    });
    this.#pointEditComponent.setFormResetHandler(()=>{
      this.#turnPointToView();
      document.removeEventListener('keyup', onEscKeyup);
    });


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

  #turnPointToView(){
    replace(this.#pointComponent, this.#pointEditComponent);
    this.#mode = Mode.VIEW;
  }

  #turnPointToEdit(){
    replace(this.#pointEditComponent, this.#pointComponent);
    this.#mode = Mode.EDIT;
  }

  resetPoint(){
    if (this.#mode === Mode.EDIT){
      this.#turnPointToView();
    }
  }
}
