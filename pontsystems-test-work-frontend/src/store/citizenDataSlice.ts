import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ICitizenRegistrationData } from "../types";
import dummyCitizens from './dummyCitizens.json';


interface CitizenDataState {
  data: ICitizenRegistrationData[];
  isLoading: boolean;
  error: string | null;
  firstLoading: boolean;
}

const initialState: CitizenDataState = {
  data: [],
  isLoading: false,
  error: null,
  firstLoading: true,
};

const dummyCitizensData = dummyCitizens as ICitizenRegistrationData[];

export const fetchCitizens = createAsyncThunk(
  "citizens/fetchCitizens",
  async () => {
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const mockCitizens: ICitizenRegistrationData[] = dummyCitizensData;
    return mockCitizens;
  }
);
console.log(dummyCitizens)
const citizenSlice = createSlice({

  name: "citizenData",
  initialState,
  reducers: {
    addCitizen: (state, action: PayloadAction<ICitizenRegistrationData>) => {
      const newId =
        state.data.length > 0
          ? Math.max(...state.data.map((citizen) => citizen.id)) + 1
          : 1;
      action.payload.id = newId;
      state.data.push(action.payload);
    },
    removeCitizen: (state, action: PayloadAction<number>) => {
      state.data = state.data.filter(
        (citizen) => citizen.id !== action.payload
      );
    },
    editCitizen: (state, action: PayloadAction<ICitizenRegistrationData>) => {
      const index = state.data.findIndex(
        (citizen) => citizen.id === action.payload.id
      );
      state.data[index] = action.payload;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCitizens.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCitizens.fulfilled, (state, action) => {
      state.firstLoading = false;
      state.data = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCitizens.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "An error occurred.";
    });
  },
});

export const { addCitizen, removeCitizen, editCitizen } = citizenSlice.actions;
export default citizenSlice.reducer;
