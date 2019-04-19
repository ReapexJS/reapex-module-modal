import { App } from 'reapex'
import modalPlugin from '../src/modal.plugin'

const app = new App({ mode: 'development' })

export const modal = modalPlugin(app, '@@modals')

export default app
