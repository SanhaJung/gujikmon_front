import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import IconButton from '@material-ui/core/IconButton';
import SvgIcon from '@material-ui/core/SvgIcon';
import { Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import Paper from '@material-ui/core/Paper';
import {LocationCheckBoxList} from './LocationCheckBoxList';
import {CheckBoxList} from './CheckBoxList'
import Button from '@material-ui/core/Button';
import { observer } from 'mobx-react';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 900,
    backgroundColor: theme.palette.background.paper,
    border: '#000',
    //boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },

  button: {
    margin: theme.spacing(1),
  }, 

  root: {
    width: '100%',
    height: 500,
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
  margin: {
    margin: theme.spacing(2),
  },
}));

export const Filter = observer((props)=> {
  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const [locationSelected, SetLocationSelected] = React.useState([]);
  const [certificationSelected, SetCertifictaionSelected] =React.useState([]);
  const [typeSelected, SetTypeSelected] =React.useState([]);
  
  const handlingLocationSelected = (value)=>{
    SetLocationSelected(value);
  }

  const handlingCertificationSelected = (value) =>{
    SetCertifictaionSelected(value);
  }
  const handlingTypeSelected = (value) =>{
    SetTypeSelected(value);
  }

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  
  const body = (
    <div style={modalStyle} className={classes.paper}>
        <Grid container direction="row"
            justify="space-between"
            alignItems="center"
            >
            <h2 id="simple-modal-title">기업 상세검색</h2>
            <IconButton  component="span" onClick={handleClose}>
                <CloseIcon  fontSize="large"></CloseIcon>
            </IconButton>
        </Grid>

        <Grid container spacing={3}>
        <Grid item xs>
        <h2>지역</h2>
        <Paper variant="outlined" square style={{maxHeight: 200, overflow: 'auto'}}>
        <LocationCheckBoxList selected={locationSelected} handlingSelected={handlingLocationSelected}/>
        </Paper>
        </Grid>
        <Grid item xs>
        <h2>인증제도</h2>
        <Paper variant="outlined" square style={{maxHeight: 200, overflow: 'auto'}}>
        <CheckBoxList selected={certificationSelected} handlingSelected={handlingCertificationSelected} dataCode={1}/>
        </Paper>
        </Grid>
        <Grid item xs>
        <h2>업종</h2>
        <Paper variant="outlined" square style={{maxHeight: 200, overflow: 'auto'}} >
        <CheckBoxList selected={typeSelected} handlingSelected={handlingTypeSelected} dataCode={2}/>
        </Paper>
        </Grid>

        <Grid><div/><div/></Grid>
        <Grid container justify="space-between" >
        {locationSelected.indexOf("전체") === -1 &&<Paper elevation={0} square className={classes.margin} >{locationSelected}</Paper>}
        </Grid>
        <Grid container justify="space-between" >
        {certificationSelected.indexOf("전체") === -1 &&<Paper elevation={0} square className={classes.margin} >{certificationSelected}</Paper>}
        </Grid>
        <Grid container justify="center" >
        <Button  size="large" variant="contained" color="primary"  className={classes.margin}>
        확인
        </Button>

        <Button  size="large" variant="outlined" onClick={handleClose} className={classes.margin}>
        취소
        </Button>
        </Grid>
        </Grid>
    </div>
  );

  return (
    <div>
     
    <IconButton color="primary" component="span" onClick={handleOpen}>
    <SvgIcon fontSize="large">
    <path fill="currentColor" d="M14,12V19.88C14.04,20.18 13.94,20.5 13.71,20.71C13.32,21.1 12.69,21.1 12.3,20.71L10.29,18.7C10.06,18.47 9.96,18.16 10,17.87V12H9.97L4.21,4.62C3.87,4.19 3.95,3.56 4.38,3.22C4.57,3.08 4.78,3 5,3V3H19V3C19.22,3 19.43,3.08 19.62,3.22C20.05,3.56 20.13,4.19 19.79,4.62L14.03,12H14Z" />
    </SvgIcon> </IconButton>

      <Modal
        open={open}
        //onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        {body}
      </Modal>
    </div>
  );
});