import "./widgetSm.css";
import { Visibility } from "@mui/icons-material";
import { useState, useEffect } from 'react'
import axios from "axios";

const tokenUrl = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDU3OGFiNDNiMGQxZWQ0OTY2YmRlNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NTA3ODU1MSwiZXhwIjoxNjc1NTEwNTUxfQ.bsZ4nLzWrBUybk6SYN-7WDQwxCwhMG3nIdrmry_ni5s";

export default function WidgetSm() {
    const [newUser, setNewUser] = useState([]);

    useEffect(() => {
        const getNewUser = async () => {
            try {
                const res = await axios.get(
                    "http://localhost:8000/api/users?new=true", {
                    headers: {
                        token: tokenUrl
                    }
                }
                );
                setNewUser(res.data)
            } catch (err) {
                console.log(err.message);
            }
        };
        getNewUser();
    }, []);


    return (
        <div className="widgetSm">
            <span className="widgetSmTitle">New Join Members</span>
            <ul className="widgetSmList">
                {
                    newUser.map(user => (
                        <li className="widgetSmListItem" key={user._id}>
                            <img
                                src={user.profilePic || "https://www.pngarts.com/files/5/User-Avatar-Download-PNG-Image.png"}
                                alt=""
                                className="widgetSmImg"
                            />
                            <div className="widgetSmUser">
                                <span className="widgetSmUsername">{user.username}</span>
                            </div>
                            <button className="widgetSmButton">
                                <Visibility className="widgetSmIcon" />
                                Display
                            </button>
                        </li>
                    ))
                }
            </ul>
        </div>
    );
}