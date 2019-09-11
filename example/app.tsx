import { App } from 'reapex'
import modalPlugin from '../src'

const app = new App()

export const modal = app.plugin(modalPlugin, '@@modals')

export default app
