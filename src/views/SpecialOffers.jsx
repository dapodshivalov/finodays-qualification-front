import React, { Component } from "react";
import { Grid, Row, Col } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import CategoriesList from "../components/CategoriesList/CategoriesList";
import qs from "query-string";

class SpecialOffers extends Component {
    state = {
        deposit: {
            monthlyAmount: 100,
            profit: 20.0
        },
        loan: 10.0
    };
    componentDidMount() {
        var p = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
        Promise.all([fetch('/api/get-deposit?id=' + p.id), fetch('/api/get-loan?id=' + p.id)])

            .then(([res1, res2]) => {
                return Promise.all([res1.json(), res2.json()])
            })
            .then(([res1, res2]) => {
                this.setState(
                    {
                        deposit: {
                            monthlyAmount: parseInt(res1.result.monthlyAmount),
                            profit: parseInt(res1.result.profit)
                        },
                        loan: parseInt(res2.result)
                    }
                )
            })
            .catch(console.log);
    }

    render() {
        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>

                            <Card
                                title={"Вклады"}
                                category="Инвестируйте свои сбережния"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <Row>
                                    <Col md={3}>
                                        <img
                                            src="https://www.psbank.ru/-/media/Images/Product-Images/Saving_mini/strong-ovi.jpg?la=ru-RU&hash=D93526C6BD0FC01A515BDD4FC6031BEB422882F2"
                                            alt="new"
                                            height={144}
                                            width={216}
                                            style={{borderRadius: 10, marginLeft: 15}}
                                        />
                                    </Col>
                                        <Col>
                                            <div style={{fontSize: 20}}>
                                                Вы можете откладывать <b>{this.state.deposit.monthlyAmount} руб.</b> каждый месяц
                                            </div>
                                            <div style={{fontSize: 20, marginTop: 6}}>
                                                И получите выгоду через год с вклада <b>{this.state.deposit.profit} руб.</b>
                                            </div>
                                            <div style={{fontSize: 20, marginTop: 50}}>
                                                <a href={'https://www.psbank.ru/Personal/Saving'} target="_blank">Открыть вклад</a>
                                            </div>
                                        </Col>
                                    </Row>
                                }
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <Card
                                title={"Кредиты"}
                                category="Для самого необходимого"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <Row>
                                        <Col md={3}>
                                            <img
                                                src="https://www.psbank.ru/-/media/Images/Product-Images/Saving_mini/Moi_dohod_720x480_1.jpg?la=ru-RU&hash=D44D184626A044951AB2CC79BD60DD5A10C62298"
                                                alt="new"
                                                height={144}
                                                width={216}
                                                style={{borderRadius: 10, marginLeft: 15}}
                                            />
                                        </Col>
                                        <Col>
                                            <div style={{fontSize: 20}}>
                                                Вы сможете выплачивать кредит
                                            </div>
                                            <div style={{fontSize: 20, marginTop: 6}}>
                                                со своих сбережний на сумму: <b>{this.state.loan} руб.</b>
                                            </div>
                                            <div style={{fontSize: 20, marginTop: 50}}>
                                                <a href={'https://www.psbank.ru/Personal/Loans'} target="_blank">Взять кредит</a>
                                            </div>
                                        </Col>
                                    </Row>
                                }
                            />
                        </Col>
                    </Row>
                </Grid>
            </div>
        );
    }
}

export default SpecialOffers;
