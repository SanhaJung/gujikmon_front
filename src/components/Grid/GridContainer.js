import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

const styles = {
  grid: {
    margin: "3 0 -15px !important",
    width: "100em",
    lineHeight: "2",
    
  }
};

const useStyles = makeStyles(styles);

export default function GridContainer(props) {
  const classes = useStyles();
  const { children } = props;
  return (
    <Grid container  className={classes.grid}>
      {children}
    </Grid>
  );
}

// GridContainer.propTypes = {
//   children: PropTypes.node
// };
