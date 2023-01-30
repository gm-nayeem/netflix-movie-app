import './home.scss';
import Navbar from '../../components/navbar/Navbar';
import Featured from '../../components/featured/Featured';
import List from '../../components/list/List';
import { useState, useEffect } from 'react';
import axios from 'axios';

const tokenUrl = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYzZDU3OGFiNDNiMGQxZWQ0OTY2YmRlNSIsImlzQWRtaW4iOnRydWUsImlhdCI6MTY3NTA3ODU1MSwiZXhwIjoxNjc1NTEwNTUxfQ.bsZ4nLzWrBUybk6SYN-7WDQwxCwhMG3nIdrmry_ni5s";

const Home = ({type}) => {
  const [lists, setLists] = useState([]);
  const [genre, setGenre] = useState(null);

  useEffect(() => {
    const getRandomLists = async () => {
      try{
        const res = await axios.get(
          `http://localhost:8000/api/lists${type ? "?type=" + type : ""}${genre ? "&genre=" + genre : ""}`, {
            headers: {
              token: tokenUrl
            }
          }
        );
        setLists(res.data);
      } catch(err) {
        console.log(err.message);
      }
    }
    getRandomLists();
  }, [type, genre]);


  return (
    <div className='home'>
      <Navbar />
      <Featured type={type}/>
      {
        lists.map(list => (
          <List list={list}/>
        ))
      }
    </div>
  )
}

export default Home