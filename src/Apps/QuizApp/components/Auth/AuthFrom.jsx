import React, { useEffect, useState } from 'react'
import { defaultAvatarImg, loginImage, signUpImage } from '../../Icons_Images/staticImages'
import AppLogo from '../../components/AppLogo/AppLogo'
import { Autocomplete, FilledInput, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, TextField } from '@mui/material'
import LoadingButton from '@mui/lab/LoadingButton/LoadingButton'
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Link, useNavigate } from 'react-router-dom'
import * as EmailValidator from 'email-validator';
import { useSelector, useDispatch } from 'react-redux'
import './AuthForm.css'
import { CreateUser, authenticateUser } from '../../Redux/ThunkActions/UserActions'
import { showToast } from '../../configs/Toast'
import { clearError, clearSuccessMsg } from '../../Redux/Slices/UserSlice'
import { handleCloudinaryUpload } from '../../configs/handleCloudinaryUpload'


const AuthFrom = ({ loginPage }) => {
    let TechIntOptions = ["Artificial Intelligence", "Machine Learning", "Web Development", "Ethical Hacking", "Cyber Security", "Networking"]

    const { loading, successMsg, error } = useSelector(state => state.user)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const [avatarLoading, setAvatarLoading] = useState(false)
    const [avatar, setAvatar] = useState(null)

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    let defaultInputVals = {
        name: {
            value: "",
            errorText: ""
        },
        email: {
            value: "",
            errorText: ""
        },
        password: {
            value: "",
            errorText: ""
        },
        confPassword: {
            value: "",
            errorText: ""
        },
        techInt: {
            value: [],
            errorText: ""
        }
    }
    const [inptValues, setInptValues] = useState(defaultInputVals)

    const handleChange = (e, value) => {
        if (value) {
            setInptValues({ ...inptValues, "techInt": { errorText: "", value } })
        }
        else {
            setInptValues({ ...inptValues, [e.target.name]: { value: e.target.value, errorText: "" } })
        }
    }

    const handleFilechange = async (e) => {

        if (!e.target.files.length) return

        const avatar = await handleCloudinaryUpload(e, setAvatarLoading)

        if (avatar && !avatarLoading) {
            setAvatar(avatar)
            setTimeout(() => {
                showToast("success", "Avatar uploaded to cloud sucessfully!", 5000)
            }, 20);
        }
    }

    const validateInputFields = (name, email, password, confPassword, techInt, inptValues) => {

        function focusInpt(inptName) {
            document.querySelector(`input[name=${inptName}]`).focus()
        }

        if (!name && !loginPage) {
            setInptValues({ ...inptValues, 'name': { ...inptValues.name, errorText: "Name is manditory!" } })
            focusInpt('name')
        }
        else if (name.length < 3 && !loginPage) {
            setInptValues({ ...inptValues, 'name': { ...inptValues.name, errorText: "Name should be atleast 3 characters long!" } })
            focusInpt('name')
        }
        else if (!email) {
            setInptValues({ ...inptValues, 'email': { ...inptValues.email, errorText: "Email is manditory!" } })
            focusInpt('email')
        }
        else if (!EmailValidator.validate(email)) {
            setInptValues({ ...inptValues, 'email': { ...inptValues.email, errorText: "Please enter the valid email!" } })
            focusInpt('email')
        }
        else if (!password) {
            setInptValues({ ...inptValues, 'password': { ...inptValues.password, errorText: "Password is manditory!" } })
            focusInpt('password')
        }
        else if (!confPassword && !loginPage) {
            setInptValues({ ...inptValues, 'confPassword': { ...inptValues.confPassword, errorText: "Confirm Password is manditory!" } })
            focusInpt('confPassword')
        }
        else if (password !== confPassword && !loginPage) {
            setInptValues({ ...inptValues, 'confPassword': { ...inptValues.confPassword, errorText: "Password and Confirm password must match!" } })
            focusInpt('confPassword')
        }
        else if (!techInt.length && !loginPage) {
            setInptValues({ ...inptValues, 'techInt': { ...inptValues.techInt, errorText: "Tech Interest is manditory!" } })
            focusInpt('techInt')
        }
        else return true
    }

    const handleSubmit = (e) => {
        e.preventDefault()

        // Nested destructuring...
        let {
            name: { value: name },
            email: { value: email },
            password: { value: password },
            confPassword: { value: confPassword },
            techInt: { value: techInt }
        } = inptValues


        if (validateInputFields(name, email, password, confPassword, techInt, inptValues)) {

            if (!loginPage) dispatch(CreateUser({ name, email, password, avatar: avatar ? avatar : defaultAvatarImg, techInt }))
            else dispatch(authenticateUser({ email, password }))
        }

    }
    useEffect(() => {
        if (error) showToast('error', error)

        dispatch(clearError())

        // eslint-disable-next-line
    }, [error])

    return (
        <div className={`flex gap-16 mt-10 items-center authForm justify-center f-roboto flex-col lg:flex-row px-2 my-5`}>
            <div style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }} className='hidden md:block bg-white w-72 h-72 lg:w-96 lg:h-96 overflow-hidden shadow-lg'>
                <img className='w-full h-full object-contain' src={loginPage ? loginImage : signUpImage} alt="login" />
            </div>
            <form className={`bg-white p-6 rounded-lg w-full md:w-7/12 lg:w-5/12 `} onSubmit={handleSubmit}>
                <h2 className='font-medium text-2xl flex gap-3 items-center '>{loginPage ? "Login" : "SignUp"} with <span><AppLogo iconW={5} textSizeMob='sm' textSizeDesk='sm' /></span></h2>
                <div className='flex justify-center items-center w-full'>
                    <div style={{ borderRadius: "30% 70% 70% 30% / 30% 30% 70% 70%" }} className='md:hidden bg-white w-72 h-72 md:w-96 md:h-96 overflow-hidden shadow-lg'>
                        <img className='w-full h-w-full object-contain' src={loginPage ? loginImage : signUpImage} alt="login" />
                    </div>
                </div>
                <div className='w-full mt-5 flex flex-col gap-2 lg:gap-6'>
                    <div className="flex gap-2 flex-col md:flex-row">
                        {!loginPage && <div className="inptDiv w-full">
                            <TextField
                                error={!!inptValues.name.errorText}
                                id="standard-error-helper-text"
                                label="Username"
                                name='name'
                                helperText=""
                                variant="filled"
                                className='w-full'
                                onChange={handleChange}
                            />
                            <FormHelperText className='' error={!!inptValues.name.errorText}>{inptValues.name.errorText}</FormHelperText>

                        </div>}
                        <div className="inptDiv w-full">
                            <FormControl className='w-full' variant="filled">
                                <InputLabel error={!!inptValues.email.errorText} htmlFor="outlined-adornment-password">Email</InputLabel>
                                <FilledInput
                                    onChange={handleChange}
                                    id="filled-adornment-password"
                                    type="email"
                                    name="email"
                                    error={!!inptValues.email.errorText}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                disableRipple
                                                edge="end"
                                            >
                                                <MailOutlineIcon cursor={"auto"} />
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                                <FormHelperText className='' error={!!inptValues.email.errorText}>{inptValues.email.errorText}</FormHelperText>
                            </FormControl>
                        </div>
                    </div>
                    <div className='flex gap-2 flex-col md:flex-row'>
                        <div className="inptDiv w-full">
                            <FormControl className='w-full' variant="filled">
                                <InputLabel error={!!inptValues.password.errorText} htmlFor="outlined-adornment-password">Password</InputLabel>
                                <FilledInput
                                    onChange={handleChange}
                                    id="filled-adornment-password"
                                    name="password"
                                    type={showPassword ? 'text' : 'password'}
                                    error={!!inptValues.password.errorText}
                                    endAdornment={
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        </InputAdornment>
                                    }
                                    label="Password"
                                />
                                <FormHelperText className='' error={!!inptValues.password.errorText}>{inptValues.password.errorText}</FormHelperText>
                            </FormControl>
                        </div>
                        {
                            !loginPage &&
                            <div className="inptDiv w-full">
                                <FormControl className='w-full' variant="filled">
                                    <InputLabel error={!!inptValues.confPassword.errorText} htmlFor="outlined-adornment-confpassword">Confirm Password</InputLabel>
                                    <FilledInput
                                        name="confPassword"
                                        onChange={handleChange}
                                        id="filled-adornment-confpassword"
                                        type={showPassword ? 'text' : 'password'}
                                        error={!!inptValues.confPassword.errorText}
                                        endAdornment={
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                    edge="end"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        }
                                        label="Confirm Password"
                                    />
                                    <FormHelperText className='' error={!!inptValues.confPassword.errorText}>{inptValues.confPassword.errorText}</FormHelperText>
                                </FormControl>
                            </div>
                        }
                    </div>
                    {/* {
                        !loginPage
                        &&
                        <div className="inptDiv w-full">
                            <TextField
                                error={!!inptValues.name.errorText}
                                label="About yourself"
                                name='name'
                                helperText=""
                                variant="filled"
                                className='w-full'
                                multiline
                                maxRows={4}
                                rows={4}
                                onChange={handleChange}
                            />
                            {inptValues.name.errorText && <FormHelperText className='' error={!!inptValues.name.errorText}>{inptValues.name.errorText}</FormHelperText>}
                        </div>
                    } */}
                    {/* {
                        !loginPage
                        &&
                        <div className="inptDiv w-full">
                            <TextField
                                error={!!inptValues.name.errorText}
                                id="standard-error-helper-text"
                                label="Git Hub link"
                                name='name'
                                helperText=""
                                variant="filled"
                                className='w-full'
                                onChange={handleChange}
                            />
                            {inptValues.name.errorText && <FormHelperText className='' error={!!inptValues.name.errorText}>{inptValues.name.errorText}</FormHelperText>}
                        </div>
                    } */}
                    {
                        !loginPage
                        &&
                        <div className='flex w-full justify-between'>
                            <div className='flex items-center gap-2'>
                                <div>
                                    <input
                                        style={{ display: 'none' }}
                                        type="file"
                                        onChange={handleFilechange}
                                        id="fileuploadBtn"
                                    />
                                    <IconButton >
                                        <label htmlFor="fileuploadBtn" className='text-sm cursor-pointer'>
                                            <CameraAltIcon className='cursor-pointer' />
                                        </label>
                                    </IconButton>
                                </div>
                                <label htmlFor="fileuploadBtn" className='text-gray-500 text-md cursor-pointer'>Upload your avatar</label>
                            </div>
                            <div className='flex gap-2 items-center'>
                                {avatar && <CheckCircleIcon className='text-green-400 text-sm' />}
                                <div className='w-10 h-10 rounded-full '>
                                    <img src={avatar ? avatar : defaultAvatarImg} alt="" className='w-full h-full object-cover rounded-full' />
                                </div>
                            </div>

                        </div>
                    }
                    {
                        !loginPage &&
                        <>
                            <Autocomplete
                                onChange={handleChange}
                                multiple
                                id="size-medium-standard-multi"
                                size="medium"
                                options={TechIntOptions}
                                getOptionLabel={(option) => option}
                                renderInput={(params) => (
                                    <TextField
                                        error={!!inptValues.techInt.errorText}
                                        name="techInt"
                                        {...params}
                                        variant="standard"
                                        label="Tech Interests"
                                    />
                                )}
                            />
                            <FormHelperText className='' error={!!inptValues.techInt.errorText}>{inptValues.techInt.errorText}</FormHelperText>
                        </>

                    }
                    <div className='w-full flex px-2 justify-between mt-6 mb-2 lg:mt-0 lg:mb-0'>
                        {loginPage && <p className='font-medium text-blue-400 underline text-sm cursor-pointer'>Forget password?</p>}
                        <Link to={`${!loading ? loginPage ? "/sign-up" : "/login" : ""}`} className={`font-medium ${loading ? "text-blue-200 cursor-default" : "text-blue-400"} underline text-sm cursor-pointer`}>
                            <p>
                                {
                                    loginPage ? "New user? Get my account!" : "Already have an account? Login"
                                }
                            </p>
                        </Link>
                    </div>

                    <LoadingButton
                        color="primary"
                        type='submit'
                        loading={loading}
                        onClick={handleSubmit}
                        style={{ background: `${!loading ? "#9b45ebb5" : ""}`, padding: "10px 0" }}
                        loadingPosition="center"
                        variant="contained"
                        size="medium"
                        className={`w-full`}
                    >
                        {loginPage ? "LOGIN" : "Sign up"}
                    </LoadingButton>
                </div>
            </form >

        </div >
    )
}

export default AuthFrom
