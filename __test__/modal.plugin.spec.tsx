import React from 'react'
import { App } from 'reapex'

import modalPlugin from '../src'

const ModalComponent = () => <div></div>

describe('modal plugin', () => {
  let app: App
  let modal: ReturnType<typeof modalPlugin>

  beforeEach(() => {
    app = new App()
    modal = app.use(modalPlugin, '@@modals')
    app.createStore()
  })

  it('should show modal', () => {
    app.store.dispatch(modal.mutations.show('MODAL_NAME', ModalComponent))
    const modals = modal.state.selectors.modals(app.store.getState())
    expect(modals).toHaveLength(1)
    expect(modals[0].name).toBe('MODAL_NAME')
    expect(modals[0].show).toBe(true)
  })

  it('should hide modal', () => {
    app.store.dispatch(modal.mutations.show('MODAL_NAME', ModalComponent))
    const modals = modal.state.selectors.modals(app.store.getState())
    expect(modals[0].show).toBe(true)

    app.store.dispatch(modal.mutations.hide('MODAL_NAME'))
    const newModals = modal.state.selectors.modals(app.store.getState())
    expect(newModals[0].show).toBe(false)
  })

  it('should destroy modal', () => {
    app.store.dispatch(modal.mutations.show('MODAL_NAME', ModalComponent))
    const modals = modal.state.selectors.modals(app.store.getState())
    expect(modals).toHaveLength(1)

    app.store.dispatch(modal.mutations.destroy('MODAL_NAME'))
    const newModals = modal.state.selectors.modals(app.store.getState())
    expect(newModals).toHaveLength(0)
  })
})
