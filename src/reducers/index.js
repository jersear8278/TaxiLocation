import { combineReducers } from 'redux';
import locationCoord from './location_coord';

const rootReducer = combineReducers({
  center:locationCoord
});

export default rootReducer;
