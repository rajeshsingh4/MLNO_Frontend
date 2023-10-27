import React, { Component, useState, Fragment, useEffect  } from 'react';
// import CardTrackingService from "../services/card.service";
// import AddUserForm from './forms/AddUserForm'
//  import EditUserForm from './forms/EditUserForm'
import { withStyles } from "@material-ui/core/styles";
import { AppBar, Toolbar, Typography, Button, IconButton, Modal } from "@material-ui/core";
import MenuIcon from '@material-ui/icons/Menu';
import MUIDataTable from "mui-datatables";

const styles = () => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: 36,
  },
  title: {
    flexGrow: 1,
    display: 'block',
    color: "#fff"
  },
});

class CardTracksUpdates extends React.Component {

	constructor (props) {
		super(props);
	  
		this.open = false;
		this.state = { open: false, edit: false };	
		this.array = [];
		this.currentUser = [];
		this.editing = false;
	}

	loadContentFromServer() {
		const url = 'http://localhost:8080/api/cardtrack/all';
      
		fetch(url)
		.then(response => response.json())
		.then(json => {
		 this.setState({ results: json });
		});
	}
	
	componentDidMount() {
		this.loadContentFromServer();
	}

	render() {
		const classes = styles();
		const array = this.array;
		var data = [];
		var open = false;
		var editing = false;
		var currentUser = [];
        let columns = [];

        const fieldNameMapping = {"id":"trackingId","Field_1":"TestRajesh","Field_2":"Pankajfld"}
		
		const handleOpen = () => {
			this.setState({ open: true });
		};
		
		const handleClose = () => {
			this.setState({ open: false });
		};
		
		open = this.state.open;
		
		if(!!this.state.results) {
			this.array = this.state.results;
		}
		
		if(!!this.state.array) {
			data = this.state.array;
		} else {
			data = this.array;
		}

        const getColumnMapping = (row) =>{
            let fieldList=[];
            let listKey=  Object.keys(row);
            let baseFieldObj={};
            
           listKey.forEach((key, i)=>{
                // obj[ele] = arr2[i]
                baseFieldObj = {"name":listKey[i],options: {filter: true}};
                if(fieldNameMapping.hasOwnProperty(key)){
                    baseFieldObj['label'] = fieldNameMapping[key];
                }
                fieldList.push(baseFieldObj);
            })
            return fieldList;
            
        }
		
        console.log("====== Data ==== ");
        console.log(data);
        if(data && data.length>0){
            columns =  getColumnMapping(data[0])
        }
            
		// CRUD operations
		const addUser = user => {
			user.id = data.length + 1;
			const addUser = [user.id, user.name, user.username, user.email, ''];
			this.setState({ array: data.concat([addUser]) });
			handleClose();
		};
		
		const addButton = () => {
			this.setState({ edit: false });
			handleOpen();
		};
		
		const deleteUser = id => {
			this.setState({ edit: false });
			this.setState({ array: data.filter(user => user.id !== id) });
		};
		
		const updateUser = (id, updatedUser) => {
			this.setState({ edit: false });
			const editUser = [updatedUser.id, updatedUser.name, updatedUser.username, updatedUser.email, ''];
			this.setState({ array: data.map(user => (user[0] === id ? editUser : user)) });
			handleClose();
		};
		
		const editButton = user => {
			this.setState({ edit: true });
			this.setState({ arrayEdit: {id: user[0], name: user[1], username: user[2], email: user[3], acao: ''} });
			handleOpen();
		};
		
		editing = this.state.edit;
		currentUser = this.state.arrayEdit;
		
		const options = {
		  filter: true,
		  filterType: "dropdown",
		  responsive: ""
		};
		
		return (
			<div className={classes.root}>
			
				
				<MUIDataTable
				title={"Track Cards"}
				data={data}
				columns={columns}
				options={options}
				
				/>
				
				<Modal
					aria-labelledby="simple-modal-title"
					aria-describedby="simple-modal-description"
					open={open}
					onClose={handleClose}
				>
					<div className="modal">
						
							<Fragment>
								<h2 id="simple-modal-title">iRajesh</h2>
								<div id="simple-modal-description">
									<div>Modal add</div>
								</div>
							</Fragment>
						
					</div>
				</Modal>
			</div>
		);
	}
}
export default withStyles(styles)(CardTracksUpdates);
