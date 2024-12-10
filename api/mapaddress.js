
import regeneratorRuntime, {
	async
} from '../lib/runtime/runtime';

export const  getLocation= (data) =>{
	return uni.$ajax.get({
		url: 'mp/map/getAddress',
		data: data
	})
}

export const  getAddressBykeyword= (data) =>{
	return uni.$ajax.get({
		url: 'mp/map/getAddressBykeyword',
		data: data
	})
}

