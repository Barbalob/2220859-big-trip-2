import { UpdateType, UserAction } from '../const';
import { RenderPosition, remove, render } from '../framework/render';
import PointEditView from '../view/edit-form';

export default class NewPointPresenter {
  #pointNewComponent = null;
  #pointListComponent = null;
  #handleDestroy = null;
  #changeData = null;

  constructor(pointListComponent, changeData, onDestroy){
    this.#pointListComponent = pointListComponent;
    this.#changeData = changeData;
    this.#handleDestroy = onDestroy;

  }

  init(point, destination, offers){
    this.#pointNewComponent = new PointEditView(point, destination, offers);

    this.#pointNewComponent.setFormSubmutHandler(this.#handleFormSubmit);
    this.#pointNewComponent.setFormResetHandler(this.#handleFormReset);

    render(this.#pointNewComponent, this.#pointListComponent, RenderPosition.AFTERBEGIN);

    document.addEventListener('keyup', this.#onEscKeyup);
  }

  destroy = () => {
    if (this.#pointNewComponent === null){
      return;
    }

    this.#handleDestroy();

    remove(this.#pointNewComponent);
    this.#pointNewComponent = null;

    document.removeEventListener('keyup', this.#onEscKeyup);
  }

  #onEscKeyup = (evt) => {
    if (evt.key === 'Escape') {
      this.destroy();
    }
  }

  #handleFormSubmit = (update) => {
    this.#changeData(
      UserAction.ADD_POINT,
      UpdateType.MINOR,
      update,
    );
    this.destroy();
  }

  #handleFormReset = () => {
    this.destroy();
  }
}
