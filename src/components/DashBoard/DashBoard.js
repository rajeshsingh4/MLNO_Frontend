import React from "react";
import ChartPie from './Chart'
import Grid from "@mui/material/Unstable_Grid2/Grid2";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import FileMasterListService from '../../services/files.services';

const bureauListSample = [
  {
    id: 1,
    name: 'BureauName_a'
  },
  {
    id: 2,
    name: 'BureauName_b'
  },
  {
    id: 3,
    name: 'BureauName_c'
  }
]

const DashBoard = () => {
  const [bureauList, setBureauList] = React.useState([]);
  const [bureauGroupData, setBureauGroupData] = React.useState({});
  const [fileList, setFileList] = React.useState([]);
  const [selectedBureau, setSelectedBureau] = React.useState([]);
  const [fileListLoader, setFileListLoader] = React.useState(false);
  const [fileListError, setFileListError] = React.useState(false);
  
  function setBureauGroupfun(bureauDetails){
    console.log(bureauDetails);
    const bureauNames = Object.keys(bureauDetails)
    const bureauListToSet=[]
    for(let i=0;i<bureauNames.length;i++){
      bureauListToSet.push({
        id:i,
        name:bureauNames[i]
      })
    }
    setBureauList(bureauListToSet);
  }
  const getFileList = async () => {
    setFileListLoader(true);
    try {
      const bureauDetails = await FileMasterListService.getBureauTAT();
      setBureauGroupfun(bureauDetails.data);
      setFileList(bureauDetails.data);
    } catch (err) {
      console.error("Error fetching list of files in dashboard ", err);
      setFileListError(true);
    } finally {
      setFileListLoader(false);
    }
  };

  React.useEffect(() => {
    getFileList();
  }, []);

  const handleBureauSelect = (e, bureau) => {
    const checked = e.target.checked;
    if (checked) {
      setSelectedBureau([...selectedBureau, bureau.id]);
    } else {
      setSelectedBureau(selectedBureau.filter(bu => bu !== bureau.id));
    }
  }
  
  const getBureauFilesNCards = (bureauName) => fileList.filter(file => file.BureauName === bureauName);
  console.log('selectedBureau', selectedBureau);

  return (
    <div className="container">
      <h3> Dashboard</h3>
      <Grid container spacing={3}>
        <Grid xs={12} md={6}>
          <FormGroup>
            {
              bureauList.map(bureau => (
                <FormControlLabel key={bureau.id} control={<Checkbox onChange={(e) => handleBureauSelect(e, bureau)} />} label={bureau.name} />
              ))
            }
          </FormGroup>
        </Grid>
        <Grid xs={12} md={6}>
          Consolidated Matrix
          
        </Grid>
        {
          bureauList.map(bureau => selectedBureau.includes(bureau.id) && (
            <Grid xs={12} sm={4} key={bureau.id}>
              <ChartPie files={getBureauFilesNCards(bureau.name)} bureau={bureau} />
            </Grid>
          ))
        }
      </Grid>
    </div>
  );
};

export default DashBoard;
