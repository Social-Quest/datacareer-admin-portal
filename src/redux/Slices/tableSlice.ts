import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { apiInstance } from "../../api/axiosApi";
import { AxiosError } from 'axios';

export interface Table {
  id: number;
  name: string;
  query: string;
  insertData: string;
  createdAt: string;
  updatedAt: string;
}

// Static data for testing
const staticTables: Table[] = [
  {
    id: 1,
    name: "Users Table",
    query: "CREATE TABLE users (\n  id INT PRIMARY KEY,\n  name VARCHAR(100),\n  email VARCHAR(100),\n  created_at TIMESTAMP\n);",
    insertData: "INSERT INTO users (id, name, email, created_at) VALUES\n(1, 'John Doe', 'john@example.com', '2024-01-01'),\n(2, 'Jane Smith', 'jane@example.com', '2024-01-02');",
    createdAt: "2024-03-15T10:00:00Z",
    updatedAt: "2024-03-15T10:00:00Z"
  },
  {
    id: 2,
    name: "Products Table",
    query: "CREATE TABLE products (\n  id INT PRIMARY KEY,\n  name VARCHAR(100),\n  price DECIMAL(10,2),\n  stock INT\n);",
    insertData: "INSERT INTO products (id, name, price, stock) VALUES\n(1, 'Laptop', 999.99, 50),\n(2, 'Smartphone', 499.99, 100);",
    createdAt: "2024-03-15T11:00:00Z",
    updatedAt: "2024-03-15T11:00:00Z"
  },
  {
    id: 3,
    name: "Orders Table",
    query: "CREATE TABLE orders (\n  id INT PRIMARY KEY,\n  user_id INT,\n  total_amount DECIMAL(10,2),\n  order_date TIMESTAMP,\n  FOREIGN KEY (user_id) REFERENCES users(id)\n);",
    insertData: "INSERT INTO orders (id, user_id, total_amount, order_date) VALUES\n(1, 1, 1499.98, '2024-03-15'),\n(2, 2, 499.99, '2024-03-15');",
    createdAt: "2024-03-15T12:00:00Z",
    updatedAt: "2024-03-15T12:00:00Z"
  }
];

interface TableState {
  tables: Table[];
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
  };
}

const initialState: TableState = {
  tables: staticTables,
  loading: false,
  error: null,
  filters: {
    search: ''
  }
};

export const fetchTables = createAsyncThunk(
  'table/fetchAll',
  async (filters: { search?: string }, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      let filteredTables = [...staticTables];
      if (filters.search) {
        const searchLower = filters.search.toLowerCase();
        filteredTables = filteredTables.filter(table => 
          table.name.toLowerCase().includes(searchLower) ||
          table.query.toLowerCase().includes(searchLower)
        );
      }
      return filteredTables;
    } catch (error) {
      return rejectWithValue('Failed to fetch tables');
    }
  }
);

export const createTable = createAsyncThunk(
  'table/create',
  async (data: Partial<Table>, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const newTable: Table = {
        id: staticTables.length + 1,
        name: data.name || '',
        query: data.query || '',
        insertData: data.insertData || '',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      };
      
      return newTable;
    } catch (error) {
      return rejectWithValue('Failed to create table');
    }
  }
);

export const updateTable = createAsyncThunk(
  'table/update',
  async ({ id, data }: { id: number; data: Partial<Table> }, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const existingTable = staticTables.find(t => t.id === id);
      if (!existingTable) {
        throw new Error('Table not found');
      }
      
      const updatedTable: Table = {
        ...existingTable,
        ...data,
        updatedAt: new Date().toISOString()
      };
      
      return updatedTable;
    } catch (error) {
      return rejectWithValue('Failed to update table');
    }
  }
);

export const deleteTable = createAsyncThunk(
  'table/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const tableExists = staticTables.some(t => t.id === id);
      if (!tableExists) {
        throw new Error('Table not found');
      }
      
      return id;
    } catch (error) {
      return rejectWithValue('Failed to delete table');
    }
  }
);

const tableSlice = createSlice({
  name: 'table',
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
      // Fetch Tables
      .addCase(fetchTables.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTables.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = action.payload;
      })
      .addCase(fetchTables.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Table
      .addCase(createTable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTable.fulfilled, (state, action) => {
        state.loading = false;
        state.tables.push(action.payload);
      })
      .addCase(createTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Table
      .addCase(updateTable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTable.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tables.findIndex(table => table.id === action.payload.id);
        if (index !== -1) {
          state.tables[index] = action.payload;
        }
      })
      .addCase(updateTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Table
      .addCase(deleteTable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTable.fulfilled, (state, action) => {
        state.loading = false;
        state.tables = state.tables.filter(table => table.id !== action.payload);
      })
      .addCase(deleteTable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setFilters, clearFilters } = tableSlice.actions;
export default tableSlice.reducer; 