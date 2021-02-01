const winston = require('winston');

const { File, Console } = winston.transports;

const winstonFormatter = winston.format.combine(
    winston.format.timestamp({
        format: 'YYYY-MM-DD hh:mm:ss A ZZ',
    }),
    winston.format.printf(
        (info) => {
            const msg = info.details || info.detail || info.message || info.req || info.name;
            return `${info.level}: ${info.service} [${info.timestamp}] ${JSON.stringify(msg)}`;
        },
    ),
);

const rawLogger = (file, service) => {
    const wl = winston.createLogger({
        level: 'info',
        format: winston.format.json(),
        defaultMeta: { service },
        transports: [new File({ filename: file, format: winstonFormatter })],
    });
    if (process.env.NODE_ENV !== 'production') {
        wl.add(new Console({ format: winstonFormatter }));
    }
    return wl;
};

const defaultLogger = (service) => rawLogger('logs/log.log', service);

module.exports = { rawLogger, defaultLogger };