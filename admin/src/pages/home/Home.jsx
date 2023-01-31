import { useEffect, useState, useMemo } from 'react'
import './home.css'
import FeaturedInfo from '../../components/featuredInfo/FeaturedInfo'
import Chart from '../../components/Chart/Chart'
import WidgetSm from '../../components/widgetSm/WidgetSm'
import WidgetLg from '../../components/widgetLg/WidgetLg'
import axios from 'axios'


const tokenUrl = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDU3OGFiNDNiMGQxZWQ0OTY2YmRlNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NTA3ODU1MSwiZXhwIjoxNjc1NTEwNTUxfQ.bsZ4nLzWrBUybk6SYN-7WDQwxCwhMG3nIdrmry_ni5s";


const Home = () => {
  const MONTHS = useMemo(
    () => [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Agu",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    []
  );
  
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const getStats = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/users/stats", {
            headers: {
              token: tokenUrl
            }
          }
        );
        const statsList = res.data.sort((a, b) => {
          return a._id - b._id;
        });
        statsList.map((item) =>
          setUserStats((prev) => [
            ...prev,
            { name: MONTHS[item._id - 1], "New User": item.total },
          ])
        );
      } catch (err) {
        console.log(err.message);
      }
    };
    getStats();
  }, [MONTHS]);
  

  return (
    <div className='home'>
      <FeaturedInfo />
      <Chart data={userStats} title="User Analytics" grid dataKey="New User" />
      <div className="homeWidgets">
        <WidgetSm />
        <WidgetLg />
      </div>
    </div>
  )
}

export default Home;

