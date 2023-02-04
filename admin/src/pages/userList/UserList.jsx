import './userList.css'
import { DataGrid } from '@mui/x-data-grid';
import {DeleteOutline} from '@mui/icons-material'
import {Link} from 'react-router-dom'
import { useEffect, useContext } from 'react';
import {UserContext} from '../../context/userContext/UserContext'
import {getUsers, deleteUser} from '../../context/userContext/userApiCalls';

const UserList = () => {
  const {users, dispatch} = useContext(UserContext);

  useEffect(() => {
    getUsers(dispatch)
  }, [dispatch]);

  const handleDelete = (id)=> {
    deleteUser(id, dispatch);
  }

  const columns = [
    { field: '_id', headerName: 'User ID', width: 220 },
    { 
      field: 'user', 
      headerName: 'User', 
      width: 220 ,
      renderCell: (params)=> {
        return (
          <div className='userListUser'>
            <img className='userListImg' src={params.row.profilePic} alt="" />
            {params.row.username}
          </div>
        )
      }
    },
    { field: 'email', headerName: 'Email', width: 220 },
    {
      field: 'isAdmin',
      headerName: 'IsAdmin',
      width: 140,
    },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params)=> {
        return (
          <>
            <Link to={"/users/"+params.row._id} state={{user: params.row}}>
              <button className="userListEdit">Edit</button>
            </Link>
            <DeleteOutline className="userListDelete" onClick={() => handleDelete(params.row._id)} />
          </>         
        )
      }
    }
  ];

  return (
    <div className='userList'>
      <DataGrid
        rows={users}
        columns={columns}
        disableSelectionOnClick
        pageSize={8}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={r => r._id}
      />
    </div>
  )
}

export default UserList