// import ListFilterView from './view/filters.js';
import ListHeadersView from './view/headers.js';
import ListMenuView from './view/menu.js';
import Trip from './presenter/trip.js';
import { render, RenderPosition } from './render.js';
import PointModel from './model/point-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import NewPointButton from './view/new-point-button.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripMainContainer = document.querySelector('.trip-main');
const tripContainer = document.querySelector('.trip-events');
const menuContainer = document.querySelector('.trip-controls__navigation');
// const siteMain = document.querySelector('.page-main');

// render(new ListFilterView(), filterContainer);
render(new ListHeadersView(), tripMainContainer, RenderPosition.AFTERBEGIN);
render(new ListMenuView(), menuContainer);

const model = new PointModel();
model.init();

const filterModel = new FilterModel();


const newPointButtonComponent = new NewPointButton();

const tripPresenter = new Trip({container : tripContainer, pointModel: model, filterModel: filterModel, onNewPointDestroy: handleNewPointFormClose()});
tripPresenter.init();

const filterPresenter = new FilterPresenter({container:filterContainer, pointModel: model, filterModel: filterModel});
filterPresenter.init();

newPointButtonComponent.setClickHandler(handleNewPointButtonClick);

function handleNewPointFormClose(){
  newPointButtonComponent.enable();
}

function handleNewPointButtonClick() {
  tripPresenter.createPoint();
  newPointButtonComponent.disable();
}


