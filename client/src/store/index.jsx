import { createStore, applyMiddleware } from 'redux';
import { compouseWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';
//redux-devtools-extension
import rootReducer from '../reducer';

export const store = createStore(rootReducer, compouseWithDevTools(applyMiddleware(thunk)));