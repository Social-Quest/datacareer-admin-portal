import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Table } from './tableSlice';

export interface Database {
  id: number;
  name: string;
  tables: number[]; // Array of table IDs
  schemaContent: string;
  schemaImage: string | null;
  createdAt: string;
  updatedAt: string;
}

// Static data for testing
const staticDatabases: Database[] = [
  {
    id: 1,
    name: "E-commerce Database",
    tables: [1, 2, 3], // References to Users, Products, and Orders tables
    schemaContent: "This database contains tables for managing an e-commerce platform:\n- Users: Store user information\n- Products: Store product catalog\n- Orders: Track customer orders",
    schemaImage: null,
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z"
  }
];

interface DatabaseState {
  databases: Database[];
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
  };
}

const initialState: DatabaseState = {
  databases: staticDatabases,
  loading: false,
  error: null,
  filters: {
    search: ''
  }
};

export const fetchDatabases = createAsyncThunk(
  'database/fetchAll',
  async (filters: { search?: string }, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredDatabases = [...staticDatabases];
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredDatabases = filteredDatabases.filter(db => 
          db.name.toLowerCase().includes(searchLower) ||
          db.schemaContent.toLowerCase().includes(searchLower)
        );
      }
      return filteredDatabases;
    } catch (error) {
      return rejectWithValue('Failed to fetch databases');
    }
  }
);

export const createDatabase = createAsyncThunk(
  'database/create',
  async (data: Partial<Database>, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newDatabase: Database = {
        id: staticDatabases.length + 1,
        name: data.name || '',
        tables: data.tables || [],
        schemaContent: data.schemaContent || '',
        schemaImage: data.schemaImage || null,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      return newDatabase;
    } catch (error) {
      return rejectWithValue('Failed to create database');
    }
  }
);

export const updateDatabase = createAsyncThunk(
  'database/update',
  async ({ id, data }: { id: number; data: Partial<Database> }, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const existingDatabase = staticDatabases.find(d => d.id === id);
      if (!existingDatabase) {
        throw new Error('Database not found');
      }
      
      const updatedDatabase: Database = {
        ...existingDatabase,
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      return updatedDatabase;
    } catch (error) {
      return rejectWithValue('Failed to update database');
    }
  }
);

export const deleteDatabase = createAsyncThunk(
  'database/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const databaseExists = staticDatabases.some(d => d.id === id);
      if (!databaseExists) {
        throw new Error('Database not found');
      }
      
      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete database');
    }
  }
);

const databaseSlice = createSlice({
  name: 'database',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = initialState.filters;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch Databases
      .addCase(fetchDatabases.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDatabases.fulfilled, (state, action) => {
        state.loading = false;
        state.databases = action.payload;
      })
      .addCase(fetchDatabases.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Database
      .addCase(createDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDatabase.fulfilled, (state, action) => {
        state.loading = false;
        state.databases.push(action.payload);
      })
      .addCase(createDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Database
      .addCase(updateDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDatabase.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.databases.findIndex(db => db.id === action.payload.id);
        if (index !== -1) {
          state.databases[index] = action.payload;
        }
      })
      .addCase(updateDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Database
      .addCase(deleteDatabase.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDatabase.fulfilled, (state, action) => {
        state.loading = false;
        state.databases = state.databases.filter(db => db.id !== action.payload);
      })
      .addCase(deleteDatabase.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, clearFilters } = databaseSlice.actions;
export default databaseSlice.reducer; 