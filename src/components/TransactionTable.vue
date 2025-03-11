<!-- src/components/TransactionTable.vue -->
<template>
    <table class="min-w-full bg-white border">
      <thead>
        <tr>
          <th class="py-2 px-4 border-b">Дата</th>
          <th class="py-2 px-4 border-b">Тип</th>
          <th class="py-2 px-4 border-b">Сумма</th>
          <th class="py-2 px-4 border-b">Описание</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in transactions" :key="item.id" class="hover:bg-gray-50">
          <td class="py-2 px-4 border-b">{{ item.date }}</td>
          <td class="py-2 px-4 border-b">
            <span :class="{'text-green-500': item.type === 'income', 'text-red-500': item.type === 'expense'}">
              {{ item.type === 'income' ? 'Доход' : 'Расход' }}
            </span>
          </td>
          <td class="py-2 px-4 border-b">{{ item.amount }}</td>
          <td class="py-2 px-4 border-b">{{ item.description }}</td>
        </tr>
      </tbody>
    </table>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useTransactionStore } from '../store/transactionStore';
  
  const store = useTransactionStore();
  
  const transactions = computed(() => store.paginatedTransactions);
  </script>
  