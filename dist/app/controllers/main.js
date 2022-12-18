//~ Import modules
import debug from 'debug';
const logger = debug('Controller');
//~ Controller methods
const renderHomeMessage = (req, res) => {
    try {
        return res.status(200).json({
            message: 'Welcome to Rentolio API',
        });
    }
    catch (err) {
        if (err instanceof Error)
            logger(err.message);
    }
};
export { renderHomeMessage };
//# sourceMappingURL=main.js.map