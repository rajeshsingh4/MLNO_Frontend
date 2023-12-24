import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PullRequestService from '../../services/pull-request.service';
import { useParams } from 'react-router-dom';
import SkeletonLoader from '../../common/SkeletonLoader';

const ViewPullRequestDetails = (props) => {
    const [pullRequestDetailsLoader, setPullRequestDetailsLoader] = React.useState(false);
    const [pullRequestDetailsError, setPullRequestDetailsError] = React.useState(false);
    const [pullRequestDetails, setPullRequestDetails] = React.useState({});
    const { id } = useParams();

    const getPullRequestListDetails = async () => {
        setPullRequestDetailsLoader(true);
        try {
            const pullRequestResp = await PullRequestService.getPullRequestById(id);
            setPullRequestDetails(pullRequestResp.data);
        } catch (err) {
            console.error("Error fetching pull request details ", err);
            setPullRequestDetailsError(true);
        } finally {
            setPullRequestDetailsLoader(false);
        }
    };

    React.useEffect(() => {
        getPullRequestListDetails();
    }, []);

    if (pullRequestDetailsLoader) {
        return (
            <SkeletonLoader count={20} />
        )
    }

    if (pullRequestDetailsError) {
        return <>Error Loading Pull Requests Details, Please try again!!</>
    }

    const getHoursMinutesSeconds = (date) => {
        const tempDate = new Date(date);
        return `${tempDate.getHours()}:${tempDate.getMinutes()}:${tempDate.getSeconds()}`;
    }
    
    const getColumnMapping = (row) => {
        if (!row || (row && row.length === 0)) {
            return [];
        }
        let columns = [];
        const hiddenColumns = ['updatedAt', 'fileMasterId', 'createdBy', 'modifiedBy', 'cardId'];
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
            if (key === 'action') {
                basicColumnFields.headerName = 'Action';
                basicColumnFields.description = 'Action';
            }
            if (key === 'changeCommunicatedTo') {
                basicColumnFields.headerName = 'Change Communicated To';
                basicColumnFields.description = 'Change Communicated To';
            }
            if (key === 'field') {
                basicColumnFields.headerName = 'Field';
                basicColumnFields.description = 'Field';
            }
            if (key === 'originalValue') {
                basicColumnFields.headerName = 'Original Value';
                basicColumnFields.description = 'Original Value';
            }
            if (key === 'newValue') {
                basicColumnFields.headerName = 'New Value';
                basicColumnFields.description = 'New Value';
            }
            if (key === 'mode') {
                basicColumnFields.headerName = 'Mode';
                basicColumnFields.description = 'Mode';
            }
            if (key === 'ipaddress') {
                basicColumnFields.headerName = 'IP Address';
                basicColumnFields.description = 'IP Address';
            }
            if (key === 'serviceRequest') {
                basicColumnFields.headerName = 'Service Request';
                basicColumnFields.description = 'Service Request';
            }
            if (key === 'createdAt') {
                basicColumnFields.headerName = 'Date & Time';
                basicColumnFields.description = 'Date & Time';
                basicColumnFields.valueGetter = (params) => (new Date(params.row.createdAt)).getTime();
            }
            if (!hiddenColumns.includes(key)) {
                columns.push(basicColumnFields);
            }
        });
        return columns;
    }

    return (
        <div style={{ height: 600, width: '100%' }}>
            <TableContainer >
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell>Pull Request ID</TableCell>
                            <TableCell>{pullRequestDetails.id}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Date</TableCell>
                            <TableCell>{new Date(pullRequestDetails.createdAt).toLocaleDateString()}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Time</TableCell>
                            <TableCell>{getHoursMinutesSeconds(pullRequestDetails.createdAt)}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Change Originator</TableCell>
                            <TableCell>{pullRequestDetails.userId}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Change Communicated To</TableCell>
                            <TableCell>{pullRequestDetails.changeCommunicatedTo}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Action</TableCell>
                            <TableCell>{pullRequestDetails.action}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Field</TableCell>
                            <TableCell>{pullRequestDetails.field}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Original Value</TableCell>
                            <TableCell>{pullRequestDetails.originalValue}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>New Value</TableCell>
                            <TableCell>{pullRequestDetails.newValue}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Mode of Communication</TableCell>
                            <TableCell>{pullRequestDetails.mode}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>IP Address</TableCell>
                            <TableCell>{pullRequestDetails.ipaddress}</TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell>Service Request ID</TableCell>
                            <TableCell>{pullRequestDetails.serviceRequest}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <TableContainer>
                {/* <DataGrid
                    loading={pullRequestDetailsLoader}
                    rows={pullRequestDetails.cards}
                    columns={getColumnMapping(pullRequestDetails.cards[0])}
                    initialState={{
                        pagination: {
                            paginationModel: { page: 0, pageSize: 10 },
                        },
                    }}
                    pageSizeOptions={[10, 20, 50, 100]}
                    // checkboxSelection
                /> */}
            </TableContainer>
        </div>
    );
}

export default ViewPullRequestDetails;