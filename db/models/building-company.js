const Sequelize = require('Sequelize');
const db = require('../index.js').instance;

const {boss} = require('./boss');
const {worker} = require('./worker');

const BuildingCompany = db.define('building_company', {
	id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
	name: {type: Sequelize.STRING, allowNull: false},
	address: {type: Sequelize.STRING}
});

exports.buildingCompany = BuildingCompany;

exports.getBuildingCompanies = async () => {
	return await db.query(`select bc.*, b.name as boss from building_companies as bc
				inner join bosses b on b.building_company_id = bc.id;`, {
					type: db.QueryTypes.SELECT
				});
}

exports.getBuildingCompany = async (id) => {
	let bCompany = await BuildingCompany.findById(id);
	let boss = await db.query(`select * from bosses
		where bosses.id = (select building_companies.boss_id from
		building_companies where building_companies.id = ${id});`, {
			type: db.QueryTypes.SELECT
		});
	let workers = await db.query(`select w.id, w.name, w.experience, w.age
			from worker_to_companies wtc, workers w
			where wtc.building_company_id = ${id} and w.id = wtc.worker_id;`);

	if(boss[0]){
		bCompany.dataValues.boss = boss[0];
	}
	if(workers[0]){
		bCompany.dataValues.workers = workers[0];
	}

	return bCompany;
}

exports.getBuildingCompanyByName = async val => {
	return await db.query(`select * from building_companies
			where name ilike '${val}%'`,
		{type: db.QueryTypes.SELECT});
}

exports.addBuildingCompany = async data => {
	return await BuildingCompany.create(data);
}
