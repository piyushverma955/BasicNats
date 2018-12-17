let NATS = require('nats');
let config = require('../BasicNats/config');
let client = NATS.connect(config.NATSConfig);

client.on('error', function(err) {
	console.log(err.message);
});
 
client.on('connect', function() {
	console.log('NATS connected');
});
 
client.on('disconnect', function() {
	console.log('NATS disconnect');
});
 
client.on('reconnecting', function() {
	console.log('NATS reconnecting');
});
 
client.on('reconnect', function() {
	console.log('NATS reconnect');
});
 
client.on('close', function() {
	console.log('NATS close');
});

module.exports = {
	client: client
};