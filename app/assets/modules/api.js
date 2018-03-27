const axios = require('axios');

async function _rq(props){
	let {method, endpoint, data} = props;
	try{
		return axios[method](endpoint, data ? data : '');
	}catch(err){
		return err;
	}
}

const api = {
	//Client
	async getClients(){
		return await _rq({
			method: 'get',
			endpoint: '/client'
		});
	},
	async addClient(data){
		return await _rq({
			method: 'post',
			endpoint: '/client',
			data
		});
	},
	async editClient(data){
		return await _rq({
			method: 'patch',
			endpoint: `/client/${data.id}`,
			data
		});
	},
	async deleteClient(id){
		return await _rq({
			method: 'delete',
			endpoint: `/client/${id}`
		});
	},

	//Customer company
	async getCCompany(){
		return await _rq({
			method: 'get',
			endpoint: '/customer-company'
		});
	},
	async getCCompanyByName(val){
		return await _rq({
			method: 'get',
			endpoint: `/customer-company?q=${val}`
		});
	},

	//Building cCompany
	async getBCompany(){
		return await _rq({
			method: 'get',
			endpoint: '/building-company'
		});
	},
	async getBCompanyByName(val){
		return await _rq({
			method: 'get',
			endpoint: `/building-company?q=${val}`
		});
	},

	//buildings
	async getBuildings(){
		return await _rq({
			method: 'get',
			endpoint: '/building'
		});
	},
	async editBuilding(data){
		return _rq({
			method: 'post',
			endpoint: '/building',
			data
		})
	}
}

export default api;
