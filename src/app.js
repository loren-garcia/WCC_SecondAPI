const configExpress = require('./config/configExpress');
const config = require('config');
const instanciaDB = require('./DB');
require('dotenv').config();

(async () => {
    try{
        await instanciaDB.sync(); // await instanciaDB.sync({ force: true });
        
        app = configExpress();
        app.listen(config.get('api.port'), () => {
            console.log('Servidor rodando');
        });
    }catch(error) {
        throw error;
    }
})(); //função anônima

