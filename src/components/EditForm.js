import React from 'react';
import PropTypes from 'prop-types';

// import { createStyles, makeStyles } from '@mui/styles';
import {Grid} from '@mui/material';

import { Paper, Typography } from '@mui/material';

import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import MoreIcon from '@mui/icons-material/MoreVert';
import SettingsIcon from '@mui/icons-material/Settings';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PaletteIcon from '@mui/icons-material/Palette';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import FilterNoneIcon from '@mui/icons-material/FilterNone';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Questions from './Questions'
import Responses from './Responses'
import StarBorderIcon from '@mui/icons-material/StarBorder';

import ViewListIcon from '@mui/icons-material/ViewList';
import UserServices from '../services/userServices';
import formService from '../services/formService';
import { useParams } from 'react-router';

// import QuestionsTab from './QuestionsTab';
// import ResponseTab from '../Response/ResponseTab';
// import formService from '../../services/formService';
// import auth from '../../services/authService';



// const useStyles = makeStyles((theme) => ({
//     root: {
//       flexGrow: 1,
//     },
//     menuButton: {
//       marginRight: theme.spacing(2),
//     },
//     toolbar: {
//       minHeight: 128,
//       alignItems: 'flex-start',
//       paddingTop: theme.spacing(1),
//       //paddingBottom: theme.spacing(2),
//     },
//     title: {
//       flexGrow: 1,
//       alignSelf: 'flex-end',
//       justifySelf: 'center'
//     },
//     paper: {
//       padding: theme.spacing(2),
//       color: theme.palette.text.secondary,
//       display: 'flex',
//       alignContent: 'space-between',
//       alignItems: 'center'
//   }
    
//   }));



function EditForm(props) {
//   const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState({})
  const [formID, setFormID] = React.useState("");
  const {formId}=useParams()
 

  const [formDetails, setFormDetails] = React.useState({});
  const [openOfAlert, setOpenOfAlert] = React.useState(false);

  React.useEffect(()=>{
    setUser(UserServices.getCurrentUser());  
}, [])
console.log(user,'user')

  const clipToClipboard = ()=>{
    navigator.clipboard.writeText(window.location.origin + "/s/" + formDetails._id)
    handleClickOfAlert();
    handleClose();
  }

  const handleClickOfAlert = () => {
    setOpenOfAlert(true);
  }

  const handleCloseOfAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenOfAlert(false);
  };


  function sendForm(){
    handleClickOpen(); 
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


    React.useEffect(() => {
        // const formId = props.match.params.formId
        if(formId !== undefined){
          // setFormID(formId)
          formService.getForm(formId)
          .then((data) => { 
             console.log(data);     
              setFormDetails(data)       
             },
             error => {
             const resMessage =
                 (error.response &&
                 error.response.data &&
                 error.response.data.message) ||
                 error.message ||
                 error.toString();
                 console.log(resMessage);
             }
         );
        }
    },[formId]);
    console.log(formDetails, 'formDetails')


    return (
        <div>
          { formDetails?.createdBy === user.id ? (
            <div>
            <div className="">
                <AppBar position="static" style={{backgroundColor: 'white'}} elevation={2}>
                    <Toolbar className="">
                    <IconButton
                        edge="start"
                        className=""
                        aria-label="Rohit Saini's form"
                        style={{color: '#140078'}}
                        
                    >
                        <ViewListIcon />
                    </IconButton>
                    <Typography variant="h6" noWrap style={{marginTop: '8.5px', color:'black'}}>
                        {formDetails.name}
                    </Typography>
                    {/* <IconButton
                        aria-label="Rohit Saini's form"
                        style={{marginLeft:'5px'}} 
                    >
                        <FolderOpenIcon />
                    </IconButton> */}

                    <IconButton
                        aria-label="Shash's form" 
                    >
                        <StarBorderIcon />
                    </IconButton>
                    

                    <Tabs
                    className=""
                    value={value}
                    onChange={handleChange}
                    indicatorColor="primary"
                    textColor="primary"
                    centered
                >
                    <Tab label="Questions" />
                    <Tab label="Responses" />
                </Tabs>
                    <IconButton aria-label="search" onClick={sendForm}>
                        <SendIcon />
                    </IconButton>
                
                    <IconButton aria-label="search">
                        <PaletteIcon />
                    </IconButton>
                    <IconButton aria-label="search">
                        <VisibilityIcon />
                    </IconButton>
                    <IconButton aria-label="search">
                        <SettingsIcon />
                    </IconButton>
                    
                    <IconButton aria-label="display more actions" edge="end">
                        <MoreIcon />
                    </IconButton>
                    <IconButton aria-label="display more actions" edge="end">
                        <AccountCircleIcon />
                    </IconButton>
                    </Toolbar>
                </AppBar>
            </div>
            <div>
            <Dialog
              open={open}
              onClose={handleClose}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
              
            >
              <DialogTitle id="alert-dialog-title">{"Copy and share link."}</DialogTitle>
              <DialogContent>
              <Paper className="">
                  <Grid container alignContent="space-between" alignItems="center">
                      <Grid item>
                          <Typography variant="body1">{window.location.origin + "/s/" + formDetails._id}</Typography>
                          
                      </Grid>
                      <Grid item>
                          <IconButton className="" aria-label="Add" size="medium" onClick={clipToClipboard} ><FilterNoneIcon /></IconButton>
                      </Grid>
                  </Grid>
              </Paper>
                  {/* <div style={{padding: '7px', display: 'flex'}}>
                  <Typography variant="body1">{window.location.origin + "/s/" + formDetails._id}</Typography>
                    
                  <IconButton onClick={() =>  navigator.clipboard.writeText(window.location.origin + "/s/" + formDetails._id)}  >
                    <MoreIcon />
                  </IconButton>
                  </div> */}
                  
                <DialogContentText id="alert-dialog-description">
                  
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleClose} color="primary">
                   Cancel
                </Button>
                
              </DialogActions>
            </Dialog>
            <Snackbar
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              open={openOfAlert}
              autoHideDuration={3000}
              onClose={handleCloseOfAlert}
              message="Copied to clipboard"
              action={
                <React.Fragment>
                 
                  <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseOfAlert}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
            </div>

        <div>
            <TabPanel value={value} index={0}>
                <Questions formData={formDetails} />
            </TabPanel>
            <TabPanel value={value} index={1}>
                <Responses formData={formDetails} formId={formId} />
            </TabPanel>
        </div>
        </div>
          ) : (
            <p>you're not the owner of the form</p>
          )}
        </div>
    );
}

export default EditForm;

function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box>
            <div>{children}</div>
          </Box>
        )}
      </div>
    );
  }
  
  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.any.isRequired,
    value: PropTypes.any.isRequired,
  };


  // function a11yProps(index) {
  //   return {
  //     id: `simple-tab-${index}`,
  //     'aria-controls': `simple-tabpanel-${index}`,
  //   };
  // }
  
