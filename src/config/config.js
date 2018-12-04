let config = require('./config.json');
let env = 'development'
let envConfig = config[env];

Object.keys(envConfig).forEach((key)=>{
    process.env[key] = envConfig[key];
})
