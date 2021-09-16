import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";
import ChartistGraph from 'react-chartist';

import Card from "components/Card/Card.jsx";
import CategoriesList from "../components/CategoriesList/CategoriesList";
import qs from "query-string";


class Profile extends Component {
    state = {
        categories: {
            predict: [
                {
                    categoryId: 5921,
                    categoryDescription: "5921 Package Stores - Beer, Liqu",
                    amount: -564.99
                }
            ],
            "8.2021": [
                {
                    categoryId: 5921,
                    categoryDescription: "5921 Package Stores - Beer, Liqu",
                    amount: -564.99
                },
                {
                    categoryId: 5921,
                    categoryDescription: "5921 Package Stores - Beer, Liqu",
                    amount: -564.99
                },
                {
                    categoryId: 5921,
                    categoryDescription: "5921 Package Stores - Beer, Liqu",
                    amount: -564.99
                }
            ]
        },
        transactions: [
            {
                clientId: 1,
                cardId: 357,
                timestamp: 18840,
                amount: 2260.0,
                currency: "RUR",
                description: "Пополнение 00887751",
                categoryId: 4829,
                categoryDescription: "4829 Money Transfer",
                credit: false
            }
        ]
    };

    componentDidMount() {
        var p = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        console.log(p);
        fetch('http://localhost:8080/get-categories-stat?id=' + p.id)
            .then(res => res.json())
            .then((data) => {
                var transactions = data.result;
                fetch('http://localhost:8080/get-transactions?id=' + p.id)
                    .then(res => res.json())
                    .then((d) => {
                        this.setState({
                            categories: d.result,
                            transactions: transactions
                        })
                    })
                    .catch(console.log);
            })
            .catch(console.log);
    }

    render() {
        var dataPie = {
            labels: this.state.categories["8.2021"].map(el => el.categoryDescription),
            series: this.state.categories["8.2021"].map(el => -el.amount)
        };
        var options = {
            donut: true
        };
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={6}>
                            {/*<a href="admin/games?year=2015">Previous year</a>*/}
                            <Card
                                title={"Траты по категориям " + 2016}
                                // category="Select a category"
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
