import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';

const exampleReducer = (state = {}, action) => {
    switch (action.type) {
        // Các trường hợp xử lý action ở đây
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    example: exampleReducer,
});

const middleware = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middleware));

export default store;
