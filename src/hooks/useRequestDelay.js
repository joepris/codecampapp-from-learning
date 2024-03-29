import { useState, useEffect } from "react";

export const REQUEST_STATUS = {
	LOADING: "loading",
	SUCCESS: "success",
	FAILURE: "failure",
};

function useRequestDelay(delayTime = 1000, initialData = []) {
	const [data, setData] = useState(initialData);
	const [requestStatus, setRequestStatus] = useState(REQUEST_STATUS.LOADING);
	const [error, setError] = useState("");

	const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
	// function in useEffect runs after the component that includes this custom hook  completely renders
	useEffect(() => {
		async function delayFunc() {
			try {
				await delay(delayTime);
				//throw "test."
				setRequestStatus(REQUEST_STATUS.SUCCESS);
				setData(data);
			} catch (e) {
				setRequestStatus(REQUEST_STATUS.FAILURE);
				setHasErrored(true);
				setError(e);
			}
		}
		delayFunc();
	});
	// old favorite function:
	// function onFavoriteToggle(id) {
	// 	const speakerRecPrevious = speakerData.find(function (rec) {
	// 		return rec.id === id;
	// 	});
	// 	const speakerRecUpdated = {
	// 		...speakerRecPrevious,
	// 		favorite: !speakerRecPrevious.favorite,
	// 	};
	// 	const speakerDataNew = speakerData.map(function (rec) {
	// 		return rec.id === id ? speakerRecUpdated : rec;
	// 	});
	// 	setSpeakerData(speakerDataNew);
	// }

	function updateRecord(record, doneCallBack) {
		console.log();
		const originalRecord = [...data];
		const newRecord = data.map(function(rec) {
			return rec.id === record.id ? record : rec;
			});

		async function delayFunction() {
			try {
				setData(newRecord);
				await delay(delayTime);
				if (doneCallBack) {
					doneCallBack();
				}
			} catch (error) {
				console.log("error thrown inside delayFunction", error);
				if (doneCallBack) {
					doneCallBack();
				}
				setData(originalRecord);
			}
		}
		delayFunction();
	}
	
	function deleteRecord(record, doneCallBack) {
		console.log();
		const originalRecord = [...data];
		const newRecord = data.filter(function(rec) {
		return rec.id !== record.id;
		});

		async function delayFunction() {
			try {
				setData(newRecord);
				await delay(delayTime);
				if (doneCallBack) {
					doneCallBack();
				}
			} catch (error) {
				console.log("error thrown inside delayFunction", error);
				if (doneCallBack) {
					doneCallBack();
				}
				setData(originalRecord);
			}
		}
		delayFunction();
	}

	function insertRecord(record, doneCallBack) {
		console.log();
		const originalRecord = [...data];
		const newRecord = [record, ...data];
		// const newRecord = [record, ...data]; prints new speaker first; in loop stuck, prints after new speaker,
		// but before old speakers. Fixed before was able to see why.
		// const newRecord = [...data, record]; prints new speaker last

		async function delayFunction() {
			try {
				setData(newRecord);
				await delay(delayTime);
				if (doneCallBack) {
					doneCallBack();
				}
			} catch (error) {
				console.log("error thrown inside delayFunction", error);
				if (doneCallBack) {
					doneCallBack();
				}
				setData(originalRecord);
			}
		}
		delayFunction();
	}

	return {
		data,
		requestStatus,
		error,
		updateRecord,
		insertRecord,
		deleteRecord,
	};
}

// async function delayFunction() {
// 	try {
// 		await delay(delayTime);
// 				if (doneCallBack) {
// 					doneCallBack();
// 				} }
// 				setData(newRecord);
// 			 } catch (error) {
// 				console.log("error thrown inside delayFunction", error);
// 				if (doneCallBack) {
// 					doneCallBack();
// 				}
// 				setData(originalRecord);
// 			}
// 		}
// 		delayFunction();
// 	}
// 	return {
// 		data,
// 		requestStatus,
// 		error,
// 		updateRecord,
// 		insertRecord,
// 		deleteRecord,
// 	};
// }

export default useRequestDelay;
