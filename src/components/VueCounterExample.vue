<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0);
const items = ['a', 'b', 'c'];
</script>

<template>
  <button type="button" @click="count++">Count is: {{ count }}</button>
  <ul>
    <li v-for="item in items" :key="item">{{ item }}</li>
  </ul>
</template>
