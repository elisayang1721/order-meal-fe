import Vue from 'vue'

// import upperFirst from 'lodash/upperFirst'

// import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  '@c/Dialog', false, /Dailog[A-Z]\w+\.vue$/
)
export default () => {
  requireComponent.keys().forEach(fileName => {
    const componentConfig = requireComponent(fileName)

    const componentName = componentConfig.default.name

    // eslint-disable-next-line no-shadow
    Vue.component(componentName, resolve => {
      resolve(componentConfig.default || componentConfig)
    })
  })
}
