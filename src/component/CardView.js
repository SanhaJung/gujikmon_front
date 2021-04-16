import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import FavoriteIcon from '@material-ui/icons/Favorite';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import PopoverPopupState from './PopOver'
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import {useStores} from '../store/Context';
import {observer} from 'mobx-react';
import LoginModal from './LoginModal';
const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 500,
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  card:{
    marginLeft:'auto',
    marginRight:'auto',
    alignContent	:'flex-start',
    alignItems	:'flex-start',
    },
  link: {
    flexGrow: 1,
    textAlign:'left',
    marginLeft :theme.spacing(1)
  },
}));


export const DetailCard = observer(({card}) =>{
//export default function DetailCard({card}) {

  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const preventDefault = (event) => event.preventDefault();
  const [loginOpen, setLoginOpen] = React.useState(false);
  const {userStore} =  useStores();

  const handleExpandClick = () => {
    setExpanded(!expanded);
    };
    const handleButtonChange = () =>{
      if(loginOpen)
        setLoginOpen(false);
      else 
        setLoginOpen(true);
    }
    const handleFavoritesChange = (id) => {
        userStore.updateFavorites(id);
            
      };
    
    const CardheaderNotLogined = (
      <CardHeader
      action={
          <IconButton aria-label="add to favorites" onClick={handleButtonChange}>
        <FavoriteBorderIcon/>
        <LoginModal open={loginOpen} handleClose={handleButtonChange}></LoginModal>
      </IconButton>  
      }
      title={card.coNm}
      subheader={card.coAddr}
    />
    )
    const CardheaderLogined = (
      <CardHeader
              action={
                      <IconButton aria-label="add to favorites" onClick={()=>handleFavoritesChange(card.id)}>
                          {userStore.favorites.indexOf(card.id) !== -1 &&<FavoriteIcon style={{color: '#ff2400'}}/>

                           }
                          {userStore.favorites.indexOf(card.id) === -1 &&<FavoriteBorderIcon /> }
                        </IconButton>  
                        }
                        title={card.coNm}
                        subheader={card.coAddr}
                      />
    )
   
  return (
    <Card className={classes.root}>
        {window.sessionStorage.getItem('login') ==='0' && CardheaderNotLogined }
        {window.sessionStorage.getItem('login') !=='0' && CardheaderLogined }
        <Grid container spacing={1} > 
        {    
          card.sgBrandNm.map((sgB,idx) => (       
            <Grid item key={sgB} className={classes.card}>              
              <PopoverPopupState  sgB={sgB} />
              </Grid>
              ))
        }
        </Grid> 

        <CardActions> 
        {card.recruitment && 
          <Link href={card.info[0].wantedInfoUrl} className={classes.link} variant="body2" target="_blank">
          채용공고
        </Link>
        }
        <IconButton
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
        </CardActions>

      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          {/* {card.coContent.length > 0 && <Typography paragraph>{card.coContent}</Typography>}
          {card.coGdpnt.length > 0 && <Typography paragraph>{card.coGdpnt}</Typography>} */}
          {card.coHomePage&& <Typography paragraph><Link href={"http://"+ card.coHomePage} target="_blank" >홈페이지</Link></Typography>}
          {card.coMainProd&&<Typography paragraph>{card.coMainProd}</Typography>}
          {card.alwaysWorkerCnt && <Typography paragraph>근로자수: {card.alwaysWorkerCnt}</Typography>}
        </CardContent>
      </Collapse>
    </Card>
  );
});