import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';
import { withStyles } from '@material-ui/core';

const sgBData = [
  {
    title:"가족친화",
    context : ["#육아휴직 후 복귀율 높음", "#가족 돌봄 휴직 및 휴가제도", "#배우자 출산휴가", "#유연근무제도","#출산 후 고용 유지"],
    background : "#FFD4E5"
  },
  {
    title:"경영혁신",
    context : ["#건강한 조직문화", "#4대 보험", "#고용유지율 높음", "#임금체불 X"],
    background : "#85D6A3"
  },
  {
    title:"기술혁신",
    context : ["#연봉 만족도 높음", "#기술 경쟁력", "#낮은 부채비율", "#R&D 투자"],
    background : "#00FFFF"
  },
  {
    title:"청년친화",
    context : ["#우수한 근무환경", "#건강한 조직문화", "#고용안정성", "#높은 신용평가","#워라벨"],
    background : "#2962FF"
  },
  {
    title:"강소기업",
    context : ["#준수한 신용평가", "#고용 유지율 높음", "#임금체불 X", "#4대 보험","#경조사비"],
    background : "#FFE599"
  },
]
const styles = theme => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: 200,
  },

  cssLabel: {
    color : 'green'
  },

  cssOutlinedInput: {
    '&$cssFocused $notchedOutline': {
      borderColor: `${theme.palette.primary.main} !important`,
    }
  },

  cssFocused: {},

  notchedOutline: {
    borderWidth: '1px',
    borderColor: 'green !important'
  },

});
class PopoverPopupState extends Component {
  render(){
    const {sgB} = this.props;
    const target = sgBData.find(x => x.title===sgB)
    if(target === undefined)
      return (<div></div>);
    
    const {classes} =this.props;
      return (
        <PopupState variant="popover" popupId="demo-popup-popover" className={classes.container}>
          {(popupState) => (
            <div>
              <Button variant="contained" color="primary" {...bindTrigger(popupState)} style={{whiteSpace: "nowrap",background: target.background,color:'black' }}>
                {target.title}
              </Button>
              <Popover
                {...bindPopover(popupState)}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                className={classes.notchedOutline}
              >
                <Box p={2} maxWidth="500px" className={classes.notchedOutline} variant="outlined">
                {target.context.map((x) => 
                <Typography style={{whiteSpace: "nowrap",background: target.background,color:'black', margin:'4px',padding: '0.3em' }}> {x}</Typography>
                )}
                </Box>
              </Popover>
            </div>
          )}
        </PopupState>
      );
          };
}
export default withStyles(styles) (PopoverPopupState);