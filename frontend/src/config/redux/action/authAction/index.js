import { clientServer } from "@/config";
import { createAsyncThunk } from "@reduxjs/toolkit";

// Login User
export const loginUser = createAsyncThunk(
  "user/login",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post("/login", {
        email: user.email,
        password: user.password,
      });

      // Ensure that a token is provided
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token); 
      } else {
        return thunkAPI.rejectWithValue({ message: "Token not provided" });
      }

      return thunkAPI.fulfillWithValue(response.data.token)
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response.data || { message: "Login failed" }
      );
    }
  }
);

// Register User
export const registerUser = createAsyncThunk(
  "user/register",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.post("/register", {
        name: user.name,
        email: user.email,
        password: user.password,
        username: user.username,
      });

      // Check if the response contains data
      const { token, userData } = response.data;
      if (token) {
        localStorage.setItem("token", token); 
        return { token, userData }; 
      } else {
        return thunkAPI.rejectWithValue({ message: "Registration failed" });
      }
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data || { message: "Registration failed" }
      );
    }
  }
);

export const getAboutUser = createAsyncThunk(
  "user/getAboutUser",
  async (user, thunkAPI) => {
    try {
      const response = await clientServer.get("/get_user_and_profile", {
        params: {
          token: user.token,
        },
      });

      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);

export const getAllUsers = createAsyncThunk(
  "user/getAllUsers",
  async (_, thunkAPI) => {
    try {
      const response = await clientServer.get("/user/get_all_users");
      return thunkAPI.fulfillWithValue(response.data);
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response.data);
    }
  }
);
