import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CompanyType } from "../data-companies/data";

interface CompanyState {
  companies: CompanyType[] | [];
}
const initialState: CompanyState = {
  companies: [],
};

export const companiesSlice = createSlice({
  name: "companies",
  initialState,
  reducers: {
    getCompanies(state, action: PayloadAction<CompanyType[]>) {
      state.companies = action.payload;
    },
    toggleAllChecked(state, action: PayloadAction<boolean>) {
      state.companies.forEach((company) => (company.checked = action.payload));
    },
    setChecked(state, action: PayloadAction<number>) {
      const companyIndex = state.companies.findIndex(
        (company) => company.id === action.payload
      );
      if (companyIndex !== -1) {
        state.companies[companyIndex].checked =
          !state.companies[companyIndex].checked;
      }
    },
    deleteChecked(state) {
      state.companies = state.companies.filter((el) => !el.checked);
    },
    updateCompany(
      state,
      action: PayloadAction<{ id: number; title?: string; address?: string }>
    ) {
      const index = state.companies.findIndex(
        (company) => company.id === action.payload.id
      );
      if (index !== -1) {
        if (action.payload.title !== undefined) {
          state.companies[index].title = action.payload.title;
        }
        if (action.payload.address !== undefined) {
          state.companies[index].address = action.payload.address;
        }
      }
    },
    addCompany(state, action: PayloadAction<CompanyType>) {
      state.companies = [...state.companies, action.payload];
    },
  },
});

export const {
  getCompanies,
  setChecked,
  toggleAllChecked,
  deleteChecked,
  updateCompany,
  addCompany,
} = companiesSlice.actions;
export default companiesSlice.reducer;
