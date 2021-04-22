import React ,{ useState } from 'react';
import {DetailCard} from './CardView';
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import {useStores} from '../store/Context';
import {observer} from 'mobx-react';

const useStyles = makeStyles((theme) => ({

    cardGrid: {
      paddingTop: theme.spacing(5),
      paddingBottom: theme.spacing(5),
      flexGrow: 1,
    },
    card: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      padding:'2px',
    },
    paging: {
      '& > *': {
        marginTop: theme.spacing(2),
        align :'center',
        justifyContent : "center", 
      },
    },
  }));



//export default function CompanyList() {
export const CompanyList = observer(()=>{
  const classes = useStyles();
  const {companyStore} =  useStores();
  const {applyStore } = useStores();
  var cards = [];

  if(applyStore.applyToggle) cards = applyStore.applyCompanies;
  else    cards = companyStore.companys;

  var currentPage =1;
  if(applyStore.applyToggle) currentPage = applyStore.currentPage;
  else currentPage = companyStore.currentPage;

  const postsPerPage = 9;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = cards.slice(indexOfFirstPost,indexOfLastPost);

  const onChange= (e,activePage)=>{
    if(applyStore.applyToggle)
      applyStore.currentPage =activePage;
    else
      companyStore.currentPage=activePage;
  };

  return (
    <Container className={classes.cardGrid} >   
        <Grid container spacing={2}>
        { currentPost.map((card) => (
            <Grid item key={card._id} xs={12} sm={4}>
            <DetailCard className={classes.card} card={card} spacing={2} />
            </Grid>
        ))}
        </Grid> 
        <div>
        {applyStore.applyToggle&&
           <Pagination count={Math.ceil(cards.length/postsPerPage)}
            onChange={onChange} shape="rounded" page={applyStore.currentPage} className={classes.paging}/>
        }
        {!applyStore.applyToggle&&
           <Pagination count={Math.ceil(cards.length/postsPerPage)}
            onChange={onChange} shape="rounded" page={companyStore.currentPage} className={classes.paging}/>
        }
        </div>
  </Container> 
  );
});