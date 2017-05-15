import { combineReducers } from 'redux';
import locationCoord from './location_coord';
import DriverDetails from './driver_details';

const rootReducer = combineReducers({
  center:locationCoord,
  driverdetails:DriverDetails
});

export default rootReducer;
