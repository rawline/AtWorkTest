import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserCard } from '../services/services';

interface StaffState {
  cards: UserCard[];
}

const initialState: StaffState = {
  cards: [],
};

const staffSlice = createSlice({
  name: 'staff',
  initialState,
  reducers: {
    setCards: (state, action: PayloadAction<UserCard[]>) => {
      state.cards = action.payload;
    },
    archiveCard: (state, action: PayloadAction<number>) => {
      const card = state.cards.find((card) => card.id === action.payload);
      if (card) {
        card.archived = true;
      }
    },
    activeCard: (state, action: PayloadAction<number>) => {
      const card = state.cards.find((card) => card.id === action.payload);
      if (card) {
        card.archived = false;
      }
    },
    updateCard: (state, action: PayloadAction<UserCard>) => {
      const index = state.cards.findIndex((card) => card.id === action.payload.id);
      if (index !== -1) {
        state.cards[index] = action.payload;
      }
    },
  },
});

export const { setCards, archiveCard, activeCard, updateCard } = staffSlice.actions;
export default staffSlice.reducer;
