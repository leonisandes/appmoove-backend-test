module.exports = () => ({
    handlerExceptionService: fn => (...args) => fn(...args).catch(e => {
        console.error(`Ocorreu um erro desconhecido: ${e}`);
        throw Error('Ocorreu um erro desconhecido.');
    }),
    handlerExceptionController: fn => (...args) => fn(...args).catch(e => args[2](e)),
});
