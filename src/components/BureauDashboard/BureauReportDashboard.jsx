import React from "react";
import Box from '@mui/material/Box';
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import SkeletonLoader from "../../common/SkeletonLoader";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import FileMasterListService from '../../services/files.services';

export const BureauReportDashboard = (props) => {
    const [bureauList, setBureauList] = React.useState([]);
    const [fileList, setFileList] = React.useState([]);
    const [selectedBureau, setSelectedBureau] = React.useState('');
    const [fileListLoader, setFileListLoader] = React.useState(false);
    const [fileListError, setFileListError] = React.useState(false);
    const [bureauReport, setBureauReport] = React.useState(null);
    const [bureauReportLoader, setBureauReportLoader] = React.useState(false);
    const [bureauReportError, setBureauReportError] = React.useState(false);

    const createUniqueBureauList = (bureauDetails) => {
        const uniqueBureauData = [...new Map(bureauDetails.map(item => [item['BureauName'], item])).values()];
        setBureauList(uniqueBureauData);
    }

    const getFileList = async () => {
        setFileListLoader(true);
        try {
            const bureauDetails = await FileMasterListService.getFileMasterList();
            createUniqueBureauList(bureauDetails.data);
            setFileList(bureauDetails.data);
        } catch (err) {
            console.error("Error fetching list of files in dashboard ", err);
            setFileListError(true);
        } finally {
            setFileListLoader(false);
        }
    };

    const getReportForBureau = async (bureauName) => {
        setBureauReportLoader(true);
        try {
            const bureauDetails = await FileMasterListService.getBureauReport(bureauName);
            setBureauReport(bureauDetails.data);
        } catch (err) {
            console.error("Error fetching list of files in dashboard ", err);
            setBureauReportError(true);
        } finally {
            setBureauReportLoader(false);
        }
    };

    React.useEffect(() => {
        getFileList();
    }, []);
    
    React.useEffect(() => {
        if (bureauList.length > 0) {
            getReportForBureau(bureauList[0].bureauName);
        }
    }, [bureauList]);

    const handleBureauSelect = (e) => {
        setSelectedBureau(e.target.value);
    }

    const getSelectedFilesForBureau = (bureauName) => fileList(item => item.BureauName === bureauName);

    if (fileListLoader || bureauReportLoader) {
        return <SkeletonLoader />
    }

    if (fileListError) {
        return <>Error loading bureau list....!!</>
    }

    if (bureauReportError) {
        return <>Error loading bureau reports....!!</>
    }

    return (
        <Box>
            <Grid container spacing={3}>
                <Grid xs={12} sm={3}>
                    <FormControl sx={{ minWidth: 200 }}>
                        <InputLabel id="select-bureau-dashboard">Select Bureau</InputLabel>
                        <Select
                            labelId="select-bureau-dashboard"
                            id="select-bureau"
                            value={selectedBureau}
                            label="Select Bureau"
                            onChange={(e) => handleBureauSelect(e)}
                        >
                            {
                                bureauList.map(item => <MenuItem key={item.BureauName} value={item.BureauName}>{item.BureauName}</MenuItem>)
                            }
                        </Select>
                    </FormControl>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid xs={12} sm={6}>
                    <TableContainer>
                        <Table sx={{ minWidth: 650 }} aria-label="Bureau List">
                            <TableBody>
                                <TableRow>
                                    <TableCell component="th" scope="row" sx={{ borderBottom: 'none'}}>Oldest Data</TableCell>
                                    <TableCell component="th" scope="row" sx={{ borderBottom: 'none'}}>10/05/2023</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row" sx={{ borderBottom: 'none'}}>Count of days for which old data is pending</TableCell>
                                    <TableCell component="th" scope="row" sx={{ borderBottom: 'none'}}>44</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row" sx={{ borderBottom: 'none'}}>Overall data allocated</TableCell>
                                    <TableCell component="th" scope="row" sx={{ borderBottom: 'none'}}>7350</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row" sx={{ borderBottom: 'none'}}>Overall cards within TAT</TableCell>
                                    <TableCell component="th" scope="row" sx={{ borderBottom: 'none'}}>5725</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row" sx={{ borderBottom: 'none'}}>Overall data pending</TableCell>
                                    <TableCell component="th" scope="row" sx={{ borderBottom: 'none'}}>1625</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row" sx={{ borderBottom: 'none'}}>Overall cards within TAT %</TableCell>
                                    <TableCell component="th" scope="row" sx={{ borderBottom: 'none'}}>77.89 %</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell component="th" scope="row" sx={{ borderBottom: 'none'}}>Overall data outside TAT %</TableCell>
                                    <TableCell component="th" scope="row" sx={{ borderBottom: 'none'}}>22.11 %</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid xs={12} sm={12}>
                    <TableContainer component={Paper}>
                        <Table stickyHeader aria-label="bureau report list">
                            <TableHead>
                                <TableRow>
                                    <TableCell>Date</TableCell>
                                    <TableCell align='right'>Today</TableCell>
                                    <TableCell align='right'>25/9/2023</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow>
                                    <TableCell>Total Count Allocated</TableCell>
                                    <TableCell align='right'>641</TableCell>
                                    <TableCell align='right'>740</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Count Dispatched / Pulled as agreed</TableCell>
                                    <TableCell align='right'>640</TableCell>
                                    <TableCell align='right'>735</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Count Pending / WIP</TableCell>
                                    <TableCell align='right'>1</TableCell>
                                    <TableCell align='right'>5</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>% Pending / WIP of Total (0 decimal place)</TableCell>
                                    <TableCell align='right'>0.06 %</TableCell>
                                    <TableCell align='right'>0.31 %</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Beyond TAT count</TableCell>
                                    <TableCell align='right'>4</TableCell>
                                    <TableCell align='right'>4</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Beyond TAT %</TableCell>
                                    <TableCell align='right'>1 %</TableCell>
                                    <TableCell align='right'>1 %</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>Overall % within TAT (2 decimal place)</TableCell>
                                    <TableCell align='right'>99 %</TableCell>
                                    <TableCell align='right'>99 %</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>How many going out of TAT if not dispatched today (except for today)</TableCell>
                                    <TableCell align='right'>1</TableCell>
                                    <TableCell align='right'>3</TableCell>
                                </TableRow>
                                <TableRow>
                                    <TableCell>How many going out of TAT if not dispatched tomorrow</TableCell>
                                    <TableCell align='right'>0</TableCell>
                                    <TableCell align='right'>0</TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Box>
    )
}