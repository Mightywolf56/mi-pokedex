/*import {createSlice} from "@reduxjs/toolkit"

const nameTrainerSlice =createSlice({
    name:"nameTrainer",
    initialStage: localStorage.getItem("nameTrainer") ?? "",
     reducers: {
        setNameTrainerGlobal: (state, action) => {
            localStorage.setItem("nameTrainer", action.payload)
            return action.payload
        },
        logOut: () => {
            localStorage.removeItem("nameTrainer")
            return ""
        }

     }
})

export const {setNameTrainerGlobal} = nameTrainerSlice.actions; 

export default nameTrainerSlice.reducer*/

import {createSlice} from "@reduxjs/toolkit"

const nameTrainerSlice = createSlice({
  name: "nameTrainer",
  initialState: localStorage.getItem("nameTrainer") ?? "",
  reducers: {
    setNameTrainerGlobal: (state, action) => {
      localStorage.setItem("nameTrainer", action.payload)
      return action.payload;
    },
    logOut: () => {
      localStorage.removeItem("nameTrainer")
      return ""
    },
  },
});

export const { setNameTrainerGlobal, logOut } = nameTrainerSlice.actions;

export default nameTrainerSlice.reducer;