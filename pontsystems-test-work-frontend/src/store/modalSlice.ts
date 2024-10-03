import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IpayLoadAction {
 modalIdentifier: 'deleteCheck'| 'formQuitCheck'| ''
 type: "dirtyCheck" |"error" |""
  title: string;
  message: string;
  payLoad?: { citizenId?: string}
  onOK?: boolean;
}

interface ModalState extends IpayLoadAction {
   visible: boolean;
}

const initialState: ModalState = {
  visible: false,
  modalIdentifier: '',
  title: '',
  type: '',
  message: '',
  onOK: false,
};

const modalDataSlice = createSlice({
  name: "modalData",
  initialState,
  reducers: {
    openModal: (state, action: PayloadAction<IpayLoadAction>) => {
      state.visible = true;
      state.message = action.payload.message;
      state.title = action.payload.title;
      state.type = action.payload.type;
      state.modalIdentifier = action.payload.modalIdentifier;
      state.payLoad = action.payload.payLoad;
    },
    clickOK: (state) => {
      state.onOK = true;
    },
    closeModal: () => {
      return initialState;
    },
  },
});

export const { openModal, closeModal, clickOK } = modalDataSlice.actions;
export default modalDataSlice.reducer;
