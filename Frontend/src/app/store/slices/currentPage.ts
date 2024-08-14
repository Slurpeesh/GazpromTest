import { RootState } from '@/app/store'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface ICurrentPageState {
  value: number
}

const initialState: ICurrentPageState = {
  value: 1,
}

export const currentPageSlice = createSlice({
  name: 'currentPage',
  initialState,
  reducers: {
    setPage: (state, payload: PayloadAction<number>) => {
      state.value = payload.payload
    },
  },
})

export const { setPage } = currentPageSlice.actions
export const selectCurrentPage = (state: RootState) => state.currentPage.value
export default currentPageSlice.reducer
