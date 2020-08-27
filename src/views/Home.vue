<template>
  <div class="splash">
    <div class="splash__logo">🚢</div>
    <h1 class="splash__title">Battleship</h1>
    <nav>
      <router-link
        class="splash__btn btn"
        to="/single"
      >Single Player</router-link>
      <router-link
        class="splash__btn btn"
        to="/multi"
      >Multiplayer</router-link>
    </nav>
  </div>
</template>
