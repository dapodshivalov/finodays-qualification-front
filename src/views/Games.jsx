import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import CategoriesList from "../components/CategoriesList/CategoriesList";

class Games extends Component {
    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <a href="admin/games?year=2015">Previous year</a>
                            <Card
                                title={"Categories rated by " + 2016}
                                category="Select a category"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <CategoriesList type="categories"/>
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
