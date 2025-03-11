// src/store/transactionStore.js
import { defineStore } from 'pinia';
import apiClient from '../services/api';

export const useTransactionStore = defineStore('transactionStore', {
  state: () => ({
    transactions: [],
    filter: {
      type: '', // 'income' или 'expense'
      dateFrom: '',
      dateTo: '',
    },
    sort: {
      field: 'date', // или 'amount'
      order: 'asc', // или 'desc'
    },
    currentPage: 1,
    perPage: 10,
  }),
  actions: {
    async fetchTransactions() {
      try {
        const response = await apiClient.get('/transactions');
        this.transactions = response.data;
      } catch (error) {
        console.error('Ошибка загрузки транзакций:', error);
      }
    },
    setFilter(filterData) {
      this.filter = { ...this.filter, ...filterData };
      this.currentPage = 1;
    },
    setSort(sortData) {
      this.sort = { ...this.sort, ...sortData };
    },
    setPage(page) {
      this.currentPage = page;
    },
  },
  getters: {
    filteredTransactions(state) {
      let data = state.transactions;
      // Фильтрация по типу
      if (state.filter.type) {
        data = data.filter(item => item.type === state.filter.type);
      }
      // Фильтрация по диапазону дат
      if (state.filter.dateFrom) {
        data = data.filter(item => new Date(item.date) >= new Date(state.filter.dateFrom));
      }
      if (state.filter.dateTo) {
        data = data.filter(item => new Date(item.date) <= new Date(state.filter.dateTo));
      }
      return data;
    },
    sortedTransactions(state) {
      // Используем this для доступа к другим геттерам
      const data = [...this.filteredTransactions];
      const { field, order } = state.sort;
      data.sort((a, b) => {
        let compareA = a[field];
        let compareB = b[field];
        // Если сортировка по дате
        if (field === 'date') {
          compareA = new Date(compareA);
          compareB = new Date(compareB);
        }
        if (compareA < compareB) return order === 'asc' ? -1 : 1;
        if (compareA > compareB) return order === 'asc' ? 1 : -1;
        return 0;
      });
      return data;
    },
    paginatedTransactions(state) {
      const start = (state.currentPage - 1) * state.perPage;
      return this.sortedTransactions.slice(start, start + state.perPage);
    },
    totalPages(state) {
      return Math.ceil(this.sortedTransactions.length / state.perPage);
    },
  },
});
