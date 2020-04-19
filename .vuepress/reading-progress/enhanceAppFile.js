import ReadingProgress from './ReadingProgress.vue'

export default ({ Vue }) => {
  Vue.component('reading-progress', ReadingProgress)
  Vue.mixin({
    computed: {
      $readingShow() {
        console.log(this.$page.frontmatter.readingShow, 'this.$page.frontmatter.readingShow')
        return this.$page.frontmatter.readingShow
      }
    }
  })
}
