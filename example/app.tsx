import { App } from 'reapex'
import modalModule from '../src'

const app = new App()

export const modal = app.use(modalModule, '@@modals')

export default app
