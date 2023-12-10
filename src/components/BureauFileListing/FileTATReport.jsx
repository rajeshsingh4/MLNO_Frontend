import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import FileMasterListService from '../../services/files.services';
import { useNavigate } from "react-router-dom";

export const  FileTATReport = () => {
    const [fileTatLoader, setFileListLoader] = React.useState(false);
    const [fileTatError, setFileListError] = React.useState(false);
    const [fileTatReport, setFileList] = React.useState([]);
    const navigate = useNavigate();

    const getFileTATReports = async () => {
        setFileListLoader(true);
        try {
            const fileTATDetails = await FileMasterListService.getFileMasterList();
            // adding 5 temp columns - total cards count, bureau within tat, bureau outside tat, courier within tat, courier outside tat
            fileTATDetails.data.map(file => {
                file.totalCards = file.cards.length;
                file.bureauwithintat = 1;
                file.bureauoutsidetat = 1;
                file.courierwithintat = 1;
                file.courieroutsidetat = 1;
                return file;
            });
            setFileList(fileTATDetails.data);
        } catch (err) {
            console.error("Error fetching list of activity logs ", err);
            setFileListError(true);
        } finally {
            setFileListLoader(false);
        }
    };

    React.useEffect(() => {
        getFileTATReports();
    }, []);

    if (fileTatLoader) {
        return (
            <>Loading TAT Reports...</>
        )
    }

    if (fileTatError) {
        return <>Error Loading Report, Please try again!!</>
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
        const hiddenColumns = ['id', 'CutOffTime', 'FileUploadTime', 'cards', 'createdAt', 'updatedAt', 'FileAttribute'];
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
            if (key === 'totalCards') {
                basicColumnFields.headerName = 'Records';
                basicColumnFields.description = 'Records';
            }
            if (key === 'bureauwithintat') {
                basicColumnFields.headerName = 'Bureau within TAT';
                basicColumnFields.description = 'Bureau within TAT';
            }
            if (key === 'bureauoutsidetat') {
                basicColumnFields.headerName = 'Bureau outside TAT';
                basicColumnFields.description = 'Bureau outside TAT';
            }
            if (key === 'courierwithintat') {
                basicColumnFields.headerName = 'Courier within TAT';
                basicColumnFields.description = 'Courier within TAT';
            }
            if (key === 'courieroutsidetat') {
                basicColumnFields.headerName = 'Courier outside TAT';
                basicColumnFields.description = 'Courier outside TAT';
            }
            // if (key === 'cards') {
            //     basicColumnFields.headerName = 'Action';
            //     basicColumnFields.description = 'Action';
            //     basicColumnFields.sortable = false;
            //     basicColumnFields.renderCell = (params) => <Button variant="contained" disableElevation onClick={() => viewFileDetails(params.row.id, params.row)}>View Details</Button>
            // }
            if (!hiddenColumns.includes(key)) {
                columns.push(basicColumnFields);
            }
        });
        return columns;
    }

  return (
    <div style={{ height: 400, width: '100%' }}>
      <DataGrid
        loading={fileTatLoader}
        rows={fileTatReport}
        columns={getColumnMapping(fileTatReport[0])}
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
