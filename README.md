### Reapex modal plugin

```typescript
import { App } from 'reapex'
import modalPlugin from 'reapex-plugin-modal'

const app = new App()

// 1. register the plugin
const modal = modalPlugin(app, '@@modals')

// 2. add the modal component to your React application root
<Provider store={store}>
  <Registered name="@@modals" />
</Provider>

// show/hide any component
store.dispatch(modal.mutation.show('modal1', SomeComponent, props))
store.dispatch(modal.mutation.hide('modal1'))
```
