import * as React from 'react'
import { connect, useDispatch } from 'react-redux'

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

const ModalA = () => {
  const dispatch = useDispatch()
  const hide = React.useCallback(
    (name: string) => dispatch(modal.mutations.hide(name)),
    []
  )
  return (
    <div className="modal" style={modalStyle}>
      This is modal A<button onClick={() => hide('modalA')}>close</button>
    </div>
  )
}

const ModalB = () => {
  const dispatch = useDispatch()
  const hide = React.useCallback(
    (name: string) => dispatch(modal.mutations.hide(name)),
    []
  )
  return (
    <div className="modal" style={modalStyle}>
      This is modal B<button onClick={() => hide('modalB')}>close</button>
    </div>
  )
}

export const ModalComponent = () => {
  const dispatch = useDispatch()
  const show = React.useCallback(
    (...args: Parameters<typeof modal.mutations.show>) =>
      dispatch(modal.mutations.show(...args)),
    []
  )
  return (
    <>
      <button onClick={() => show('modalA', ModalA)}>show modal A</button>
      <button onClick={() => show('modalB', ModalB)}>show modal B</button>
    </>
  )
}

export const ModalButton = React.memo(ModalComponent)
