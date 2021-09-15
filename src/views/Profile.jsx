import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import ChartistGraph from 'react-chartist';

import Card from "components/Card/Card.jsx";
import CategoriesList from "../components/CategoriesList/CategoriesList";

class Profile extends Component {
    // state = {
    //     charts: {
    //         id: -1,
    //         name: "",
    //         pictureUrl: "",
    //         playerMinAge: 0,
    //         playersMinAmount: 0,
    //         playersMaxAmount: 0,
    //         duration: 0,
    //         releaseYear: 0,
    //         rating: 0,
    //         categories: [],
    //         families: [],
    //         designers: [],
    //         mechanics: []
    //     }
    // };
    //
    // componentDidMount() {
    //     var p = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    //     console.log(p);
    //     fetch('/api/get-game?id=' + p.id)
    //         .then(res => res.json())
    //         .then((data) => {
    //             this.setState({ game: data.result })
    //         })
    //         .catch(console.log)
    // }

    render() {
        var dataPie = {
            labels: ['62%','32%','6%'],
            series: [62, 32, 6]
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
                                            <ChartistGraph data={dataPie} type="Pie" options={options}/>
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

export default Profile;
