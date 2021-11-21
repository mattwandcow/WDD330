export function getJSON(url) {
	//fetch the URL and return it
	return fetch(url).then(function (response) {
			if (!response.ok) {
				throw Error(response.statusText);
			} else {

				return response.json();
			}
		}
	).catch(function (error) {
		console.log(error);
	})
}

export const getLocation = function(options) {
    return new Promise(function(resolve, reject) {
        return navigator.geolocation.getCurrentPosition(resolve, reject, options);
    });
};