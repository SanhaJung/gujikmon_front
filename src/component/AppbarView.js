import React from 'react';
import { fade, makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import InputBase from '@material-ui/core/InputBase';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import Button from '@material-ui/core/Button';
import RoomOutlinedIcon from '@material-ui/icons/RoomOutlined';
import logo from '../img/구직몬.png';
import {LoginModal} from './LoginModal';
import {LogoutWithKakao , LogoutWithGoogle} from './SocialLogin';
import CSRFToken from '../api/csrftoken';
import { useStores } from '../store/Context';
import { observer } from 'mobx-react';

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.30),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.40),
    },
    marginRight: theme.spacing(2),
    marginLeft: 3,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    flex :1 ,
    justifyContent:'center',
    alignSelf:'center',
    align:'center',
},
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 50, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  App :{
      background : "#4D6AFF",
  },
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  logo: {
    maxWidth: 100,
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const PrimarySearchAppBar = observer(() => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
  const [loginOpen, setLoginOpen] = React.useState(false);
  const {userStore}= useStores();
  const handleLoginOpen = () => {
    setLoginOpen(true);
  };

  const handleLoginClose = () => {
    setLoginOpen(false);
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };
  function Login() {

    //const loginType =window.sessionStorage.getItem('login');
    const loginType =userStore.login_type;
    console.log(loginType)
    if(loginType === 0)//로그인 안된 상태
      return(<div>
        <CSRFToken></CSRFToken>
        <Button color="inherit" onClick={handleLoginOpen}>로그인</Button>
        <LoginModal open={loginOpen} setOpen={setLoginOpen} handleClose={handleLoginClose}></LoginModal>
        </div>
      )
    if(loginType === 1){//카카오 로그인된 상태
        return(
        <Button color="inherit" onClick={ LogoutWithKakao}>로그아웃</Button>
        )}
    else if(loginType ===2){ //구글 로그인된 상태
      return (<LogoutWithGoogle></LogoutWithGoogle>)
    }
  }
  
  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  


  return (
    <div className={classes.grow}>
      <AppBar position="fixed" className={classes.App}>
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <RoomOutlinedIcon />
          </IconButton>
         <a href={void(0)} onClick="#"><img src={logo} alt="logo" className={classes.logo}/></a>

         <div className={classes.grow} />
          <div className={classes.search} >
            <div className={classes.searchIcon} >
              <SearchIcon />
            </div>
            <InputBase
              placeholder="기업명"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </div>
          <div className={classes.grow} />
     
          <div className={classes.sectionDesktop}>
           {Login()}
         
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {/*renderMobileMenu*/}
      {renderMenu}
    </div>
  );
});