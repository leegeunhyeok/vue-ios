<template>
  <transition-group name="navigate" class="i-navigator-wrap">
    <main class="i-view__main" key="main">
      <slot name="main"/>
    </main>
    <div class="i-view__sub" key="sub">
      <slot name="sub"/>
    </div>
  </transition-group>
</template>

<script>
export default {
  name: 'iNavigator'
}
</script>

<style lang="scss">
@import '../common/style/transition-navigate.scss';
@import '../common/style/common.scss';

.i-navigator-wrap {
  width: 100%;

  @media only screen and (min-width: 320px) {
    .i-view__main {
      width: 100%;
    }

    .i-view__sub {
      width: 100%;
      transform: translateX(-100%);
    }
  }

  @media only screen and (min-width: 700px), screen and (min-width: 768px) {
    .i-view__main {
      float: left;
      width: 30%;
    }

    .i-view__sub {
      float: right;
      width: 70%;
      transform: none;
    }
  }
}

</style>
