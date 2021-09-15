/*!

=========================================================
* Light Bootstrap Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { Component } from "react";
import {Grid, Row, Col, Button, Table,} from "react-bootstrap";
import Card from "../components/Card/Card";
import StatsCard from "../components/StatsCard/StatsCard";
import qs from "query-string";



class Game extends Component {
    state = {
        game: {
            id: -1,
            name: "",
            pictureUrl: "",
            playerMinAge: 0,
            playersMinAmount: 0,
            playersMaxAmount: 0,
            duration: 0,
            releaseYear: 0,
            rating: 0,
            categories: [],
            families: [],
            designers: [],
            mechanics: []
        }
    };

    componentDidMount() {
        var p = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        console.log(p);
        fetch('/api/get-game?id=' + p.id)
            .then(res => res.json())
            .then((data) => {
                this.setState({ game: data.result })
            })
            .catch(console.log)
    }

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-smile text-warning" />}
                                statsText="Age"
                                statsValue={this.state.game.playerMinAge + "+"}
                                statsIconText={'avg.rating: ' + Math.max(0, this.state.game.rating + Math.random() * 4 - 2).toFixed(2)}
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-users text-success" />}
                                statsText="Players"
                                statsValue={this.state.game.playersMinAmount + "-" + this.state.game.playersMaxAmount}
                                statsIconText={'avg.rating: ' + Math.max(0, this.state.game.rating + Math.random() * 4 - 2).toFixed(2)}
                        />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="pe-7s-clock text-danger" />}
                                statsText="Duration"
                                statsValue={this.state.game.duration + "m"}
                                statsIconText={'avg.rating: ' + Math.max(0, this.state.game.rating + Math.random() * 4 - 2).toFixed(2)}
                            />
                        </Col>
                        <Col lg={3} sm={6}>
                            <StatsCard
                                bigIcon={<i className="fa pe-7s-graph2 text-info" />}
                                statsText="Rating"
                                statsValue={this.state.game.rating.toFixed(2)}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Card
                                title={this.state.game.name + " (" + this.state.game.releaseYear + ")"}
                                category=""
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <Table striped hover>
                                        <tbody>
                                        <tr>
                                            <td>
                                                Categories:
                                            </td>
                                            <td>
                                                {
                                                    this.state.game.categories.map(item => {
                                                        return (
                                                            <a href={'/admin/cat?type=categories&id=' + item.id}>
                                                                <Button className="btn-primary btn-sm">
                                                                    {item.name}
                                                                </Button>
                                                            </a>
                                                        )
                                                    })
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Meachanics:
                                            </td>
                                            <td>
                                                {
                                                    this.state.game.mechanics.map(item => {
                                                        return (
                                                            <a href={'/admin/cat?type=mechanics&id=' + item.id}>
                                                                <Button className="btn-primary btn-sm">
                                                                    {item.name}
                                                                </Button>
                                                            </a>
                                                        )
                                                    })
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Families:
                                            </td>
                                            <td>
                                                {
                                                    this.state.game.families.map(item => {
                                                        return (
                                                            <a href={'/admin/cat?type=families&id=' + item.id}>
                                                                <Button className="btn-primary btn-sm">
                                                                    {item.name}
                                                                </Button>
                                                            </a>
                                                        )
                                                    })
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                Designers:
                                            </td>
                                            <td>
                                                {
                                                    this.state.game.designers.map(item => {
                                                        return (
                                                            <a href={'/admin/cat?type=designers&id=' + item.id}>
                                                                <Button className="btn-primary btn-sm">
                                                                    {item.name}
                                                                </Button>
                                                            </a>
                                                        )
                                                    })
                                                }
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>Image:</td>
                                            <td>To be continued</td>
                                        </tr>
                                        <tr>
                                            <td>Description:</td>
                                            <td>To be continued</td>
                                        </tr>
                                        </tbody>
                                    </Table>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default Game;
