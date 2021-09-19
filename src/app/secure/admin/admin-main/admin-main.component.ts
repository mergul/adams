import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexTitleSubtitle,
  ApexDataLabels,
  ApexLegend,
  ApexStroke,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexFill,
  ApexTooltip,
  ApexYAxis
} from "ng-apexcharts";
export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  xaxis: ApexXAxis;
  markers: any; //ApexMarkers;
  stroke: any; //ApexStroke;
  yaxis: ApexYAxis | ApexYAxis[];
  dataLabels: ApexDataLabels;
  title: ApexTitleSubtitle;
  legend: ApexLegend;
  fill: ApexFill;
  tooltip: ApexTooltip;
};
export type ChartqOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  colors: any[];
  dataLabels: ApexDataLabels;
  stroke: ApexStroke;
  xaxis: ApexXAxis;
  legend: ApexLegend
};
export type ChartdOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: string[];
};
@Component({
  selector: 'app-admin-main',
  templateUrl: './admin-main.component.html',
  styleUrls: ['./admin-main.component.scss']
})
export class AdminMainComponent implements OnInit {

  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
   @ViewChild("chartq") chartq!: ChartComponent;
  public chartqOptions: Partial<ChartqOptions>;
  @ViewChild("chartd") chartd!: ChartComponent;
  public chartdOptions: Partial<ChartdOptions>;

  constructor() {
    this.chartOptions = {
      series: [
        {
          name: "Income",
          type: "column",
          data: [1.4, 2, 2.5, 1.5, 2.5, 2.8, 3.8, 4.6]
        },
        {
          name: "Cashflow",
          type: "column",
          data: [1.1, 3, 3.1, 4, 4.1, 4.9, 6.5, 8.5]
        },
        {
          name: "Revenue",
          type: "line",
          data: [20, 29, 37, 36, 44, 45, 50, 58]
        }
      ],
      chart: {
        height: 350,
        type: "line",
        stacked: false
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        width: [1, 1, 4]
      },
      title: {
        text: "XYZ - Stock Analysis (2009 - 2016)",
        align: "left",
        offsetX: 110
      },
      xaxis: {
        categories: [2009, 2010, 2011, 2012, 2013, 2014, 2015, 2016]
      },
      yaxis: [
        {
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#008FFB"
          },
          labels: {
            style: {
              colors: "#008FFB"
            }
          },
          title: {
            text: "Income (thousand crores)",
            style: {
              color: "#008FFB"
            }
          },
          tooltip: {
            enabled: true
          }
        },
        {
          seriesName: "Income",
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#00E396"
          },
          labels: {
            style: {
              colors: "#00E396"
            }
          },
          title: {
            text: "Operating Cashflow (thousand crores)",
            style: {
              color: "#00E396"
            }
          }
        },
        {
          seriesName: "Revenue",
          opposite: true,
          axisTicks: {
            show: true
          },
          axisBorder: {
            show: true,
            color: "#FEB019"
          },
          labels: {
            style: {
              colors: "#FEB019"
            }
          },
          title: {
            text: "Revenue (thousand crores)",
            style: {
              color: "#FEB019"
            }
          }
        }
      ],
      tooltip: {
        fixed: {
          enabled: true,
          position: "topLeft", // topRight, topLeft, bottomRight, bottomLeft
          offsetY: 30,
          offsetX: 60
        }
      },
      legend: {
        horizontalAlign: "left",
        offsetX: 40
      }
    };
    this.chartdOptions = {
      series: [44, 55, 13, 43, 22],
      chart: {
        type: "donut"
      },
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 200,
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ],
      labels: ["Team A", "Team B", "Team C", "Team D", "Team E"]
    };
    this.chartqOptions = {
      series: [
        {
          name: "Store Customers",
          data: [40, 70, 20, 90, 36, 80, 30, 91, 60]
      },{
          name: "Online Customers",
          data: [20, 30, 10, 20, 16, 40, 20, 51, 10]
      }
      ],
      chart: {
        height: 300,
        type: "line"
      },
      colors: ['#6ab04c', '#2980b9'],
      dataLabels: { enabled: false },
        
      stroke: {
        curve: 'smooth'
    },
    xaxis: {
        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    },
    legend: {
        position: 'top'
    }
    };
  }

  ngOnInit(): void {
  }

}
