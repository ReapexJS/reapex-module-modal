import React from 'react'
import { useDispatch } from 'react-redux'
import { App } from 'reapex'

export interface ModalConfig {
  name: string
  show: boolean
  component: React.ComponentType<any>
  props?: Record<string, any>
}

const logic = (app: App, namespace: string = '@@modal') => {
  const initialState = {
    modals: [] as ModalConfig[],
  }
  const modal = app.model(namespace, initialState)

  const [mutations] = modal.mutations({
    show: (
      name: string,
      component?: React.ComponentType<any>,
      props?: Record<string, any>
    ) => s => {
      const modals = s.modals

      let updatedModals = modals.filter(m => m.name !== name)
      if (component) {
        updatedModals = [
          ...updatedModals,
          { name, component, props, show: true },
        ]
      } else {
        const found = modals.find(m => m.name === name)
        if (found) {
          updatedModals = [
            ...updatedModals,
            {
              name,
              component: component || found.component,
              props,
              show: true,
            },
          ]
        }
      }

      return { ...s, modals: updatedModals }
    },
    hide: (name: string) => s => {
      const modals = s.modals
      const updatedModals = modals.map(m => {
        if (m.name === name) {
          return { ...m, show: false }
        }
        return m
      })
      return { ...s, modals: updatedModals }
    },
    destroy: (name: string) => s => {
      const modals = s.modals
      const updatedModals = modals.filter(m => m.name !== name)
      return { ...s, modals: updatedModals }
    },
  })

  const useModal = (name: string) => {
    const dispatch = useDispatch()
    const hide = React.useCallback(() => dispatch(mutations.hide(name)), [])
    const show = React.useCallback(
      (component?: React.ComponentType<any>, props?: Record<string, any>) =>
        dispatch(mutations.show(name, component, props)),
      []
    )
    const destroy = React.useCallback(
      () => dispatch(mutations.destroy(name)),
      []
    )
    return { hide, show, destroy }
  }

  return {
    state: modal.state,
    mutations,
    selectors: modal.selectors,
    useModal,
  }
}

export default logic
