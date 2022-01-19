import React from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import {auth} from '../firebase'
import formService from '../services/formService'
import userService from '../services/userServices'
import {useAuthState} from 'react-firebase-hooks/auth'
import { useNavigate } from 'react-router';

export default function Navbar() {
    // const [user]=useAuthState(auth)
    const navigate=useNavigate()
    // console.log(user?.uid.slice(0,-4))
  const [user, setUser] = React.useState({});
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [open, setOpen] = React.useState(false);

    const [formTitle, setFormTitle] = React.useState("");
    const [formDescription, setFormDescription] = React.useState("");
    
    React.useEffect(()=>{
      setUser(()=>userService.getCurrentUser())
    },[])
    console.log(user,'user')
    const handleClickOpen = () => {
        setOpen(true);
      };
    
      const handleClose = () => {
        setOpen(false);
      };

//   const handleChange = (event) => {
//     setAuthUser(event.target.checked);
//   };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
    // setOpen(!open)
  };

  const handleLogout = () => {
      // logout the user and it will redirect to the login page
      auth.signOut().then(()=>userService.logout())
    setAnchorEl(null);
  };
  const cancelAddForm = ()=>{
    handleClose();
    setFormTitle("");
    setFormDescription("");
  }

  const createForm = ()=>{
      const data={
          name:formTitle,
          description:formDescription,
          createdBy:user.id
      }

    if(data.name!==""){ formService.createForm(data)
      .then((result) => { 
        console.log(result);
        navigate("/form/"+result._id);
        
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
      )
    } 
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Google Form Clone
          </Typography>
          <div>
          <IconButton aria-label="Create new form" color="inherit" onClick={handleClickOpen}> 
              <AddIcon/>
          </IconButton>
          
              <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
                >
                <AccountCircle />
              </IconButton>
              <Menu
                className="mt-10"
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
                >
                <MenuItem  onClick={handleLogout}>Logout</MenuItem>
                <div className="absolute -top-1 cursor-pointer right-0">
                <CancelIcon fontSize="sm" onClick={()=>setAnchorEl(null)} />
                </div>

              </Menu>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      <div>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title" >
              <DialogTitle id="form-dialog-title">Create Form</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Creating  a new empty form, just add form name and description if you want.
                </DialogContentText>
                <TextField
                  autoFocus
                  margin="dense"
                  id="name"
                  label="Form Name"
                  type="text"
                  fullWidth={false}
                  value={formTitle} 
                  onChange={(e)=>{setFormTitle(e.target.value)}}
                /> 
                <br></br>
                <TextField
                  autoFocus
                  margin="dense"
                  id="description"
                  label="Form description"
                  type="text"
                  fullWidth
                  value={formDescription} 
                  onChange={(e)=>{setFormDescription(e.target.value)}}
                /> 
                <br></br>
              </DialogContent>
              <DialogActions>
                <Button onClick={cancelAddForm} color="primary">
                  Cancel
                </Button>
                <Button onClick={createForm} color="primary">
                  Create
                </Button>
              </DialogActions>
            </Dialog>   
            </div>
    </Box>
  );
}
