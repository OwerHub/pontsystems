import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { ICitizenRegistrationData } from "../types";
// import dummyCitizens from './dummyCitizens.json';


// TODO: listen, why cant read to json types corretly? 
//const dummyCitizensData = dummyCitizens as CitizenRegistrationData[];
const dummyCitizensData = [
    {
        id: 1,
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
        id:2,
        title: 'Mr',
        lastName: 'jane',
        firstName: 'John',
        middleName: 'Smith',
        gender:'female',
        maidenName: 'Orleans',
        placeOfBirth: 'Budapest',
        dateOfBirth: '1990-01-01',
        nationality: 'Hungary',
        taxIdentifier: 'USA123456789',
        creditEligible: true,
    },
    {
        id: 3,
        title: 'Ms',
        lastName: 'Smith',
        firstName: 'Anna',
        middleName: 'Marie',
        gender: 'female',
        maidenName: 'Johnson',
        placeOfBirth: 'New York',
        dateOfBirth: '1985-05-15',
        nationality: 'Hungary',
        taxIdentifier: 'USA987654321',
        creditEligible: false,
    },
    {
        id: 4,
        title: 'Dr',
        lastName: 'Brown',
        firstName: 'James',
        middleName: 'Edward',
        gender: 'male',
        maidenName: null,
        placeOfBirth: 'Los Angeles',
        dateOfBirth: '1978-11-23',
        nationality: 'American',
        taxIdentifier: 'USA123987654',
        creditEligible: true,
    },
    {
        id: 5,
        title: 'Mrs',
        lastName: 'Taylor',
        firstName: 'Emily',
        middleName: 'Rose',
        gender: 'female',
        maidenName: 'Davis',
        placeOfBirth: 'Chicago',
        dateOfBirth: '1992-07-30',
        nationality: 'American',
        taxIdentifier: 'USA456123789',
        creditEligible: true,
    },
    {
        id: 6,
        title: 'Mr',
        lastName: 'Wilson',
        firstName: 'Michael',
        middleName: 'John',
        gender: 'male',
        maidenName: null,
        placeOfBirth: 'Houston',
        dateOfBirth: '1980-03-12',
        nationality: 'American',
        taxIdentifier: 'USA789456123',
        creditEligible: false,
    }
] as ICitizenRegistrationData[];

interface CitizenDataState {
    data: ICitizenRegistrationData[];
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
    const mockCitizens: ICitizenRegistrationData[] = dummyCitizensData;
    return mockCitizens;
  });

const citizenSlice = createSlice({
    name: 'citizenData',
    initialState,
    reducers: {
        addCitizen: (state, action: PayloadAction<ICitizenRegistrationData>) => {
            const newId = state.data.length > 0 ? Math.max(...state.data.map(citizen => citizen.id)) + 1 : 1;
            action.payload.id = newId;
            console.log('in addCitizenReducer', action.payload);
            state.data.push(action.payload);
        },
        removeCitizen: (state, action: PayloadAction<number>) => {
            state.data = state.data.filter(citizen => citizen.id !== action.payload);
        },
        editCitizen: (state, action: PayloadAction<ICitizenRegistrationData>) => {
            console.log('%c in editCitizenReducer', 'color: green', action.payload);    
            const index = state.data.findIndex(citizen => citizen.id === action.payload.id);
            state.data[index] = action.payload;
        }
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

export const { addCitizen, removeCitizen, editCitizen } = citizenSlice.actions;
export default citizenSlice.reducer;