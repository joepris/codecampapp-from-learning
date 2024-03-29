import Speaker from "./Speaker";
import ReactPlaceHolder from "react-placeholder";
// import useRequestDelay, { REQUEST_STATUS } from "../hooks/useRequestDelay";
import useRequestRest, { REQUEST_STATUS } from "../hooks/useRequestRest";
import { data } from "../SpeakerData";
import { useContext } from "react";
import { SpeakerFilterContext } from "../contexts/SpeakerFilterContext";
import SpeakerAdd from "./SpeakerAdd";

function SpeakersList() {
	const {
		data: speakerData,
		requestStatus,
		error,
		updateRecord,
		insertRecord,
		deleteRecord,
	} = useRequestRest();

	const { showSessions, searchQuery, eventYear } =
		useContext(SpeakerFilterContext);

	if (requestStatus === REQUEST_STATUS.FAILURE) {
		return <div className="text-danger">ERROR: {error}</div>;
	}
	// if (isLoading===true) {
	//     return(
	//         <div>Loading...</div>
	//     );
	// }
	return (
		<div className="container speakers-list">
			<ReactPlaceHolder
				type="media"
				rows={15}
				className="speakerslist-placeholder"
				ready={requestStatus === REQUEST_STATUS.SUCCESS}
			>
			<SpeakerAdd eventYear={eventYear} insertRecord={insertRecord} deleteRecord={deleteRecord} />
				<div className="row">
					{speakerData
						.filter(function (speaker) {
							return (
								speaker.first.toLowerCase().includes(searchQuery) ||
								speaker.last.toLowerCase().includes(searchQuery)
							);
						})
						.filter(function (speaker) {
							return speaker.sessions.find((session) => {
								return session.eventYear === eventYear;
							});
						})

						.map(function (speaker) {
							return (
								<Speaker
									key={speaker.id}
									speaker={speaker}
									// showSessions={showSessions}
									updateRecord={updateRecord}
									insertRecord={insertRecord}
									deleteRecord={deleteRecord}
									// onFavoriteToggle={(doneCallBack) => {
									// 	updateRecord(
									// 		{
									// 			...speaker,
									// 			favorite: !speaker.favorite,
									// 		},
									// 		doneCallBack
									// 	);
									// }}
								/>
							);
						})}
				</div>
			</ReactPlaceHolder>
		</div>
	);
}
export default SpeakersList;
