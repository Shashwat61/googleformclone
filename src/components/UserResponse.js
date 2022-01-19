import React from 'react'

import {Grid} from '@mui/material';

import { Paper, Typography } from '@mui/material';

import formService from '../services/formService';
import CircularProgress from '@mui/material/CircularProgress';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import RadioGroup from '@mui/material/RadioGroup';
import Divider from '@mui/material/Divider';
import { makeStyles } from '@mui/material/styles';
import Container from '@mui/material/Container';

import userService from '../services/userServices';

// const useStyles = makeStyles((theme) => ({
 
// }));

import {useParams} from 'react-router-dom'

function UserResponse(props) {
//   const classes = useStyles();
    const params=useParams()
    const [userId, setUserId] = React.useState("")
    const [formData, setFormData] = React.useState({});
    const [responseData, setResponseData] = React.useState([])
    //console.log(responseData);
    
    const [optionValue, setOptionValue] = React.useState([])
    const [isSubmitted, setIsSubmitted] = React.useState(false)
    
    
    const [questions, setQuestions] = React.useState([]);
    const [value, setValue] = React.useState('');
    //console.log(value);
    React.useEffect(()=>{
      if(userService.isAuthenticated()){
        const userr = userService.getCurrentUser();
        console.log(userr.id);
        setUserId(userr.id);  
      } else{
        var anonymousUserId = "anonymous" +  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        console.log(anonymousUserId);
        setUserId(anonymousUserId)
      }
    }, [])
    
    

    const handleRadioChange = (j, i, curr) => {
      const questionId = questions[i]._id
      const optionId = questions[i].options[0]._id
      console.log(questions[i]._id, j)

    //   var fakeData = {
    //     question: i,
    //     option: j
    //   }
      const data = {
        questionId, optionId
      }
      console.log(data)
    //  console.log(data);
    //   //console.log(fakeData);
    //  // console.log(j);
    const fakeData=[...responseData]
  
    const responseIdx=fakeData.findIndex(x=>x.questionId===questionId)
    console.log(responseIdx)
    if(responseIdx===-1){
        setResponseData(responseData=>[...responseData, data])
    } else{
        fakeData[responseIdx].questionId = questionId
        setResponseData(fakeData);
    }
    console.log(responseData)
      setValue(questions[i].options[0].optionText)

    //   var fakeRData = [...responseData];
      
    //   var indexOfResponse = fakeRData.findIndex(x => x.questionId===questionId);
    //     if(indexOfResponse === -1){
    //     setResponseData(responseData=> [...responseData, data])

    //     } else{
    //       fakeRData[indexOfResponse].questionId = questionId
    //       setResponseData(fakeRData);
    //     }

      
     // setOptionValue(fakeData);
    //  
    };
    console.log(responseData,'out')
    
    React.useEffect(() => {


        formService.getForm(params.formId)
        .then((data) => { 
            console.log(data);
            
            setFormData(data)      
            setQuestions(data.questions) 
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
        
    },[params.formId]);

    function submitResponse(){
      const submissionData = {
        formId: formData._id,
        userId: userId,
        response: responseData
      }
      console.log(submissionData);
      
      formService.submitResponse(submissionData)
      .then((data2) => { 
        setIsSubmitted(true)
        // console.log(data2);
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

    function reloadForAnotherResponse(){
      window.location.reload(true);
    }

    return (
        <div style={{minHeight: '100vh'}}>
         <div>
         <AppBar position="static" style={{backgroundColor: 'teal'}}>
            <Toolbar>
              <IconButton edge="start" style={{marginRight: '10px', marginBottom: '5px'}} color="inherit" aria-label="menu">
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" style={{}}>
                Velocity Forms
              </Typography>
            </Toolbar>
          </AppBar>
          <br></br>

              <Grid
                container
                direction="column"
                justify="center"
                alignItems="center"
              >
                <Grid item xs={12} sm={5} style={{width: '100%'}}>         
                  <Grid style={{borderTop: '10px solid teal', borderRadius: 10}}>
                        <div>
                          <div>
                            <Paper elevation={2} style={{width:'100%'}}>
                              <div style={{display: 'flex',flexDirection:'column', alignItems:'flex-start', marginLeft: '15px', paddingTop: '20px', paddingBottom: '20px'}}>
                                <Typography variant="h4" style={{fontFamily:'sans-serif Roboto', marginBottom:"15px"}}>
                                  {formData.name}
                                </Typography>
                                <Typography variant="subtitle1">{formData.description}</Typography>
                              </div>
                            </Paper>
                          </div> 
                      </div>       
                  </Grid>  

                 {!isSubmitted ? (
                   <div>
                   <Grid>
                      
                      { questions.map((ques, i)=>(
                        <div key={ques._id}>
                          <br></br>
                        <Paper>
                          <div>
                            <div style={{display: 'flex',
                                       flexDirection:'column', 
                                       alignItems:'flex-start', 
                                       marginLeft: '6px', 
                                       paddingTop: '15px', 
                                       paddingBottom: '15px'}}>
                                <Typography variant="subtitle1" style={{marginLeft: '10px'}}>{i+1}. {ques.questionText}</Typography>
                               
                                
                                
                                  <div>
    
                                  <RadioGroup aria-label="quiz" name="quiz" value={value} onChange={(e)=>{handleRadioChange(e.target.value, i,e.currentTarget)}}>
    
                                    {ques.options.map((op, j)=>(
                                      <div key={j}>
                                        <div style={{display: 'flex', marginLeft: '7px'}}>
                                           <FormControlLabel  value={op.optionText} control={<Radio />} label={op.optionText} />
                  
    
                                        </div>
    
                                       
                                      </div>
                                      ))}  
                                    </RadioGroup>
    
                                  </div>
                            </div>
                          </div>  
                        </Paper>  
                        </div>
                      ))}
                      </Grid>   
                      <Grid>
                    <br></br>
                    <div style={{display: 'flex'}}>
                      <Button variant="contained" color="primary" onClick={submitResponse}>
                        Submit
                      </Button>
                    </div>
                    <br></br>

                    <br></br>

                  </Grid>
                   </div>
                 ):
                 (
                   <div className="mt-4">
                     <Typography variant="body1">Form submitted</Typography>
                     <Typography variant="body2">Thanks for submiting form</Typography>
                     

                     <Button onClick={reloadForAnotherResponse}>Submit another response</Button>
                   </div>
                 )
                }

                  

                 
                </Grid>  

               
              </Grid>   

               {/* //TODO: Add a footer here */}
         </div>
        </div>
    )
}

export default UserResponse;

const FormControlLabelWrapper = props => {
  const { radioButton, ...labelProps } = props;
  return (
    <FormControlLabel
      control={<Radio />}
      label={"Radio " + props.value + props.jIndex}
      {...labelProps}
    />
  );
};
