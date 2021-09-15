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
import qs from "query-string";
import { Grid, Row, Col, Table } from "react-bootstrap";

import Card from "components/Card/Card.jsx";

class Cat extends Component {
    typesMapping = {
        "categories": "category",
        "mechanics": "mechanic",
        "families": "family",
        "designers": "designer"
    };

    state = {
        category: {
            id: -1,
            name: "",
            games: []
        }
    };

    componentDidMount() {
        var p = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        console.log(p);
        fetch('/api/get-' + this.typesMapping[p.type] + "?id=" + p.id)
            .then(res => res.json())
            .then((data) => {
                this.setState({ category: data.result })
            })
            .catch(console.log)
    }

    render() {
        var p = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                title={"Games for " + this.typesMapping[p.type] + " " + this.state.category.name}
                                category=""
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <Table striped hover>
                                        <thead>
                                        <tr>
                                            <th>Id</th>
                                            <th>Name</th>
                                            <th>Age</th>
                                            <th>Players</th>
                                            <th>Duration</th>
                                            <th>Year</th>
                                            <th>Rating</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {
                                            this.state.category.games.map((game) => {
                                                return (
                                                    <tr>
                                                        <td>{game.id}</td>
                                                        <td><a href={"/admin/game?id=" + game.id}>{game.name}</a></td>
                                                        <td>{game.playerMinAge + "+"}</td>
                                                        <td>{game.playersMinAmount + "-" + game.playersMaxAmount}</td>
                                                        <td>{game.duration + "m"}</td>
                                                        <td>{game.releaseYear}</td>
                                                        <td>{game.rating.toFixed(2)}</td>
                                                    </tr>
                                                )
                                            })
                                        }
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

export default Cat;
