import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
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

const cert = ["전체","가족친화", "청년친화","경영혁신","기술혁신","강소기업"];
export const CheckBoxList = observer(({selected,handlingSelected,dataCode}) =>  {
//export const CheckBoxList = observer(() =>  {

  const classes = useStyles();
  const [data, setData] = React.useState(cert);

  const handleCheckboxChange = (value) => {

    const currentIndex = selected.indexOf(value);

    let newChecked = [...selected];

    //전체
    if( value === "전체"){
      //선택
      if (currentIndex === -1) {
        newChecked =[];
        data.map((certification) => {
          newChecked.push(certification);
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
         
        }
    }
    handlingSelected(newChecked);
  }


  return (
    <List className={classes.root}>
      {
        data.map((certification) => {
        const labelId = `checkbox-list-label-${certification}`;

        return (
          <>
          <ListItem key={certification} role={undefined} dense button onClick={() => handleCheckboxChange(certification)}>
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={selected.indexOf(certification) !== -1}
                tabIndex={-1}
                disableRipple
                inputProps={{ 'aria-labelledby': labelId }}
              />
            </ListItemIcon>
            <ListItemText id={labelId} primary={certification} />
            </ListItem>
               
            </>
      )})  
      }      
    </List>
  )});

