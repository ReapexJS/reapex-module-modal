import React from 'react'

import app from './app'
import { Registered } from 'reapex'
import { render } from 'react-dom';
import { Provider } from 'react-redux';

const store = app.createStore()
render(
  <Provider store={store}>
    <div>
      <Registered name="counter" lazy={() => import('./Counter/Counter')} />
      <Registered name="@@modals" />
    </div>
  </Provider>,
  document.getElementById('root')
)
