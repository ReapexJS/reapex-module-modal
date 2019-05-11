import React from 'react'
import { App } from 'reapex'
import { connect } from 'react-redux'

export interface ModalConfig {
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

  const mutations = modal.mutations({
    show: (name: string, component: React.ComponentType<any>, props: Record<string, any>) => s => {
      const modals = s.get('modals')

      let updatedModals = modals.filter(m => m.name !== name)
      updatedModals = [ ...updatedModals, { name, component, props, show: true } ]

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
    }
  })

  const mapStateToProps = (state: any) => ({ modals: modal.state.get('modals')(state) })
  const mapDispatchToProps = mutations

  type ModalComponentProps = ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps

  const ModalComponent: React.FC<ModalComponentProps> = props => {
    return (
      <div className="reapex-modals">
        {props.modals.map(m => {
          return m.show ? <m.component key={m.name} { ...m.props } show={props.show} hide={props.hide} /> : null
        })}
      </div>
    )
  }

  return {
    state: modal.state,
    mutations,
    Component: connect(mapStateToProps, mapDispatchToProps)(ModalComponent),
  }
}

export default plugin
