const fs = require('fs');
const path = require("path");

function buildConfig(argv) {

    const config = {
      'port': argv.port /*|| port*/,
      'https': {
        'key': argv.key /*|| key*/,
        'cert': argv.cert /*|| cert*/,
        'pfx': argv.pfx,
        'passphrase': argv.pass,
      }
    };
    return config;
}
  
function loadCertificateFiles(config) {
    // load https certs file content
    if (config && config.https) {
        ['key', 'cert', 'pfx'].forEach(key => {
        if (config.https[key]) {
            let file = config.https[key];
            config.https[key] = fs.readFileSync(file);
        }
        });
    }
    return config;
};
  
function validateParams (argv) {
    let isValid = true;
    const serviceFor=argv.s;

    if((argv.p==='' || !argv.p) && isValid) {
        isValid = false;
        process.stderr.write(`[${serviceFor}] port configuration is missing\n`);
    }

    if( (argv.k==='' && argv.c==='' && argv.x==='' && argv.w==='') && isValid) {
        isValid = false;
        process.stderr.write(`[${serviceFor}] https configuration is missing\n`);
    }

    if( ( (argv.k==='' && argv.c>'') || (argv.k>'' && argv.c==='')
        || (argv.x==='' && argv.w>'' && argv.k==='' && argv.c==='')
        || (argv.x==='' && argv.w>'' && !(argv.k>'' && argv.c>'')) 
        || (argv.x>'' && argv.w==='') ) && isValid) {
        isValid = false;
        process.stderr.write(`[${serviceFor}] https configuration is missing\n`);
    }

    if(!isValid) {
        process.stderr.write(`[${serviceFor}] is failed to start, error:\n`);
        process.exit(1);
        return false;
    }

    return true;
}

function buildConfigFromParams() {
    
    var argv = require('yargs')
    .usage('Usage: $0 [options]')
    .option('s', {
    alias: 'service',
    description: 'service-for path',
    default: ''
    })
    .option('p', {
    alias: 'port',
    description: 'listening port'
    })
    .option('k', {
    alias: 'key',
    default: '',
    description: 'server key'
    })
    .option('c', {
    alias: 'cert',
    default: '',
    description: 'server cert',
    })
    .option('x', {
    alias: 'pfx',
    default: '',
    description: 'server pfx',
    })
    .option('w', {
    alias: 'pass',
    default: '',
    description: 'server pfx passphrase',
    })
    .option('v', {
    alias: 'verbose',
    default: false,
    description: 'show request logs',
    type: 'boolean'
    })
    .help('h')
    .alias('h', 'help')
    .check(validateParams)
    .argv;

    let config = buildConfig(argv);
    config = loadCertificateFiles(config);
    return config;
}


module.exports = {
    buildConfigFromParams
};