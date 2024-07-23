// stores/Global.ts
import { defineStore } from 'pinia'

export const useGlobalStore = defineStore('global', {
  state: () => ({
    statusBarHeight: 0,
    navBarHeight: 0,
    topIconDistance: 0,
    menuTop: 0,
  }),
  actions: {
    setGlobalInfo(statusBarHeight: number, navBarHeight: number, topIconDistance: number, menuTop: number) {
      this.statusBarHeight = statusBarHeight
      this.navBarHeight = navBarHeight
      this.topIconDistance = topIconDistance
      this.menuTop = menuTop

    }
  }
})
