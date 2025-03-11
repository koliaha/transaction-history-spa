<!-- src/components/TransactionTable.vue -->
<template>
    <div class="table-container">
      <table class="transaction-table">
        <thead>
          <tr>
            <th>Дата</th>
            <th>Тип</th>
            <th>Сумма</th>
            <th>Описание</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in transactions" :key="item.id">
            <td>{{ item.date }}</td>
            <td>
              <span :class="{'income': item.type === 'income', 'expense': item.type === 'expense'}">
                {{ item.type === 'income' ? 'Доход' : 'Расход' }}
              </span>
            </td>
            <td>{{ item.amount.toLocaleString() }} ₽</td>
            <td>{{ item.description }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useTransactionStore } from '../store/transactionStore';
  
  const store = useTransactionStore();
  
  const transactions = computed(() => store.paginatedTransactions);
  </script>
  
  <style scoped lang="scss">
  .table-container {
    overflow-x: auto;
    background: #ffffff;
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    padding: 15px;
  }
  
  .transaction-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  
    thead {
      background-color: #3182ce;
      color: white;
      text-align: left;
  
      th {
        padding: 12px;
        font-weight: 600;
        text-transform: uppercase;
        border-bottom: 2px solid #2563eb;
      }
    }
  
    tbody {
      tr {
        border-bottom: 1px solid #e2e8f0;
        transition: background 0.2s ease-in-out;
  
        &:hover {
          background-color: #f1f5f9;
        }
  
        td {
          padding: 10px;
          color: #2d3748;
        }
  
        .income {
          color: #16a34a;
          font-weight: 600;
        }
  
        .expense {
          color: #dc2626;
          font-weight: 600;
        }
      }
    }
  }
  
  /* Адаптивность */
  @media (max-width: 768px) {
    .transaction-table {
      font-size: 12px;
  
      th, td {
        padding: 8px;
      }
    }
  }
  </style>
  