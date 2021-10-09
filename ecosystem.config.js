module.exports = {
    apps : [{
        name: 'socket-pm2',
        script: 'index.js',
        instances: 'max',
        exec_mode: 'cluster',
    }]
}