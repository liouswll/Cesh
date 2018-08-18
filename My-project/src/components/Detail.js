import React from 'react'
import { Progress, Form, Row, Col, Input, Button, Icon } from 'antd';
import moment from 'moment'
import dayjs from 'dayjs'
import Highcharts from 'highcharts'
import '../css/detail.css'
const FormItem = Form.Item
form.create()
class Detail extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            chartConfig: {
                credits: {
                    enabled: false
                },
                title: {
                    text: "highcharts-demo"
                },
                yAxis: {
                    title: {
                        text: "就业人数"
                    }
                },
                legend: {
                    align: "center",
                    verticalAlign: "bottom"
                },
                plotOptions: {
                    series: {
                        label: {
                            connectorAllowed: false
                        },
                        pointStart: 2010
                    }
                },
                series: [
                    {
                        name: "实施人员",
                        data: [43934, 52503, 57177, 69658, 97031, 119931, 137133, 154175]
                    },
                    {
                        name: "工人",
                        data: [24916, 24064, 29742, 29851, 32490, 30282, 38121, 40434]
                    },
                    {
                        name: "销售",
                        data: [11744, 17722, 16005, 19771, 20185, 24377, 32147, 39387]
                    },
                    {
                        name: "项目开发",
                        data: [null, null, 7988, 12169, 15112, 22452, 34400, 34227]
                    },
                    {
                        name: "其他",
                        data: [12908, 5948, 8105, 11248, 8989, 11816, 18274, 18111]
                    }
                ],
                responsive: {
                    rules: [
                        {
                            condition: {
                                maxWidth: 500
                            },
                            chartOptions: {
                                legend: {
                                    layout: "horizontal",
                                    align: "center",
                                    verticalAlign: "bottom"
                                }
                            }
                        }
                    ]
                }
            },
            info: {
                name: 'jhuang',
                age: 18
            },
            text: '',
            expand: false
        }
    }
    componentDidMount() {
        //console.log(this.props.match.params.id);
        let now = new Date().getTime();
        console.log(moment(now).format('YYYY-MM-DD HH:mm:ss'));
        console.log(dayjs(now).format('YYYY-MM-DD HH:mm:ss'));
        this.setState({
            text: moment(now).format('YYYY-MM-DD HH:mm:ss')
        })
        Highcharts.chart('container',
            this.state.chartConfig
        )
    }
    changeInfo = () => {
        // console.log(Object.keys(this.state.info));
        let data = Object.assign({}, this.state.info, { age: 20 });
        this.setState({
            info: data
        }, () => {
            console.log(this.state.info);
        })
    }
    handleSearch = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {
            console.log('Received values of form: ', values);
        });
    }

    handleReset = () => {
        this.props.form.resetFields();
    }

    toggle = () => {
        const { expand } = this.state;
        this.setState({ expand: !expand });
    }

    // To generate mock Form.Item
    getFields() {
        const count = this.state.expand ? 10 : 6;
        const { getFieldDecorator } = this.props.form;
        const children = [];
        for (let i = 0; i < 10; i++) {
            children.push(
                <Col span={8} key={i} style={{ display: i < count ? 'block' : 'none' }}>
                    <FormItem label={`Field ${i}`}>
                        {getFieldDecorator(`field-${i}`, {
                            rules: [{
                                required: true,
                                message: 'Input something!',
                            }],
                        })(
                            <Input placeholder="placeholder" />
                        )}
                    </FormItem>
                </Col>
            );
        }
        return children;
    }
    render() {
        const rawHTML = {
            __html: "<h1>非DOM属性:dangerouslySetInnerHTML标签</h1>"
        }
        return (
            <div className='detail-container'>
                <div dangerouslySetInnerHTML={rawHTML} onClick={this.changeInfo}></div>
                <div style={{ fontSize: '20px', color: 'red' }}>{this.state.text}</div>
                <div className='detail-chart'>
                    <div id="container"></div>
                </div>
                <Progress type="circle" percent={50} />
                <Form
                    className="ant-advanced-search-form"
                    onSubmit={this.handleSearch}
                >
                    <Row gutter={24}>{this.getFields()}</Row>
                    <Row>
                        <Col span={24} style={{ textAlign: 'right' }}>
                            <Button type="primary" htmlType="submit">Search</Button>
                            <Button style={{ marginLeft: 8 }} onClick={this.handleReset}>Clear</Button>
                            <a style={{ marginLeft: 8, fontSize: 12 }} onClick={this.toggle}>
                                Collapse <Icon type={this.state.expand ? 'up' : 'down'} />
                            </a>
                        </Col>
                    </Row>
                </Form>
            </div >
        )
    }
}
export default Detail