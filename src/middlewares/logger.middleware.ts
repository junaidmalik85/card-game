import 'winston-daily-rotate-file'
import { createLogger, format, transports } from 'winston'
const {
    combine,
    timestamp,
    label,
    printf
} = format

const myFormat = printf(info => {
    return `${info.timestamp} [${info.label}] ${info.level}: ${info.message}`
})

export const logger = createLogger({
    format: combine(
        label({
            label: process.env.ENV
        }),
        timestamp(),
        format.json(),
        myFormat
    ),
    transports: [
        new transports.Console({
            level: 'info'
        }),
        new (transports.DailyRotateFile)({
            filename: './logs/info-%DATE%.log',
            level: 'info',
            json: true,
            maxFiles: '14d',
        })
    ]

})
