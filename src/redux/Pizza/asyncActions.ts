import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { SearchPizzaParams } from './slice';
import { PizzaItem } from './types';

export const fetchPizzas = createAsyncThunk<PizzaItem[], SearchPizzaParams>(
  'pizza/fetchPizzasStatus',
  async (params) => {
    const { category, search, currentPage, sortBy } = params;

    const { data } = await axios.get<PizzaItem[]>(
      `https://63090636722029d9dddd59fe.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy.sortProperty}&order=desc${search}`,
    );
    return data;
  },
);
