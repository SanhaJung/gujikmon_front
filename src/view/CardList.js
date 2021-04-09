import React ,{ useState ,useEffect} from 'react';
import DetailCard from './CardView';
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
  const cards = companyStore.companys;
  const [currentPage, setCurrentPage]= useState(1);

  const postsPerPage = 6;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPost = cards.slice(indexOfFirstPost,indexOfLastPost);

  
  const onChange= (e,activePage)=>{
    console.log(activePage);
    setCurrentPage(activePage);
    console.log({currentPage});
  };
  return (
    <Container className={classes.cardGrid} >        
        <Grid container spacing={2}>
        {currentPost.map((card) => (
            <Grid item key={card._id} xs={12} sm={4}>
            {/* <Box p={0.5}> */}
            <DetailCard className={classes.card} card={card} spacing={2} />
            {/* </Box> */}
            </Grid>
        ))}
        </Grid>
        <div>
            <Pagination count={Math.ceil(cards.length/postsPerPage)}
            onChange={onChange} shape="rounded"  className={classes.paging}/>
        </div>
  </Container> 
  );
});