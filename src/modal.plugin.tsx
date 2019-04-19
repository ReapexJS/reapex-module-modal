import React from 'react'
import { App } from 'reapex'
import { connect } from 'react-redux'

interface ModalConfig {
  name: string
  show: boolean
  component: React.ComponentType<any>
  props: Record<string, any>
}

const plugin = (app: App, namespace: string = '@@modal') => {
  const initialState = {
    modals: [] as ModalConfig[]
  }
  const modal = app.model(namespace, initialState)

  const mutations = modal.mutations(Modal => ({
    show: (name: string, component: React.ComponentType<any>, props: Record<string, any>) => s => {
      const modals = Modal.get('modals')(s)

      let updatedModals = modals.filter(m => m.name !== name)
      updatedModals = [ ...updatedModals, { name, component, props, show: true } ]

      return Modal.set('modals', updatedModals)(s)
    },
    hide: (name: string) => s => {
      const modals = Modal.get('modals')(s)
      const updatedModals = modals.map(m => {
        if (m.name === name) {
          return { ...m, show: false }
        }
        return m
      })
      return Modal.set('modals', updatedModals)(s)
    }
  }))

  const mapStateToProps = (state: any) => ({ modals: modal.state.get('modals')(state) })
  const mapDispatchToProps = mutations

  type ModalComponentProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

  const ModalComponent: React.FC<ModalComponentProps> = props => {
    return (
      <div className="reapex-modals">
        {props.modals.map(m => {
          return m.show ? React.createElement(m.component, { ...m.props, show: props.show, hide: props.hide }) : null
        })}
      </div>
    )
  }

  app.register(namespace, connect(mapStateToProps, mapDispatchToProps)(ModalComponent))

  return {
    state: modal.state,
    mutations,
  }
}

export default plugin
