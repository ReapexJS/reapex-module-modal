import * as React from 'react'
import { connect } from 'react-redux'

// import { Registered } from '../../src'
import app, { modal } from '../app'

const ModalA: React.FC<{hide: typeof modal.mutations.hide}> = props =>
  <div>
    This is modal A
    <button onClick={() => props.hide('modalA')}>close</button>
  </div>

const ModalB: React.FC<{hide: typeof modal.mutations.hide}> = props =>
  <div>
    This is modal B
    <button onClick={() => props.hide('modalB')}>close</button>
  </div>


const mapDispatchToProps = {
  show: modal.mutations.show,
  hide: modal.mutations.hide,
}

type CounterComponentProps = typeof mapDispatchToProps

const CounterComponent: React.SFC<CounterComponentProps> = props => {
  return (
    <>
      <button onClick={() => props.show('modalA', ModalA, {})}>show modal A</button>
      <button onClick={() => props.show('modalB', ModalB, {})}>show modal B</button>
    </>
  )
}

app.register('counter', connect(null, mapDispatchToProps)(CounterComponent))
