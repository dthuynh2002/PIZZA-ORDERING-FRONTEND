import merge from 'lodash/merge';

// Định nghĩa màu sắc và font mặc định
const grey = {
    500: '#B0BEC5',
    600: '#78909C',
    800: '#455A64'
};

const fontSize = {
    base: ['14px', { lineHeight: '20px' }],
    '2xl': ['24px', { lineHeight: '32px' }]
};

const fontWeight = {
    semibold: 600,
    bold: 700
};

export default function useChart(options) {
    const LABEL_TOTAL = {
        show: true,
        label: 'Total',
        color: grey[600],
        fontSize: fontSize.base[0],
        lineHeight: fontSize.base[1].lineHeight,
        fontWeight: fontWeight.semibold
    };

    const LABEL_VALUE = {
        offsetY: 8,
        color: grey[800],
        fontSize: fontSize['2xl'][0],
        lineHeight: fontSize['2xl'][1].lineHeight,
        fontWeight: fontWeight.bold
    };

    const baseOptions = {
        // Colors
        colors: [
            '#3F51B5', // primary color
            '#FFC107', // warning color
            '#2196F3', // info color
            '#F44336', // danger color
            '#4CAF50' // success color
        ],

        // Chart
        chart: {
            toolbar: { show: false },
            zoom: { enabled: false },
            foreColor: grey[500],
            fontFamily: 'Roboto, sans-serif' // Thay đổi font nếu cần
        },

        // States
        states: {
            hover: {
                filter: {
                    type: 'lighten',
                    value: 0.04
                }
            },
            active: {
                filter: {
                    type: 'darken',
                    value: 0.88
                }
            }
        },

        // Fill
        fill: {
            opacity: 1,
            gradient: {
                type: 'vertical',
                shadeIntensity: 0,
                opacityFrom: 0.4,
                opacityTo: 0,
                stops: [0, 100]
            }
        },

        // Datalabels
        dataLabels: {
            enabled: false
        },

        // Stroke
        stroke: {
            width: 3,
            curve: 'smooth',
            lineCap: 'round'
        },

        // Grid
        grid: {
            strokeDashArray: 3,
            borderColor: 'rgba(145, 158, 171, 0.2)',
            xaxis: {
                lines: {
                    show: false
                }
            }
        },

        // Xaxis
        xaxis: {
            axisBorder: { show: false },
            axisTicks: { show: false }
        },

        // Markers
        markers: {
            size: 0,
            strokeColors: '#FFF'
        },

        // Tooltip
        tooltip: {
            theme: false,
            x: {
                show: true
            }
        },

        // Legend
        legend: {
            show: true,
            fontSize: 13,
            position: 'top',
            horizontalAlign: 'right',
            markers: {
                radius: 12
            },
            fontWeight: 500,
            itemMargin: {
                horizontal: 8
            },
            labels: {
                colors: '#212B36'
            }
        },

        // plotOptions
        plotOptions: {
            // Bar
            bar: {
                borderRadius: 2,
                columnWidth: '28%',
                borderRadiusApplication: 'end',
                borderRadiusWhenStacked: 'last'
            },
            // Pie + Donut
            pie: {
                donut: {
                    labels: {
                        show: true,
                        value: LABEL_VALUE,
                        total: LABEL_TOTAL
                    }
                }
            },

            // Radialbar
            radialBar: {
                track: {
                    strokeWidth: '100%',
                    background: 'rgba(145, 158, 171, 0.16)'
                },
                dataLabels: {
                    value: LABEL_VALUE,
                    total: LABEL_TOTAL
                }
            },

            // Radar
            radar: {
                polygons: {
                    fill: { colors: ['transparent'] },
                    strokeColors: grey[500],
                    connectorColors: grey[500]
                }
            },

            // polarArea
            polarArea: {
                rings: {
                    strokeColor: grey[500]
                },
                spokes: {
                    connectorColors: grey[500]
                }
            }
        },

        // Responsive
        responsive: [
            {
                // sm
                breakpoint: 640,
                options: {
                    plotOptions: { bar: { columnWidth: '40%' } }
                }
            },
            {
                // md
                breakpoint: 768,
                options: {
                    plotOptions: { bar: { columnWidth: '32%' } }
                }
            }
        ]
    };

    return merge(baseOptions, options);
}
