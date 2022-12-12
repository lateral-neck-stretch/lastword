import React, { Component } from 'react';
import Chart from 'react-apexcharts';

class GaugeChart extends Component {
  constructor(props) {
    super(props);
    const proficiency = this.props.proficiency;

    this.updateCharts = this.updateCharts.bind(this);

    this.state = {
      optionsRadial: {
        plotOptions: {
          radialBar: {
            startAngle: -135,
            endAngle: 225,
            hollow: {
              margin: 0,
              size: '70%',
              background: 'transparent',
              image: undefined,
              imageOffsetX: 0,
              imageOffsetY: 0,
              position: 'front',
              dropShadow: {
                enabled: true,
                top: 3,
                left: 0,
                blur: 4,
                opacity: 0.24,
              },
            },
            track: {
              background: '#FFF',
              strokeWidth: '100%',
              margin: 0, // margin is in pixels
              dropShadow: {
                enabled: true,
                top: -3,
                left: 0,
                blur: 4,
                opacity: 0.1,
              },
            },

            dataLabels: {
              showOn: 'always',
              name: {
                offsetY: -20,
                show: true,
                color: 'white',
                fontSize: '13px',
              },
              value: {
                formatter: function (val) {
                  return val;
                },
                fontSize: '30px',
                show: true,
                color: 'white',
              },
            },
          },
        },
        fill: {
          type: 'gradient',
          gradient: {
            shade: 'dark',
            // type: 'horizontal',
            shadeIntensity: 0.5,
            // gradientToColors: ['#FFC316'],
            inverseColors: false,
            opacityFrom: 0.7,
            opacityTo: 0.9,
            stops: [0, 100],
            colorStops: [
              {
                offset: 0,
                color: '#EB656F',
                opacity: 1,
              },
              {
                offset: 20,
                color: '#FAD375',
                opacity: 1,
              },
              {
                offset: 60,
                color: '#61DBC3',
                opacity: 1,
              },
              {
                offset: 100,
                color: '#95DA74',
                opacity: 1,
              },
            ],
          },
        },
        stroke: {
          lineCap: 'round',
        },
        labels: ['Proficiency'],
      },
      seriesRadial: [proficiency],
      optionsBar: {},
    };
  }

  updateCharts() {
    const max = 90;
    const min = 30;

    this.setState({
      seriesRadial: [Math.floor(Math.random() * (90 - 50 + 1)) + 50],
    });
  }

  render() {
    return (
      <div className='app'>
        <div className='row'>
          <div className='col radial-chart'>
            <Chart
              options={this.state.optionsRadial}
              series={this.state.seriesRadial}
              type='radialBar'
              width='280'
            />
          </div>
        </div>
      </div>
    );
  }
}

export default GaugeChart;
