var fs = require('fs');
if ( !fs.existsSync('./config.js') ) {
    fs.copyFileSync('./config.example.js', 'config.js');
    console.log('Configuration file created. [config.js]');
    console.log('Don\'t forget to change configuration file');
}else{
    console.log('COnfiguration file config.js already exists.');
}