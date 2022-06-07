import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from './store'

export interface SnackbarState {
  opened: boolean,
  statusCode: any
}

const initialState: SnackbarState = {
  opened: false,
  statusCode: undefined
}

export const snackbarSlice = createSlice({
  name: 'snackbar',
  initialState,
  reducers: {
    resetState: () => initialState,
    updateSnackbacrOpened: (state, action: PayloadAction<boolean>) => {
      state.opened = action.payload
    },
    updateStatusCode: (state, action: PayloadAction<any>) => {
      state.statusCode = action.payload
    },
  },
})

export const { updateSnackbacrOpened, updateStatusCode, resetState } = snackbarSlice.actions

export const opened = (state: RootState) => state.snackbar.opened;

export const statusCode = (state: RootState) => state.snackbar.statusCode;

export default snackbarSlice.reducer