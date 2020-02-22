import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'

import app, { modal } from './app'
import { ModalButton, ModalHoolsComponent } from './Modal'

const store = app.createStore()
render(
  <Provider store={store}>
    <>
      <div>
        <ModalButton />
      </div>
      <div>
        <ModalHoolsComponent />
      </div>
      <modal.Component />
    </>
  </Provider>,
  document.getElementById('root')
)
