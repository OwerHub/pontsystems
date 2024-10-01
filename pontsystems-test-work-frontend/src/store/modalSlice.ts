import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CitizenRegistrationData } from "./citizenDataSlice";

interface ModalState {
  visible: boolean;
  type: "delete" | "edit" | "view" | null; 
  citizen: CitizenRegistrationData | null; 
}

const initialState: ModalState = {
  visible: false,
  type: null,
  citizen: null,
};

const modalDataSlice = createSlice({
  name: "modalData",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<{ type: "delete" | "edit" | "view"; citizen: CitizenRegistrationData }>) => {
      state.visible = true;
      state.type = action.payload.type;
      state.citizen = action.payload.citizen;
    },
    closeModal: (state) => {
      state.visible = false;
      state.type = null;
      state.citizen = null;
    },
  },
});

export const { openModal, closeModal } = modalDataSlice.actions;
export default modalDataSlice.reducer;
