import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import Popover from '@material-ui/core/Popover';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

export default class PopoverPopupState extends Component {
  render(){
    const {sgB} = this.props;
    const name = {sgB}.sgB;
      return (
        <PopupState variant="popover" popupId="demo-popup-popover" >
          {(popupState) => (
            <div>
              <Button variant="contained" color="primary" {...bindTrigger(popupState)} style={{whiteSpace: "nowrap",background: "#ff7961"}}>
                {name}
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
              >
                <Box p={2} maxWidth="500px">
                  <Typography>The content of the Popover.
                  The content of the Popover.The content of the Popover.The content of the Popover.The content of the Popover.The content of the Popover.The content of the Popover.The content of the Popover.The content of the Popover.The content of the Popover.</Typography>
                </Box>
              </Popover>
            </div>
          )}
        </PopupState>
      );
          };
}