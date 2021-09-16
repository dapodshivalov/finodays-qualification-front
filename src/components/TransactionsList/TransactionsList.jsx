import React, {Component} from "react";

import {Grid, Row, Col} from "react-bootstrap";

export class CategoriesList extends Component {

    render() {
        var ind1=15;
        var ind2=38;
        return (
            <div style={{height: 500, overflowY: "scroll", fontFamily: "monospace"}}>
                <div style={{fontSize: 18, marginLeft: 25}}>
                Сумма
                <span style={{whiteSpace: "pre"}}>{' '.repeat(ind1-3)}</span>
                Описание
                <span style={{whiteSpace: "pre"}}>{' '.repeat(ind2-8)}</span>
                Категория
                </div>
                {this.props.transactions.map(item => {
                var color = '';
                var sign = ''
                if (item.amount < 0) {
                    color = "#F1948A"
                } else {
                    color = "#82E0AA";
                    sign = '+'
                }
                var rep1 = Math.max(1, ind1-(sign +item.amount+item.currency).length);
                var rep2 = Math.max(1, ind2-(item.description).length);


                return (
                    <div style={{
                        marginLeft: 15,
                        backgroundColor: color,
                        fontSize: 18,
                        padding: 10,
                        width: '90%',
                        borderRadius: 10,
                        marginTop: 5,
                        textOverflow: "ellipsis"
                    }}>
                        <b>{sign + item.amount + ' ' + item.currency+'      '}</b>
                        <span style={{whiteSpace: "pre"}}>{' '.repeat(rep1)}</span>
                        {item.description}
                        <span style={{whiteSpace: "pre"}}>{' '.repeat(rep2)}</span>
                        {item.categoryDescription}

                    </div>
                )
            })}
            </div>);
    }
}

export default CategoriesList;
