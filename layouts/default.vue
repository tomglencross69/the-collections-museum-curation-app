<template>
  <div class="app-wrapper px-4 sm:px-10 lg:px-15 min-h-screen flex flex-col">
    <main class="content flex-grow border mx-auto w-full max-w-content">
      <header class="sr-only">Main content starts here</header>
      <Header />
      <NavBar class="hidden sm:block"/> 
      <slot />
    </main>
    <div class="mx-auto w-full max-w-content max-w-1360px">
      <Footer />
    </div>
  </div>
</template>

<script setup lang="ts">

</script>

<style lang="css" scoped>

</style>