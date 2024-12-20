export default APICall = (apiGot, jsonDataToPassInApi, result, action) => {
	{
		console.log('Api Link:', apiGot, 'dataPassed:', jsonDataToPassInApi);
	}
	(async () => {
		try {
			let api = await fetch(apiGot, {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(jsonDataToPassInApi),
			});
			if (api.ok) {
				if (action === 'getReport') {
					const resp = await api.json();
					const ans = resp['members'];
					result(ans, null);
				} else if (action === 'checkAuthentication') {
					const resp = await api.json();
					const ans = resp['members'];
					if (ans[0].plantName !== '') {
						result('User Authentication Success');
					} else {
						result('User Authentication Failed');
					}
				} else if (action === 'getUserInformation') {
					const resp = await api.json();
					const ans = resp;
					// console.log(ans);
					if (ans.empId !== '') {
						result(ans, 'Got User Info');
					} else {
						result(null, 'No user');
					}
				} else if (action === 'getResponse') {
					const resp = await api.json();
					const ans = resp;
					console.log(ans);
					result(ans, null);
				}else {
					const resp = await api.json();
					if (resp.error) {
						result('Failed');
					} else {
						result('Success');
					}
				}
			} else {
				console.log('ApiStatus', api.status);
				if (action === 'getReport') {
					result(null, null);
				} else if (action === 'getResponse') {
					result(null, 'error');
				} else {
					result('Failed');
					console.log('Error in sending Data');
				}
			}
		} catch (error) {
			console.log('Error Got: ', error);
			if (action === 'getReport') {
				result(null, 'error');
			} else if (action === 'getResponse') {
				result(null, 'error');
			} else {
				console.log('Internal Server Error in sending Data');
			}
		}
	})();
};
