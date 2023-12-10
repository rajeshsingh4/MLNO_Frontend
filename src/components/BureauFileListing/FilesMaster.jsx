import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import FileMasterListService from '../../services/files.services';
import { useNavigate } from "react-router-dom";

const columns = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];

export const  FilesMaster = () => {
    const [fileListLoader, setFileListLoader] = React.useState(false);
    const [fileListError, setFileListError] = React.useState(false);
    const [fileList, setFileList] = React.useState([]);
    const navigate = useNavigate();

    const getFileList = async () => {
        setFileListLoader(true);
        try {
            const fileMasterDetails = await FileMasterListService.getFileMasterList();
            setFileList(fileMasterDetails.data);
        } catch (err) {
            console.error("Error fetching list of activity logs ", err);
            setFileListError(true);
        } finally {
            setFileListLoader(false);
        }
    };

    React.useEffect(() => {
        getFileList();
    }, []);

    if (fileListLoader) {
        return (
            <>Loading Files...</>
        )
    }

    if (fileListError) {
        return <>Error Loading Files, Please try again!!</>
    }

    const viewFileDetails = (fileId, cardData) => {
        console.log(fileId, cardData);
        navigate(`/files/${fileId}`, { state: cardData });
    }

    const getColumnMapping = (row) => {
        if (!row || (row && row.length === 0)) {
            return [];
        }
        let columns = [];
        const hiddenColumns = ['createdAt', 'updatedAt', 'FileAttribute'];
        const rowFieldKeys = Object.keys(row);
        rowFieldKeys.forEach(key => {
            const basicColumnFields = {
                field: key,
                headerName: key,
                description: key, // shows as tooltip
                sortable: true,
                width: 200,
                editable: false,
            };
            if (key === 'id') {
                basicColumnFields.headerName = 'S. No.';
                basicColumnFields.description = 'S. No.';
                basicColumnFields.width = 80;
            }
            if (key === 'fileName') {
                basicColumnFields.headerName = 'File Name';
                basicColumnFields.description = 'File Name';
            }
            if (key === 'CuffOffTime') {
                basicColumnFields.headerName = 'Cuff Off Time';
                basicColumnFields.description = 'Cuff Off Time';
                basicColumnFields.valueGetter = (params) => (new Date(params.row.CuffOffTime)).getTime();
            }
            if (key === 'FileUploadTime') {
                basicColumnFields.headerName = 'Actual File Upload Time';
                basicColumnFields.description = 'Actual File Upload Time';
                basicColumnFields.valueGetter = (params) => (new Date(params.row.FileUploadTime)).getTime();
            }
            if (key === 'cards') {
                basicColumnFields.headerName = 'Action';
                basicColumnFields.description = 'Action';
                basicColumnFields.sortable = false;
                basicColumnFields.renderCell = (params) => <Button variant="contained" disableElevation onClick={() => viewFileDetails(params.row.id, params.row)}>View Details</Button>
            }
            if (!hiddenColumns.includes(key)) {
                columns.push(basicColumnFields);
            }
        });
        return columns;
    }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        loading={fileListLoader}
        rows={fileList}
        columns={getColumnMapping(fileList[0])}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 5 },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50]}
        // checkboxSelection
      />
    </div>
  );
}
