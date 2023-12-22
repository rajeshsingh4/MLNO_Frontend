import React, { useState } from 'react';
import CardTrackingService from '../../services/card.service';
import SkeletonLoader from '../../common/SkeletonLoader';
import MUIDataTable from 'mui-datatables';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Unstable_Grid2';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import ClearIcon from '@mui/icons-material/Clear';
import { withStyles } from '@mui/styles';

const styles = () => ({
	modalContent: {
		position: 'absolute',
		top: '50%',
		left: '50%',
		transform: 'translate(-50%, -50%)',
		width: 'calc(80vw)',
		height: '80vh',
		backgroundColor: '#FFFFFF',
		overflowX: 'hidden',
		overflowY: 'auto',
		fontWeight: 500,
		textAlign: 'start',
		padding: '24px'
	}
});

const CreatePullRequestList = (props) => {
    const { classes } = props;
    const [cardList, setCardList] = React.useState([]);
    const [cardListLoader, setCardListLoader] = React.useState(false);
    const [cardListError, setCardListError] = React.useState(false);
    const [pullRequestModal, setPullRequestModal] = React.useState({ open: false, rowData: null, tableMeta: null });
    const [pullRequestFormData, setPullRequestFormData] = useState(null);

    const getCardListForPullRequest = async () => {
        setCardListLoader(true);
        try {
            const cardDetails = await CardTrackingService.getAllCardsWithFileDeatils();
            setCardList(cardDetails.data);
        } catch (err) {
            console.error("Error fetching list of cards for creating pull-request ", err);
            setCardListError(true);
        } finally {
            setCardListLoader(false);
        }
    };

    React.useEffect(() => {
        getCardListForPullRequest();
    }, []);

    const createPullRequest = (tableMeta) => {
        console.log(tableMeta);
        setPullRequestModal({ open: true, rowData: tableMeta.rowData, tableMeta });
    }

    const handleUpdate = (e) => {
        e.preventDefault();
        console.log('submit pull request Data', pullRequestFormData);
    }

    const handleClose = () => {
        pullRequestFormData(null);
		setPullRequestModal({ open: false, rowData: null, tableMeta: null });
	};

    const updateFormData = (e) => {
		const name = e.target.name;
		const value = e.target.value;
		setPullRequestFormData({
            ...pullRequestFormData,
            [name]: value
		});
	}

    const createFormElement = (tableData)  => {
		let hiddenElements = ['id', 'createdAt', 'updatedAt', 'fileMasters'];
		const formData = pullRequestFormData;
		let listElements = Object.keys(formData);
		let formElements = [];

		listElements.forEach((key, i) => {
			let basicAttributesOfElement = {
				id: `${key}_${i}_edit_item`,
				name: key,
				label: key,
				placeholder: key,
				value: formData[key],
				onChange: (e) => updateFormData(e),
				type: typeof formData[key] === 'number' ? 'number' : 'text',
				'aria-label': key,
				fullWidth: true,
				size: 'medium'
			}
			if (!hiddenElements.includes(key)) {
				formElements.push(
					<Grid key={i} xs={12} sm={6} md={4}>
						<TextField
							{...basicAttributesOfElement}
						/>
					</Grid>
				);
			}
		})
		return formElements;
	}

    const getColumnMapping = (row) => {
		let fieldList = [];
		let listKey = Object.keys(row);

		let fieldToShow = ['trackingId','Bank','AWB_No','Product','Logo','PA_Flag','NRWC_Flag','Bureau_Total_TAT_Days','Bureau_TAT_Extra_Days_Passed','Bureau_Status','Courier_Status','Courier_TAT_Extra_Days_Passed', 'fileMaster']

		listKey.forEach((key, i) => {
			let baseFieldObj = { name: listKey[i], label: listKey[i], options: { filter: true, print: false, display: (fieldToShow.includes(listKey[i]) ? true : 'excluded') } };
            if (listKey[i] === 'fileMaster') {
                baseFieldObj.name = "fileMaster.fileName";
                baseFieldObj.label = "File Name";
            }
            fieldList.push(baseFieldObj);
			if (i === (listKey.length - 1)) {
				baseFieldObj = {
					name: 'Actions', label: 'Actions', options: {
						filter: false,
						sort: false,
                        print: false,
						customBodyRender: (value, tableMeta, updateValue) => (
							<>
								<IconButton aria-label="edit" value={value} data-custom={{ tableMeta, updateValue }} onClick={() => createPullRequest(tableMeta)}>
									<EditIcon />
								</IconButton>
							</>
						)
					}
				};
				fieldList.push(baseFieldObj);
			}
		})
		return fieldList;
	}

    if (cardListLoader) {
        return <SkeletonLoader />
    }

    if (cardListError) {
        return <>Error fetching card deatils for pull request....!!</>
    }

    return (
        <>
            <MUIDataTable
                // title="Name of Table"
                data={cardList}
                columns={getColumnMapping(cardList[0] || [])}
                options={{
                    filter: true,
                    fixedHeader: true,
                    filterType: 'dropdown',
                    responsive: 'standard',
                    print: false,
                    selectableRows: 'none',
                    enableNestedDataAccess: ".",
                    rowsPerPage: 10,
                    rowsPerPageOptions: [10, 20, 50, 100],
                }}
            />
            <Modal
                id='create-pull-request-item'
                aria-labelledby="pull-request-item"
                aria-describedby="pull-request-item-description"
                open={pullRequestModal.open}
                onClose={handleClose}
            >
                <Box className={classes.modalContent}>
                    <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        Create Pull Request for {(pullRequestModal.open && pullRequestModal.rowData) && pullRequestModal.rowData[3]}
                        <IconButton id='close-pull-request-item' onClick={handleClose}><ClearIcon /></IconButton>
                    </Typography>
                    <Box component="form" id="card-form-container" noValidate autoComplete="off" sx={{ mt: 2, mb: 1 }}>
                        <Grid container spacing={3} id="card-form-element-container">
                            {(pullRequestModal.open && pullRequestModal.rowData) && createFormElement()}
                        </Grid>
                        <Grid container spacing={3} sx={{ mt: 2 }} justifyContent='end'>
                            <Button id='pull-request-form-close-button' onClick={handleClose} variant="outlined" sx={{ mr: 1 }}>Close</Button>
                            <Button type='submit' id='pull-request-form-submit-button' onClick={(e) => handleUpdate(e)} variant="contained">Update</Button>
                        </Grid>
                    </Box>
                </Box>
            </Modal>
        </>
    )
}

export default withStyles(styles)(CreatePullRequestList);