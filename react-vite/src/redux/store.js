import {
  legacy_createStore as createStore,
  applyMiddleware,
  compose,
  combineReducers,
} from "redux";
import thunk from "redux-thunk";
import sessionReducer from "./session";
import businessesReducer from "./businesses";
import businessReducer from "./business";
import imagesReducer from "./images";
import imageReducer from "./image";
import reviewsReducer from "./reviews";
import reviewReducer from "./review";

const rootReducer = combineReducers({
  session: sessionReducer,
  businesses: businessesReducer,
  business: businessReducer,
  images: imagesReducer,
  image: imageReducer,
  reviews: reviewsReducer,
  review: reviewReducer
});

let enhancer;
if (import.meta.env.MODE === "production") {
  enhancer = applyMiddleware(thunk);
} else {
  const logger = (await import("redux-logger")).default;
  const composeEnhancers =
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  enhancer = composeEnhancers(applyMiddleware(thunk, logger));
}

const configureStore = (preloadedState) => {
  return createStore(rootReducer, preloadedState, enhancer);
};

export default configureStore;
