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
            <td>{{ formatDate(item.date) }}</td>
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
  function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString("ru-RU", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });
}
  </script>
  
  <style scoped lang="scss">
  @import "../assets/styles.scss";
  
  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  .table-container {
    overflow-x: auto;
    background: $table-bg;
    border-radius: $table-border-radius;
    box-shadow: $table-shadow;
    padding: $table-container-padding;
    animation: fadeIn $animation-duration ease-out;
  }
  
  .transaction-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 14px;
  
    thead {
      background-color: $thead-bg;
      color: $thead-text;
      text-align: left;
  
      th {
        padding: 12px;
        font-weight: 600;
        text-transform: uppercase;
        border-bottom: $thead-border;
        transition: background-color $transition-duration ease;
  
        &:hover {
          background-color: darken($thead-bg, 5%);
        }
      }
    }
  
    tbody {
      tr {
        border-bottom: $tbody-border;
        transition: background-color $transition-duration ease, transform $transition-duration ease;
  
        &:hover {
          background-color: $hover-bg;
          transform: scale(1.02);
        }
  
        td {
          padding: 10px;
          color: $cell-text;
          transition: color $transition-duration ease;
        }
  
        .income {
          color: $income-color;
          font-weight: 600;
        }
  
        .expense {
          color: $expense-color;
          font-weight: 600;
        }
      }
    }
  }
  
  @media (max-width: 768px) {
    .transaction-table {
      font-size: 12px;
  
      th, td {
        padding: 8px;
      }
    }
  }
  </style>
  