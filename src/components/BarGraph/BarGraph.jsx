import React, { Component } from 'react'

import { Bar } from 'react-chartjs-2';
import { ColorsProvider} from "variables/colors.jsx"; 
import { catCompareReverse } from "utils/utils";


export default class BarGraph extends Component {
    render() {
        console.log(this.props);

        var monthYears = Object.entries(this.props.categories).map(entry => entry[0]);
        console.log(monthYears)
        var curMonthYear = this.props.curMonthYear;
        var sortedCats = this.props.categories[curMonthYear].sort(catCompareReverse);
        var labels = sortedCats.sort(catCompareReverse).map(el => el.categoryDescription);
        var values = sortedCats.map(el => -el.amount);
        var colors = ColorsProvider.getNColors(sortedCats.length);

        const barData = {
            labels: labels,
            datasets: [
                {
                    data: values,
                    backgroundColor: colors,
                    borderWidth: 1,
                },
            ],
          };

        const barConfig = {
            indexAxis: 'y',
            // Elements options apply to all of the options unless overridden in a dataset
            // In this case, we are setting the border of each horizontal bar to be 2px wide
            elements: {
                bar: {
                    borderWidth: 2,
                },
            },
            responsive: true,
            plugins: {
                legend: {
                    display: false,
                    position: 'right',
                },
                title: {
                    display: false,
                },
            },
        };
        return (
            <div className="row">
                <div className="col" >
                    <Bar data={barData} options={barConfig} style={{maxHeight:"400px"}} />
                </div>
            </div>
        )
    }
}
