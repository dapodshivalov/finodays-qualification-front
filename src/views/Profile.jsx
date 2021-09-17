import React, { Component } from "react";
import { Grid, Row, Col, Dropdown, Button } from "react-bootstrap";

import Card from "components/Card/Card.jsx";
import CategoriesList from "../components/CategoriesList/CategoriesList";
import TransactionList from "../components/TransactionsList/TransactionsList";
import qs from "query-string";
import { Bar } from 'react-chartjs-2';
import { ColorsProvider} from "variables/colors.jsx"; 
import Select from 'react-select'
import { catCompareReverse, getRusMonth, getYear, labelForSelectOption } from "utils/utils.jsx";
import DonutGraph from "components/DonutGraph/DonutGraph.jsx";
import BarGraph from "components/BarGraph/BarGraph.jsx";
import { URL_BASE } from "variables/const.jsx"




class Profile extends Component {
    state = {
        curMonthYear: "9.2021",
        categories: {
            "predict": [
                {
                    categoryId: 5921,
                    categoryDescription: "5921 Package Stores - Beer, Liqu",
                    amount: -1000
                }
            ],
            "8.2021": [
                {
                    categoryId: 5921,
                    categoryDescription: "Transportation",
                    amount: -600
                },
                {
                    categoryId: 5921,
                    categoryDescription: "Vehicle Rental",
                    amount: -700
                },
                {
                    categoryId: 5921,
                    categoryDescription: "Hotel/Motel (Lodging)",
                    amount: -300
                },
                {
                    categoryId: 5921,
                    categoryDescription: "Mail/Telephone/Preauth order",
                    amount: -700
                },
                {
                    categoryId: 5921,
                    categoryDescription: "Retail Purchase",
                    amount: -300
                }
            ],
            "9.2021": [
                {
                    categoryId: 5921,
                    categoryDescription: "Transportation",
                    amount: -900
                },
                {
                    categoryId: 5921,
                    categoryDescription: "Vehicle Rental",
                    amount: -700
                },
                {
                    categoryId: 5921,
                    categoryDescription: "Hotel/Motel (Lodging)",
                    amount: -100
                },
                {
                    categoryId: 5921,
                    categoryDescription: "Mail/Telephone/Preauth order",
                    amount: -500
                },
                {
                    categoryId: 5921,
                    categoryDescription: "Retail Purchase",
                    amount: -300
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
        ],
        deposit: {
            monthlyAmount: 100,
            profit: 20.0
        },
        loan: 10.0
    };

    componentDidMount() {
        console.log("componentDidMount");
        console.log(this.state);
        console.log(this.props);

        const pathSplitted = this.props.location.pathname.split("/");
        var id = parseInt(pathSplitted[pathSplitted.length - 1]);
        console.log(id);
        var pathBase = URL_BASE;
        Promise.all([
                fetch(pathBase + '/api/get-deposit?id=' + id),
                fetch(pathBase + '/api/get-loan?id=' + id),
                fetch(pathBase + '/get-categories-stat?id=' + id),
                fetch(pathBase + '/get-transactions?id=' + id)
            ])

            .then(([res1, res2, res3, res4]) => {
                return Promise.all([res1.json(), res2.json(), res3.json(), res4.json()])
            })
            .then(([res1, res2, res3, res4]) => {
                var transactions = res3.result;
                var categories = res4.result;
                var monthes = Object.entries(categories).map(entry => entry.key);
                this.setState(
                    {
                        curMonthYear: monthes[monthes.length - 1],
                        categories: categories,
                        transactions: transactions,
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
        console.log(this.state);

        var monthYears = Object.entries(this.state.categories).map(entry => entry[0]);
        console.log(monthYears)
        var curMonthYear = this.state.curMonthYear;
        var curMonth = getRusMonth(curMonthYear);
        var curYear = getYear(curMonthYear);

        var selectOptions = monthYears.map(entry => {
            return {
                value: entry,
                label: labelForSelectOption(entry)
            };
        });
        console.log("selectOptions");
        console.log(selectOptions);

        var handleChange = (newValue, actionMeta) => {
            console.group('Value Changed');
            console.log(newValue);
            this.setState({
                curMonthYear: "" + newValue.value,
                categories: this.state.categories,
                transactions: this.state.transactions
            })
          };

        return (
            <div className="content">
                <Grid fluid>
                    <Row>
                        <Col md={12}>
                            <Card
                                content={
                                    <Select options={selectOptions} onChange={handleChange} defaultValue={selectOptions[selectOptions.length - 1]}></Select>
                                }
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            {/*<a href="admin/games?year=2015">Previous year</a>*/}
                            <Card
                                title={"Траты по категориям за " + curMonth + " " + curYear}
                                // category="Select a category"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    // <ChartistGraph className="ch-chart" data={dataPie} type="Pie" options={pieOptions}/>
                                    <DonutGraph categories={this.state.categories} curMonthYear={this.state.curMonthYear}/>
                                    
                                }
                            />
                        </Col>
                        <Col md={6}>
                            <Card
                                title={"Топ категорий " + curMonth + " " + curYear}
                                // category="Select a category"
                                content={
                                    // <CategoriesList type="categories"/>
                                    <BarGraph categories={this.state.categories} curMonthYear={this.state.curMonthYear}/>
                                }
                            />
                        </Col>
                    </Row>

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

                    <Row>
                        <Col md={12}>
                            <Card
                                title="История транзакций"
                                ctTableFullWidth
                                ctTableResponsive
                                content={
                                    <TransactionList transactions={this.state.transactions}/>
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