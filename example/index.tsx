import React from 'react'

import app, { modal } from './app'
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { ModalButton } from './Modal'

const store = app.createStore()
render(
  <Provider store={store}>
    <>
      <ModalButton />
      <modal.Component />
    </>
  </Provider>,
  document.getElementById('root')
)
