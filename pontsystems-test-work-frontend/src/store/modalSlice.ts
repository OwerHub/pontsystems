import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { ICitizenRegistrationData } from "../types";

interface ModalState {
  visible: boolean;
  type: "delete" | "edit" | "view" | null; 
  citizen: ICitizenRegistrationData | null; 
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
    openModal: (state, action: PayloadAction<{ type: "delete" | "edit" | "view"; citizen: ICitizenRegistrationData }>) => {
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
