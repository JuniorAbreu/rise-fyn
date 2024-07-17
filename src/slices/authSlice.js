import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../services/authService";
import { useStorage } from "../hooks/useStorage";

const { getItem } = useStorage();
const user = getItem('@user');

const initialState = {
  user: user ? user : null,
  error: false,
  success: false,
  loading: false,
};

// Register a user and sign in
export const register = createAsyncThunk(
  "auth/register",
  async (user,{getState, dispatch, rejectWithValue}) => {
    console.log("register ");
    const data = await authService.register(user);
    console.log("data ", data);
    // Check for errors
    if (data.errors) {
      rejectWithValue(data.errors[0]);
    }
    return data;
  }
);

// Logout a user
export const logout = createAsyncThunk("auth/logout", async () => {
  await authService.logout();
});

export const login = createAsyncThunk(
  'auth/login',
  async (user, thunkAPI) => {
    const data = await authService.login(user);
    if(data?.errors) {
      thunkAPI.rejectWithValue(data);
    }
    return response.data
  },
)

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state, data) => {
      console.log("reset ", data);
      state.loading = false;
      state.error = false;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        console.log("pending...");
        state.loading = true;
        state.error = null;
      })
      .addCase(register.fulfilled, (state, action) => {
        console.log("fulfilled...");
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        console.log("rejected...");
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.loading = false;
        state.success = true;
        state.error = null;
      })
      .addCase(login.pending, (state) => {
        console.log("login.pending ", state);
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        console.log("login.fulfilled ", state);
        state.loading = false;
        state.success = true;
        state.error = null;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        console.log("login.rejected ", state);
        state.loading = false;
        state.error = action.payload;
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
