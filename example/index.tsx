import React from 'react'
import { render } from 'react-dom'
import { Provider, useSelector } from 'react-redux'

import app, { modal } from './app'
import { ModalButton, ModalHooksComponent } from './Modal'

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

const store = app.createStore()
render(
  <Provider store={store}>
    <>
      <div>
        <ModalButton />
      </div>
      <div>
        <ModalHooksComponent />
      </div>
      <Modals />
    </>
  </Provider>,
  document.getElementById('root')
)
