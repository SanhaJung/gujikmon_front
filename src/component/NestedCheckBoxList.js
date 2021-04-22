import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Collapse from '@material-ui/core/Collapse';
import {addressMap} from '../Location';
import {Industry} from '../Industry';
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


export const NestedCheckBoxList = observer(({selected,handlingSelected,dataCode}) =>  {
//export const CheckBoxList = observer(() =>  {

  const classes = useStyles();
  var temp;
  if(dataCode === 0){
    temp = addressMap;
  }
  else if (dataCode === 2){
    temp = Industry;
  }
  else {
    temp = [];
  }
  const [data] = React.useState(temp);
  
  const handleCheckboxChange = (value) => {
    const currentIndex = selected.findIndex(x=> x.name === value.name && x.code === value.code)  ;
    let newChecked = [...selected];

    //전체
    if( value.name === "전체"){
      //선택
      if (currentIndex === -1) {
        newChecked =[];
        data.map((level1) => {
          newChecked.push({name: level1.name, code : level1.code});
          level1.options.map((option)=> {
            newChecked.push({name: option.name, code : option.code});
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
          newChecked.push({name : value.name, code:value.code});
        } 
        //해제
        else {
          newChecked.splice(currentIndex, 1);

          const totalIndex = selected.findIndex(x=> x.name === "전체");
          if( totalIndex !== -1)
            newChecked.splice(totalIndex, 1);

          //하위 행정 구역 한번에 지우기
          const level1 = data.find(x => x.name===value.name)
          if(level1 !== undefined){
            level1.options.map((level2)=>{
              const level2Index = newChecked.findIndex(x=> x.name === level2.name && x.code === level2.code);
              if( level2Index !== -1){
                newChecked.splice(level2Index, 1);
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
        data.map((level1) => {
        const labelId = `checkbox-list-label-${level1.name}`;

        return (
          <>
          <ListItem key={level1.name} role={undefined} dense button onClick={() => handleCheckboxChange(level1)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selected.findIndex(x=> x.name === level1.name && x.code === level1.code) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={level1.name} />
            </ListItem>
               
            <Collapse in={selected.findIndex(x=> x.name === level1.name) !== -1 && selected.findIndex(x=> x.name === "전체") === -1} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
            {
              level1.options.map((value) => {
                if(value.length === 0){
                    return
                    }
                return(
                    <ListItem key={value} button className={classes.nested} onClick={() => handleCheckboxChange(value)} >
                    <ListItemIcon>
                      <Checkbox
                        edge="start"
                        checked={selected.findIndex(x=> x.name === value.name  && x.code === value.code) !== -1}
                        tabIndex={-1}
                        disableRipple
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </ListItemIcon>
                        <ListItemText primary={value.name} />
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

