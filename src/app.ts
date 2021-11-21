import express from 'express'
import helmet from 'helmet'
import compression from 'compression'
import morgan from 'morgan'
import { logger } from './middlewares'
import swaggerUi from 'swagger-ui-express'
import swaggerJsdoc from 'swagger-jsdoc'
import swaggerDefinition from './swaggerDefinition'

class App {
    public app: express.Application = express();
    constructor() {
        this.app.use(express.json())
        this.app.use(compression())
        this.app.use(helmet())
        this.app.use(express.urlencoded({ extended: false }))
        this.app.use(morgan('combined', {
            stream: {
                write: (message: string) => {
                    logger.info(message.substring(0, message.lastIndexOf('\n')))
                }
            }
        }))
        this.app.use(morgan(process.env.ENV))

        const options = {
            definition: swaggerDefinition,
            apis: ['**/*.ts']
        }

        const swaggerDocument = swaggerJsdoc(options)
        this.app.use('/api-docs', express.static('node_modules/swagger-ui-dist/', { index: false }),
            swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
                swaggerOptions: {
                    filter: true
                }
            }))
    }
}

const app = new App().app
export default app
