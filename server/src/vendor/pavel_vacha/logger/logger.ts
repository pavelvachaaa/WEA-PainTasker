/**
 * @name REY_LOG
 * @author Pavel Vácha
 * @version 0.1
 * @description Pomocná utilita pro logování
 */

import { createLogger, format, transports } from 'winston';
const { combine, timestamp, label } = format;

const logger = createLogger({
    format: combine(
        timestamp(),
        format.json()
    ),
    transports: [ // Tady se trošku více zamyslet (možná pak do /var/log když NODE_ENV je production?)
        new transports.File({ filename: './logs/error.log', level: 'error' }),
        new transports.File({ filename: './logs/combined.log' }),
    ],
});

if (process.env.NODE_ENV !== 'production') {
    logger.add(new transports.Console({
        format: format.simple(),
    }));
}

export default logger;
