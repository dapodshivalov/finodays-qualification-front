import React, { Component } from 'react'

import { Doughnut } from 'react-chartjs-2';
import { ColorsProvider} from "variables/colors.jsx"; 
import { catCompareReverse } from "utils/utils";

class DonutGraph extends Component {
    render() {
        console.log('DonutGraph render');
        console.log(this.props);

        var monthYears = Object.entries(this.props.categories).map(entry => entry[0]);
        console.log(monthYears)
        var curMonthYear = this.props.curMonthYear;
        var sortedCats = this.props.categories[curMonthYear].sort(catCompareReverse);
        var labels = sortedCats.sort(catCompareReverse).map(el => el.categoryDescription);
        var colors = ColorsProvider.getNColors(sortedCats.length);

        const data = {
            labels: labels,
            datasets: [
                {
                    label: 'Dataset 1',
                    data: sortedCats.map(el => -el.amount),
                    backgroundColor: colors
                }
            ]
        };
        const donutConfig = {
            type: 'doughnut',
            data: data,
            options: {
                responsive: true,
                plugins: {
                    legend: {
                    position: 'top',
                    },
                    title: {
                    display: true,
                    text: 'Chart.js Doughnut Chart'
                    }
                }
            },
        };
        return (
            <div className="row">
                <div className="col" >
                    <Doughnut data={data} options={donutConfig} style={{maxHeight:"400px"}} />
                </div>
            </div>
        )
    }
}

export default DonutGraph;
