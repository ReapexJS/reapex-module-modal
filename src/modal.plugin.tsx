import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { App } from 'reapex'

export interface ModalConfig {
  name: string
  show: boolean
  component: React.ComponentType<any>
  props?: Record<string, any>
}

const plugin = (app: App, namespace: string = '@@modal') => {
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
      const modals = s.get('modals')

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

      return s.set('modals', updatedModals)
    },
    hide: (name: string) => s => {
      const modals = s.get('modals')
      const updatedModals = modals.map(m => {
        if (m.name === name) {
          return { ...m, show: false }
        }
        return m
      })
      return s.set('modals', updatedModals)
    },
    destroy: (name: string) => s => {
      const modals = s.get('modals')
      const updatedModals = modals.filter(m => m.name !== name)
      return s.set('modals', updatedModals)
    },
  })

  const ModalComponent = () => {
    const modals = useSelector(modal.selectors.modals)

    return (
      <div className="reapex-modals">
        {modals.map(m => {
          return m.show ? <m.component key={m.name} {...m.props} /> : null
        })}
      </div>
    )
  }

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
    Component: ModalComponent,
    useModal,
  }
}

export default plugin
