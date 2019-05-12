import * as React from 'react'
import { connect } from 'react-redux'

// import { Registered } from '../../src'
import { modal } from './app'

const modalStyle: React.CSSProperties = {
  width: 200,
  position: 'absolute',
  top: '50%',
  left: '50%',
  padding: 20,
  border: '1px solid #ccc',
  display: 'flex',
  flexDirection: 'column',
  lineHeight: '70px',
  background: '#fff',
  transform: 'translateX(-50%) translateY(-50%)',
  boxShadow: '1px 1px 2px #ccc',
}

const ModalA: React.FC<{hide: typeof modal.mutations.hide}> = props =>
  <div className="modal" style={modalStyle}>
    This is modal A
    <button onClick={() => props.hide('modalA')}>close</button>
  </div>

const ModalB: React.FC<{hide: typeof modal.mutations.hide}> = props =>
  <div className="modal" style={modalStyle}>
    This is modal B
    <button onClick={() => props.hide('modalB')}>close</button>
  </div>


const mapDispatchToProps = {
  show: modal.mutations.show,
  hide: modal.mutations.hide,
}

type CounterComponentProps = typeof mapDispatchToProps

const ModalComponent: React.SFC<CounterComponentProps> = props => {
  return (
    <>
      <button onClick={() => props.show('modalA', ModalA)}>show modal A</button>
      <button onClick={() => props.show('modalB', ModalB)}>show modal B</button>
    </>
  )
}

const ModalComponentMemo = React.memo(ModalComponent)

export const ModalButton = connect(null, mapDispatchToProps)(ModalComponentMemo)
