// import ListFilterView from './view/filters.js';
import ListHeadersView from './view/headers.js';
import ListMenuView from './view/menu.js';
import Trip from './presenter/trip.js';
import PointModel from './model/point-model.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';
import NewPointButton from './view/new-point-button.js';
import { RenderPosition, render } from './framework/render.js';
import PoitApiService from './point-api-service.js';

const AUTHORIZATION = 'Basic basi_k2qqdvs3vzvw22t_basic';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripMainContainer = document.querySelector('.trip-main');
const tripContainer = document.querySelector('.trip-events');
const menuContainer = document.querySelector('.trip-controls__navigation');
// const siteMain = document.querySelector('.page-main');

// render(new ListFilterView(), filterContainer);
render(new ListHeadersView(), tripMainContainer, RenderPosition.AFTERBEGIN);
render(new ListMenuView(), menuContainer);

const model = new PointModel({pointsApiService: new PoitApiService(END_POINT, AUTHORIZATION)});
model.init();

const filterModel = new FilterModel();
const newPointButtonComponent = new NewPointButton();

const tripPresenter = new Trip({container : tripContainer, pointModel: model, filterModel: filterModel, onNewPointDestroy: handleNewPointFormClose});
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


