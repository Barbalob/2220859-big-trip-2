// import ListFilterView from './view/filters.js';
import ListHeadersView from './view/headers.js';
import ListMenuView from './view/menu.js';
import Trip from './presenter/trip.js';
import { render, RenderPosition } from './render.js';
import PointModel from './model/point-model.js';
import FilterPresenter from './presenter/filter-presenter.js';

const filterContainer = document.querySelector('.trip-controls__filters');
const tripMainContainer = document.querySelector('.trip-main');
const tripContainer = document.querySelector('.trip-events');
const menuContainer = document.querySelector('.trip-controls__navigation');
// const siteMain = document.querySelector('.page-main');

// render(new ListFilterView(), filterContainer);
render(new ListHeadersView(), tripMainContainer, RenderPosition.AFTERBEGIN);
render(new ListMenuView(), menuContainer);


const tripPresenter = new Trip({container : tripContainer, pointModel: new PointModel()});
tripPresenter.init();

const filterPresenter = new FilterPresenter({container:filterContainer, pointModel: new PointModel()});
filterPresenter.init();
