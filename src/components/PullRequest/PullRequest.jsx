import React from 'react';
import CardTrackingService from '../../services/card.service';
import { DataGrid } from '@mui/x-data-grid';
import SkeletonLoader from '../../common/SkeletonLoader';

export default function PullRequest(props) {
    const [cardList, setCardList] = React.useState([]);
    const [cardListLoader, setCardListLoader] = React.useState(false);
    const [cardListError, setCardListError] = React.useState(false);

    const getCardListForPullRequest = async () => {
        setCardListLoader(true);
        try {
            const cardDetails = await CardTrackingService.getAllCardsWithFileDeatils();
            setCardList(cardDetails.data);
        } catch (err) {
            console.error("Error fetching list of cards in pull-request ", err);
            setCardListError(true);
        } finally {
            setCardListLoader(false);
        }
    };

    React.useEffect(() => {
        getCardListForPullRequest();
    }, []);

    const getColumnMapping = (row) => {
        if (!row || (row && row.length === 0)) {
            return [];
        }
        let columns = [];
        const hiddenColumns = ['id', 'Date', 'BureauName', 'CutOffTime', 'FileUploadTime', 'cards', 'createdAt', 'updatedAt', 'FileAttribute', 'fileMaster', 'fileMasterId'];
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
                // basicColumnFields.renderCell = (params) => <Button variant="contained" color="apple" onClick={() => showTATDetailsReport('bureauwithintat', params.row.id, params.row['bureauwithintat_listData'])} disableElevation size="small" style={{ marginLeft: 16 }}>{params.row.bureauwithintat}</Button>
            }
            if (key === 'bureauWIP') {
                basicColumnFields.headerName = 'Bureau WIP';
                basicColumnFields.description = 'Bureau WIP';
                // basicColumnFields.renderCell = (params) => <Button variant="contained" color="apple" onClick={() => showTATDetailsReport('bureauWIP', params.row.id, params.row['bureauwithintat_listData'])} disableElevation size="small" style={{ marginLeft: 16 }}>{params.row.bureauWIP}</Button>
            }
            if (key === 'bureauoutsidetat') {
                basicColumnFields.headerName = 'Bureau outside TAT';
                basicColumnFields.description = 'Bureau outside TAT';
                // basicColumnFields.renderCell = (params) => <Button variant="contained" onClick={() => showTATDetailsReport('bureauoutsidetat', params.row.id, params.row['bureauoutsidetat_listData'])} disableElevation size="small" style={{ marginLeft: 16 }}>{params.row.bureauoutsidetat}</Button>
            }
            if (key === 'courierwithintat') {
                basicColumnFields.headerName = 'Courier within TAT';
                basicColumnFields.description = 'Courier within TAT';
                // basicColumnFields.renderCell = (params) => <Button variant="contained" onClick={() => showTATDetailsReport('courierwithintat', params.row.id, params.row['courierwithintat_listData'])} disableElevation size="small" style={{ marginLeft: 16 }}>{params.row.courierwithintat}</Button>
            }
            if (key === 'courieroutsidetat') {
                basicColumnFields.headerName = 'Courier outside TAT';
                basicColumnFields.description = 'Courier outside TAT';
                // basicColumnFields.renderCell = (params) => <Button variant="contained" onClick={() => showTATDetailsReport('courieroutsidetat', params.row.id, params.row['courieroutsidetat_listData'])} disableElevation size="small" style={{ marginLeft: 16 }}>{params.row.courieroutsidetat}</Button>
            }
            if (!hiddenColumns.includes(key)) {
                columns.push(basicColumnFields);
            }
        });
        return columns;
    }

    if (cardListLoader) {
        return <SkeletonLoader />
    }

    if (cardListError) {
        return <>Error fetching card deatils for pull request....!!</>
    }

    return (
        <>
            <DataGrid
                loading={cardListLoader}
                rows={cardList}
                columns={getColumnMapping(cardList[0])}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 10 },
                    },
                }}
                pageSizeOptions={[10, 20, 50, 100]}
            />
        </>
    )
}