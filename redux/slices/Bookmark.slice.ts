import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBookmarksFav } from "../../types/bookmarksFav";

//Retrieve bookmarks from local storage if they exist
const initialState: IBookmarksFav[] = [];
const bookmarkSlice = createSlice({
  name: "bookmarks",
  initialState,
  reducers: {
    addBookmark: (state, action: PayloadAction<IBookmarksFav>) => {
      state.push(action.payload);
    },
    removeBookmark: (state, action: PayloadAction<string>) => {
      return state.filter((bookmark) => bookmark.id !== action.payload);
    },
  },
});

export const { addBookmark, removeBookmark } = bookmarkSlice.actions;
export default bookmarkSlice.reducer;
