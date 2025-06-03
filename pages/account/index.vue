<template>
  <section class="max-w-[640px] mx-auto bg-customYellow p-4 rounded-b-xl"
  aria-label="account tab">
    <h1 class="text-xl pb-5 font-semibold">Account</h1>
    <h2>Welcome, {{currentUser}}</h2>
<p class="py-5">
    User account functionality is currently in development.</p> <p>A hardcoded 'test-user' is defined within Pinia state management - to launch the project in your own development server and check out how user state works, please visit the <a href="https://github.com/tomglencross69/the-collections-museum-curation-app" target="_blank" class="underline">GitHub</a>.</p>
  </section>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/users'
const userStore = useUserStore()

const currentUser = userStore.user.name

</script>

<style scoped>

</style>
