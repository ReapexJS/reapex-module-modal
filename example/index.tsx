import React from 'react'

import app, { modal } from './app'
import { Registered } from 'reapex'
import { render } from 'react-dom';
import { Provider } from 'react-redux';

const store = app.createStore()
render(
  <Provider store={store}>
    <div>
      <Registered name="counter" lazy={() => import('./Counter/Counter')} />
      <modal.Component />
    </div>
  </Provider>,
  document.getElementById('root')
)
