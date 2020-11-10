### Reapex modal module

```typescript
import { App } from 'reapex'
import modalModule from 'reapex-module-modal'

const app = new App()

// 1. register the module
const modal = app.use(modalModule, '@@modals')

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
show(MyDialogComponent, props)
hide()
```
