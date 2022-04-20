import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk'; //verifica la ccion y si es una funcion invoca y usa los métodos dispatch y getState y cualquier argumento adicional y luego encia la accion para actualizar el estado
import rootReducer from '../reducer';

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))