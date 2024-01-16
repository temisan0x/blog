import { combineReducers } from "@reduxjs/toolkit";
import bookmark from "./slices/Bookmark.slice";
import theme from "./slices/ThemeSlice";

const rootReducer = combineReducers({
    bookmark,
    theme
});

export type RootState = ReturnType<typeof rootReducer>
export default rootReducer;