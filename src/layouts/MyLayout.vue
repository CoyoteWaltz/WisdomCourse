<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="secondary"
      >
        <!-- class="glossy" -->
        <q-btn
          flat
          dense
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          <div style="text-align: center;">
            上大智课
          </div>
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list
        no-border
        inset-delimiter
      >
      <!-- list header -->
        <user-profile/>
        <!-- list item -->
        <left-navigation ref="leftNav"/>
      </q-list>
      <bulletin-board/>
    </q-layout-drawer>

    <q-page-container>
      <!-- 路由视图 -->
      <keep-alive>
        <transition name="fade">
          <router-view />
        </transition>
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>

import BulletinBoard from './BulletinBoard.vue'
import LeftNavigation from './LeftNavigation.vue'
import UserProfile from './UserProfile.vue'

export default {
  name: 'MyLayout',
  components: {
    LeftNavigation,
    BulletinBoard,
    UserProfile
  },
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  created () {
  }
}
</script>

<style scoped>
  .fade-enter-active, .fade-leave-active {
    transition: opacity .3s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
  .slide-fade-enter-active {
    transition: all .3s ease;
  }
  .slide-fade-leave-active {
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-fade-enter, .slide-fade-leave-to
  /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(10px);
    opacity: 0;
  }
</style>
