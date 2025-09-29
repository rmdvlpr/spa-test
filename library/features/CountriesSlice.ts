import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

export interface City {
  name: string;
  population: number;
}

export interface State {
  code: string;
  name: string;
  cities: City[];
}

export interface Country {
  code: string;
  name: string;
  states: State[];
}

export interface CountriesState {
  countries: Country[];
  selectedCountry: string | null;
  selectedState: string | null;
  loading: boolean;
  error: string | null;
}

const initialState: CountriesState = {
  countries: [],
  selectedCountry: null,
  selectedState: null,
  loading: false,
  error: null,
};

export const fetchAllCountries = createAsyncThunk(
  "countries/fetchAllCountries",
  async () => {
    const response = await fetch("http://localhost:3001/countryList");
    if (!response.ok) {
      throw new Error("Failed to fetch all countries");
    }
    return response.json();
  }
);

const countriesSlice = createSlice({
  name: "countries",
  initialState,
  reducers: {
    setSelectedCountry: (state, action: PayloadAction<string | null>) => {
      state.selectedCountry = action.payload;
      state.selectedState = null;
    },
    setSelectedState: (state, action: PayloadAction<string | null>) => {
      state.selectedState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAllCountries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllCountries.fulfilled, (state, action) => {
        state.loading = false;
        state.countries = action.payload;
      })
      .addCase(fetchAllCountries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch countries";
      });
  },
});

export const { setSelectedCountry, setSelectedState } = countriesSlice.actions;
export default countriesSlice.reducer;
