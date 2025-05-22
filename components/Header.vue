<template>
  <header class="font-sans py-3">
    <!-- Top row: burger + heading + usericon -->
    <div class="flex items-center justify-between sm:justify-start gap-4 relative z-10">
      <BurgerMenu />

      <h1 class="header text-center sm:text-left flex-1">
        TheCollections
      </h1>

      <a href="/user">
        <UserIcon/>
      </a>
      
    </div>

    <!-- Subheading below -->
    <h2 class="subheader mt-2 mr-20">
      Search over 60 million records and 100,000 archaeological finds.
    </h2>
  </header>
</template>


<script setup>


</script>

<style lang="css" scoped>
.header-wrapper {
  flex-shrink: 0;
  overflow: hidden;
  box-sizing: border-box;
}

.header {
font-size: clamp(2rem, 6vw, 5rem);
line-height: 0.9;
}

.subheader {
    font-size: clamp(1.2rem, 3vw, 3rem);
    line-height: 1.2;
}
</style>


