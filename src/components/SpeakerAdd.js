import { useState } from "react";
import withAuth from "./withAuth";
function SpeakerAdd ({eventYear, insertRecord, loggedInUser}){
    // const addId = useState("99999");
    // const addIdSession = useState("88888");
    if (!loggedInUser || loggedInUser.length === 0 ) return null;

    return (
        <a href="#" className="addSes">

            <i onClick={(e)=> {
                e.preventDefault();
                const firstLast = window.prompt("Enter first and last name:", "");
                const firstLastArray = firstLast.split(' ');
                insertRecord ({
                    // id: `${addId}`,
                    id: 99999,
                    first: firstLastArray[0],
                    last: firstLastArray[1], bio: "Bio not entered yet",
                    sessions: [
                        {
                            // id: `${addIdSession}`,
                            id: 88888,
                            title: `'New Session for' ${firstLastArray[0]}`,
                            room: {
                                name: "Main Bell Room"
                            },
                            eventYear,
                        }
                    ]
                })
            }}>
                +
            </i>
        </a>
    )
}
export default withAuth(SpeakerAdd);