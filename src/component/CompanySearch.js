import React from "react";
import { makeStyles } from "@material-ui/core/styles";

import GridContainer from '../components/Grid/GridContainer.js';
import GridItem from '../components/Grid/GridItem.js';
import Card from '../components/SearchCard/Card.js';
import CardHeader from '../components/SearchCard/CardHeader.js';
import CardBody from '../components/SearchCard/CardBody.js';
import Table from '../components/SearchCard/Table.js';
import MarkerData from '../map/MarkerData.js';

const styles = {
  
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "0px",
      minHeight: "auto",
      fontWeight: "300",
      fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif", 
      marginBottom: "3px",
      textDecoration: "none",
      "& small": {
        color: "#777",
        fontSize: "65%",
        fontWeight: "400",
        lineHeight: "1"
      }
    }
  };

  
  const useStyles = makeStyles(styles);
  
  export default function CompanySearch() {
    const classes = useStyles();
    
    return (
      <GridContainer style={{ float: 'left' }}>
        <GridItem style={{zIndex:100}} >
          <Card >
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>coNm</h4>
            </CardHeader>
            <CardBody>
              <Table
                tableHeaderColor="primary"
                tableHead={["기업명",  "업종", "주소"]}
                tableData={[
                  ["비바엔에스", "코크스, 연탄 및 석유정제품 제조업", "서울특별시 강남구 논현2동 234-25 KJ타워 7층"],
                ]}
              />
            </CardBody>
          </Card>
        </GridItem>       
      </GridContainer>
    );
  }
  