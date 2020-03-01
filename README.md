### Reapex modal plugin

```typescript
import { App } from 'reapex'
import modalPlugin from 'reapex-plugin-modal'

const app = new App()

// 1. register the plugin
const modal = app.use(modalPlugin, '@@modals')

// 2. Create a component to render the modals
const Modals = () => {
  const modals = useSelector(modal.selectors.modals)

  return (
    <div className="reapex-modals">
      {modals.map(m => {
        return m.show ? <m.component key={m.name} {...m.props} /> : null
      })}
    </div>
  )
}

// 3. Render it
<Provider store={store}>
  <Modals />
</Provider>

// show/hide any component
const {show, hide} = modal.useModal('MyDialog')
dispatch(show(MyDialogComponent, props))
dispatch(hide('MyDialog'))
```
