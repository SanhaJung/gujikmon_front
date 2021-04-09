import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import {addressMap} from '../Location';
import { observer } from 'mobx-react';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
}));

const temp = addressMap;

export const LocationCheckBoxList = observer(({selected,handlingSelected}) =>  {
//export const CheckBoxList = observer(() =>  {

  const classes = useStyles();
  
  const [data, setData] = React.useState(temp);
  
  const handleCheckboxChange = (value) => {

    const currentIndex = selected.indexOf(value);

    let newChecked = [...selected];

    //전체
    if( value === "전체"){
      //선택
      if (currentIndex === -1) {
        newChecked =[];
        data.Location.map((location) => {
          newChecked.push(location.name);
          location.options.map((option)=> {
            newChecked.push(option);
          })
      })}
      //해제
      else {
        newChecked=[];
      }
    }

    //그 외
    else{
        //선택
        if (currentIndex === -1) {
          newChecked.push(value);
        } 
        //해제
        else {
          newChecked.splice(currentIndex, 1);

          const totalIndex = selected.indexOf("전체");
          if( totalIndex !== -1)
            newChecked.splice(totalIndex, 1);

          //하위 행정 구역 한번에 지우기
          const city = data.Location.find(x => x.name===value)
          if(city !== undefined){
            city.options.map((town)=>{
              const townIndex = newChecked.indexOf(town);
              if( townIndex !== -1){
                newChecked.splice(townIndex, 1);
              }
            })
          }
        }
    }
    handlingSelected(newChecked);
  }


  if(selected === null)
    return <div></div>;

  return (
    <List className={classes.root}>
      {
        data.Location.map((location) => {
        const labelId = `checkbox-list-label-${location.name}`;

        return (
          <>
          <ListItem key={location.name} role={undefined} dense button onClick={() => handleCheckboxChange(location.name)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selected.indexOf(location.name) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={location.name} />
            </ListItem>
               
            <Collapse in={selected.indexOf(location.name) !== -1 && selected.indexOf("전체") === -1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            {
              location.options.map((value) => {
                if(value.length === 0){
                    return
                    }
                return(
                    <ListItem key={value} button className={classes.nested} onClick={() => handleCheckboxChange(value)} >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={selected.indexOf(value) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                        <ListItemText primary={value} />
                    </ListItem>
                )})
            }
            </List>
            </Collapse>   
            </>
      )})  
      }      
    </List>
  )});

