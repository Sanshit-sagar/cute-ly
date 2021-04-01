import 'tailwindcss/tailwind.css'; 
import React, { useEffect } from 'react'; 

import { makeStyles } from '@material-ui/core/styles'; 

import TextField from '@material-ui/core/TextField'; 
import Button from '@material-ui/core/Button'; 
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton'; 
import AccountCircle from '@material-ui/icons/AccountCircle';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'; 

import { useAuth } from '../lib/auth'; 

const useStyles = makeStyles((theme) => ({
    submitButton: {
        height: '50px',
        marginTop: '30px',
    },
}));

const SignUpForm = () => {
    const classes = useStyles(); 
    const auth = useAuth(); 

    const [values, setValues] = React.useState({
        email: '',
        primaryPassword: '',
        secondaryPassword: '',
    });

    const [isDisabled, setIsDisabled] = React.useState(true); 

    const handleChange = (prop) => (event) => {
        setValues({ 
          ...values, 
          [prop]: event.target.value 
        });
    };

    useEffect(() => {
      if (values.email.trim() && values.primaryPassword.trim() && values.secondaryPassword.trim()) {
        setIsDisabled(false); 
      } else {
        setIsDisabled(true); 
        console.log('still fails'); 
      }
    }, [values.email, values.primaryPassword, values.secondaryPassword]); 

    const handleSubmit = () => {
        //TODO: check if email is valid here, and if passwords meet basic requirements 
        if(values.primaryPassword.length <= 8) {
          alert('Password must be > 8 Characters');
          return; 
        } 

        var strA = new String(values.primaryPassword).valueOf();
        var strB = new String(values.secondaryPassword).valueOf(); 

        if(strA != strB) {
          alert('Passwords do not match!'); 
          return; 
        }

        auth.signupWithEmailAndPassword(values.email, values.password, '/dashboard'); 
    }

    return (
    
        <FormControl fullWidth className={classes.margin}>
            <TextField
                fullWidth
                variant="filled" 
                color="primary" 
                margin="normal" 
                size="large" 
                label="Email" 
                type="text"
                placeholder="Enter your email address"
                onChange={handleChange('email')}
                InputProps = {{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton>
                                <AccountCircle />
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
        
            <TextField 
                fullWidth 
                variant="filled" 
                color="primary" 
                margin="normal" 
                size="large" 
                label="Password" 
                type='text'
                value={values.primaryPassword}
                onChange={handleChange('primaryPassword')}
            />

            <TextField 
                fullWidth 
                variant="filled" 
                color="primary" 
                margin="normal" 
                size="large" 
                label="Confirm Password" 
                type='text'
                value={values.secondaryPassword}
                onChange={handleChange('secondaryPassword')}
            />
        
            <Button 
                type="submit"
                fullWidth
                size="large"
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className={classes.submitButton}
                disabled={isDisabled}
            >
                Sign Up
            </Button>
        </FormControl>
    );
}

const SignUpFormHeader = () => {
    return (
        <Fragment>
            <Typography variant="h2" style={{ fontSize: '30px' }}>
                Sign in to your account
            </Typography>
            <Typography variant="overline" color="textSecondary" style={{ fontSize: '16px' }}> 
                enter your details to continue
            </Typography>
        </Fragment>
    );
}


export default function SignUp() {
    return (
        <div class="min-h-screen bg-indigo-700 flex">
            <div class="flex-1 flex flex-col justify-space-between py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                <div class="mx-auto w-full max-w-sm lg:w-96">     
                    <Card>
                        <CardContent>
                            <SignUpFormHeader /> 
                            <SignUpForm />
                        </CardContent>
                    </Card> 
                </div>
            </div>
        </div> 
    ); 
}