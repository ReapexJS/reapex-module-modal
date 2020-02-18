import { App } from 'reapex'
import React from 'react'
import { useSelector } from 'react-redux'

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
      component: React.ComponentType<any>,
      props?: Record<string, any>
    ) => s => {
      const modals = s.get('modals')

      let updatedModals = modals.filter(m => m.name !== name)
      updatedModals = [...updatedModals, { name, component, props, show: true }]

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

  return {
    state: modal.state,
    mutations,
    Component: ModalComponent,
  }
}

export default plugin
