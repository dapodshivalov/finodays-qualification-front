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
        ]
    };

    componentDidMount() {
        console.log("componentDidMount");
        console.log(this.props);

        const pathSplitted = this.props.location.pathname.split("/");
        var id = parseInt(pathSplitted[pathSplitted.length - 1]);
        console.log(id);
        var pathBase = 'http://localhost:8080';
        var getCatsPath = pathBase + '/get-categories-stat?id=' + id;
        var getTransactionsPath = pathBase + '/get-transactions?id=' + id;
        console.log(getCatsPath);
        console.log(getTransactionsPath);
        fetch(getCatsPath)
            .then(res => res.json())
            .then((data) => {
                var transactions = data.result;
                fetch(getTransactionsPath)
                    .then(res => res.json())
                    .then((d) => {
                        var categories = d.result;
                        var monthes = Object.entries(categories).map(entry => entry.key);
                        this.setState({
                            curMonth: monthes[monthes.length - 1],
                            categories: categories,
                            transactions: transactions
                        })
                    })
                    .catch(console.log);
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