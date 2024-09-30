import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
// import dummyCitizens from './dummyCitizens.json';


// TODO: listen, why cant read to json types corretly? 
//const dummyCitizensData = dummyCitizens as CitizenRegistration[];
const dummyCitizensData = [
    {
        title: 'Mr',
        lastName: 'Doe',
        firstName: 'John',
        middleName: 'Smith',
        gender:'male',
        maidenName: null,
        placeOfBirth: 'Budapest',
        dateOfBirth: '1990-01-01',
        nationality: 'American',
        taxIdentifier: 'USA123456789',
        creditEligible: true,
    },
    {
        title: 'Mr',
        lastName: 'jane',
        firstName: 'John',
        middleName: 'Smith',
        gender:'female',
        maidenName: 'Orleans',
        placeOfBirth: 'Budapest',
        dateOfBirth: '1990-01-01',
        nationality: 'American',
        taxIdentifier: 'USA123456789',
        creditEligible: true,
    },
] as CitizenRegistration[];



export interface CitizenRegistration {
    title: string; // Titulus (select - required)
    lastName: string; // Vezetéknév (text - required)
    firstName: string; // Keresztnév (text - required)
    middleName: string | null; // Utónév (text - required)
    gender: 'male' | 'female' | 'other'; // Neme: (select - required)
    maidenName?: string | null; // Leánykori név (text - required if gender is 'female')
    placeOfBirth: string; // Születési hely (text - required)
    dateOfBirth: string; // Születési dátum (datepicker - required)
    nationality: string; // Állampolgárság (text - required)
    taxIdentifier: string; // Adoazonosító jel (string - 11 characters long, must contain '8' and at least one '2')
    creditEligible?: boolean; // Hitel igényelhető? (select - fixed disabled) 
    //dateOfBirth: Date; // Születési dátum (datepicker - required)
}

interface CitizenDataState {
    data: CitizenRegistration[];
     isLoading: boolean;
    error: string | null;
}

const initialState: CitizenDataState = {
    data: dummyCitizensData,
     isLoading: false,
     error: null,
};

export const fetchCitizens = createAsyncThunk("habits/fetchCitizens", async () => {
    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    const mockCitizens: CitizenRegistration[] = dummyCitizensData;
    return mockCitizens;
  });



const citizenSlice = createSlice({
    name: 'citizenData',
    initialState,
    reducers: {
        addCitizen: (state, action: PayloadAction<CitizenRegistration>) => {
            state.data.push(action.payload);
        },
        removeCitizen: (state, action: PayloadAction<number>) => {
            state.data.splice(action.payload, 1);
        },
    },
    extraReducers(builder) {
        builder.addCase(fetchCitizens.pending, (state) => {
            state.isLoading = true;
            state.error = null;
        });
        builder.addCase(fetchCitizens.fulfilled, (state, action) => {
            state.data = action.payload;
            state.isLoading = false;
        });
        builder.addCase(fetchCitizens.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message || 'An error occurred.';
        });

    },

});

export const { addCitizen, removeCitizen } = citizenSlice.actions;
export default citizenSlice.reducer;