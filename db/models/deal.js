const Sequelize = require('Sequelize');
const db = require('../index.js').instance;

const {client} = require('./client');
const {building} = require('./building');

const Deal = db.define('deal', {
	id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	client_id: {type: Sequelize.INTEGER, allowNull: false},
	building_id: {type: Sequelize.INTEGER, allowNull: false}
});

Deal.belongsTo(client, {foreignKey: 'client_id'});
Deal.belongsTo(building, {foreignKey: 'building_id'});

exports.deal = Deal;

exports.getDeals = async () => {
	return await Deal.findAll({include: [{model: client, required: true}, {model: building, required: true}]});
}
