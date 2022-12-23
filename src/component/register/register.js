import { Button, Card, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { Email, Visibility, VisibilityOff } from '@material-ui/icons';
import { useFormik } from 'formik';
import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useStyles } from "../hooks/mui-styles";
import { useSelector } from 'react-redux';
import { create } from '../../features/registerSlice';
// import { useNavigate } from 'react-router-dom';
import * as yup from "yup";
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { BASE_URL } from "../../utils/constant";


  

function Register() {
  const classes = useStyles();  
  const dispatch = useDispatch();
  
  const register = useSelector((state) => state.register)
  console.log(register)
  
  const [showPassword, setShowPassword] = useState(false)
  
  const navigate = useNavigate();
  
  const validationSchema = yup.object({

    firstName: yup
      .string("Enter your First Name")
      .max(100, "Maximum should be alteast 100 charactors")
      .required("First Name is required"),

    lastName: yup
      .string("Enter your Last Name")
      .max(100, "Maximum should be alteast 100 charactors")
      .required("Last Name is Required"),

    email: yup
      .string('Email Address')
      .email('Enter a valid email')
      .required('Email is Required'),

    phoneNumber: yup.string()
      .matches(/[0-9]/, "only numbers are allowed")
      .min(8, "Phone number should be alteast 8 digits")
      .required("Phone Number is Required"),

    password: yup
      .string("Enter your password")
      .min(6, "Password should be alteast 6 charactors")
      .required("Password is Required"),

    confirmPassword: yup.string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required("Confirm Password is Required")

  });
  const { mutate, isError, isLoading, isSuccess, data, error } = useMutation(data => {
    console.log(data);
    dispatch (create({data}))
    return axios.post(`${BASE_URL}/Register`, data)
    
  });
 
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
    // onSubmit: values => {
    //   // dispatch(create({firstName:values.firstName, lastName: values.lastName, email: values.email, phoneNumber: values.phoneNumber, password: values.password, confirmPassword: values.confirmPassword }))
    //   // alert(JSON.stringify(values, null, 2));

    //   console.log(values)     

    // },
    

    validationSchema,

    onSubmit: (values) => mutate(values),

  });
 
  return (
    <Card
    className={classes.root}
    style={{ padding: "40px" }}
    variant="outlined"
  >
    <form onSubmit={formik.handleSubmit} className="form-group">
    {isError ? <div><h3>Something Went Wrong {error}</h3></div> : isSuccess ? <div><h3>Please check your registeration for verification  {JSON.stringify(navigate("/login"))}</h3></div> : isLoading ? <div><h3> Loading.....</h3></div> : null}
    
      <h3> REGISTER</h3>
            
      <TextField
        fullWidth
        id="firstName"
        name="firstName"
        type="text"
        label="First Name"
        value={formik.values.firstName}
        onChange={formik.handleChange}
        error={formik.touched.firstName && Boolean(formik.errors.firstName)}
        helperText={formik.touched.firstName && formik.errors.firstName}
       
      />
      <TextField
        fullWidth
        id="lastName"
        name="lastName"
        type="text"
        label="Last Name"
        value={formik.values.lastName}
        onChange={formik.handleChange}
        error={formik.touched.lastName && Boolean(formik.errors.lastName)}
        helperText={formik.touched.lastName && formik.errors.lastName}
      />
      <TextField
        fullWidth
        id="email"
        name="email"
        label="Email"
        type="email"
        value={formik.values.email}
        onChange={formik.handleChange}
        error={formik.touched.email && Boolean(formik.errors.email)}
        helperText={formik.touched.email && formik.errors.email}
        autoFocus
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Email color="primary" />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        fullWidth
        id="phoneNumber"
        name="phoneNumber"
        label="Phone Number"
        type="text"
        value={formik.values.phoneNumber}
        onChange={formik.handleChange}
        error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
        helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
      />
      <TextField
        fullWidth
        id="password"
        name="password"
        label="Password"
        type={showPassword ? "text" : "password"}
        value={formik.values.password}
        onChange={formik.handleChange}
        error={formik.touched.password && Boolean(formik.errors.password)}
        helperText={formik.touched.password && formik.errors.password}

        InputProps={{


          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                // onMouseDown={handleMouseDownPassword}

              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}

      />
      <TextField

        fullWidth
        id="confirmPassword"
        name="confirmPassword"
        label="Confirm Password"
        type={showPassword ? "text" : "password"}
        value={formik.values.confirmPassword}
        onChange={formik.handleChange}
        error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
        helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
        InputProps={{


          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                // onMouseDown={handleMouseDownPassword}

              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          )
        }}

      />
        
      <br />
      <div className="btn-display">
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className="button-btn"
        >
          Submit
        </Button>
        <br />

        <p className="login-link">
          Already have an acccount? <Link to="/login">Login</Link>
        </p>
      </div>
     
    </form>
  </Card>
);
}
  

export default Register