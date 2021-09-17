import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import ChartistGraph from 'react-chartist';

import Card from "components/Card/Card.jsx";
import CategoriesList from "../components/CategoriesList/CategoriesList";

class Games extends Component {
    render() {
        var dataPie = {
            labels: ['62%','32%','6%'],
            series: [{
                value: 20,
                name: 'Series 1',
                meta: 'Meta One'
              }, {
                value: 10,
                name: 'Series 2',
                meta: 'Meta Two'
              }, {
                value: 70,
                name: 'Series 3',
                meta: 'Meta Three'
              }]
        };
        var options = {
            donut: true
        };
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={6}>
                            <a href="admin/games?year=2015">Previous year</a>
                            <Card
                                title={"Categories rated by " + 2016}
                                category="Select a category"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    // <CategoriesList type="categories"/>
                                    <div className="row">
                                        <div className="col" style={{maxHeight:"320px"}}>
                                            <ChartistGraph className="ch-chart" data={dataPie} type="Pie" options={options}/>
                                        </div>
                                    </div>

                                }
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Game Mechanics"
                                category="Select a mechanic"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <CategoriesList type="mechanics"/>
                                }
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Card
                                title="Game Designers"
                                category="Select a mechanic"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <CategoriesList type="designers"/>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Games;
