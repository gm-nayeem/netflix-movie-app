import './listList.css'
import { DataGrid } from '@mui/x-data-grid';
import {DeleteOutline} from '@mui/icons-material'
import {Link} from 'react-router-dom'
import { useContext, useEffect } from 'react';
import { ListContext } from '../../context/listContext/ListContext';
import { getLists } from '../../context/listContext/listApiCalls';

const ProductList = () => {
  const {lists, dispatch} = useContext(ListContext);

  useEffect(() => {
    getLists(dispatch);
  }, [dispatch]);

  const handleDelete = (id)=> {
    // deleteMovie(id, dispatch);
  }

  const columns = [
    { field: '_id', headerName: 'ID', width: 220 },
    { field: 'title', headerName: 'Title', width: 200 },
    { field: 'type', headerName: 'Type', width: 160 },
    { field: 'genre', headerName: 'Genre', width: 160 },
    {
      field: "action",
      headerName: "Action",
      width: 160,
      renderCell: (params)=> {
        return (
          <>
            <Link to={"/lists/"+params.row._id} state={{list: params.row}} >
              <button className="listListEdit">Edit</button>
            </Link>
            <DeleteOutline className="listListDelete" 
              onClick={() => handleDelete(params.row._id)} 
            />
          </>         
        )
      }
    }
  ];

  return (
    <div className='movieList'>
      <DataGrid
        rows={lists}
        columns={columns}
        disableSelectionOnClick
        pageSize={10}
        rowsPerPageOptions={[5]}
        checkboxSelection
        getRowId={r => r._id}
      />
    </div>
  )
}

export default ProductList