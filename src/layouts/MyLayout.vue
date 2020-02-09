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
      <keep-alive>
        <router-view />
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
    // console.log(this.$axios)
    console.log(this.$store.getters['user/isLogin'])
    // window.localStorage.setItem('token', 'sdfadsf')
  }
}
</script>

<style lang="stylus">

</style>
