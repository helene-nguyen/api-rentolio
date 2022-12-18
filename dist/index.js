var _a;
//~Import modules
import 'dotenv/config';
import express from 'express';
const app = express();
import { router } from './app/routes/index.js';
import { ErrorApi } from './app/services/errorHandler.js';
//~ Export for test with Jest
export { app };
//~ Protect the API with Helmet
import helmet from 'helmet';
app.use(helmet());
//~ Import debug
import debug from 'debug';
const logger = debug('Entrypoint');
//~ Encoding accepted
//accept Content-type: application/json
app.use(express.json());
// accept Content-type: application/x-www-form-urlencoded
app.use(express.urlencoded({
    extended: true
}));
//~ Cors
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,PATCH,DELETE');
    next();
});
//~ Session
import session from 'express-session';
app.use(session({
    saveUninitialized: true,
    resave: true,
    proxy: true,
    secret: process.env.SESSION_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
        sameSite: 'lax',
        maxAge: 24 * 60 * 60 * 1000 //24 hours
        //expires : new Date(Date.now() + 60 * 60 * 1000) //1 hour
    }
}));
//~ Router
app.use(router);
//~ Handle error if no route found
app.use((req, res) => {
    throw new ErrorApi(`Page not found !`, req, res, 404);
});
//~ Launch Server
if (process.env.NODE_ENV !== 'test') {
    const PORT = (_a = process.env.PORT) !== null && _a !== void 0 ? _a : 3000;
    app.listen(PORT, () => {
        logger(`🚀\x1b[1;35m Launch server on http://localhost:${PORT}\x1b[0m`);
    });
}
//# sourceMappingURL=index.js.map