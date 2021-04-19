import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from '../components/SearchCard/Card.js';
import CardHeader from '../components/SearchCard/CardHeader.js';
import CardBody from '../components/SearchCard/CardBody.js';
import Table from '../components/SearchCard/Table.js';
import IconButton from '@material-ui/core/IconButton';
import { Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useStores } from "../store/Context.js";
import { observer } from "mobx-react";

const styles = {
  
    cardTitleWhite: {
      color: "#FFFFFF",
      marginTop: "20px",
      minHeight: "auto",
 
    }
  };

  
  const useStyles = makeStyles(styles);
  
  export const CompanySearch = observer(() =>{
    const classes = useStyles();

    const {searchStore} = useStores()

    const handleClose = () =>{
      searchStore.searchFlag= false;
    }
    const getData = (companies) =>{
      var result =[];
      companies.map((com) =>{
        result.push([com.company.coNm, com.company.coMainProd, com.company.coAddr]);
      });
      return result;
    }
    return (
          <Card >
            <CardHeader color="info">
            <Grid container direction="row"
              justify="space-between"
              alignItems="center"
              >
              <h2 id="simple-modal-title">검색결과</h2>
              <IconButton  component="span" onClick={handleClose}>
                  <CloseIcon  fontSize="large"></CloseIcon>
              </IconButton>
              </Grid>           
            </CardHeader>
            <CardBody style={{maxHeight: '47vh', overflow: 'auto'}}>{searchStore.searchResult.length >0 &&
              <Table
                tableHeaderColor="primary"
                tableHead={["기업명",  "업종", "주소"]}
                tableData={getData(searchStore.searchResult)}
              />}
              {searchStore.searchResult.length===0 && <h2>검색결과 없음</h2>}
            </CardBody>
          </Card>
    );
  })
  