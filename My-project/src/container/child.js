import React from 'react'
import { Radio } from 'antd';
const RadioGroup = Radio.Group;
class Children extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            text: props.text,
            value: 1
        }
    }
    componentDidMount() {
        //console.log(this.props.text);
    }
    componentWillUnmount() {

    }
    toParent = () => {
        this.props.sendParent(this.state.text);
    }
    onChange = (e) => {
        console.log('radio-checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    render() {
        return (
            <div>
                <div style={{ fontSize: '20px', marginTop: '20px', fontWeight: 'bold', cursor: 'pointer' }} onClick={this.toParent}>{this.state.text}</div>
                <RadioGroup onChange={this.onChange} value={this.state.value}>
                    <Radio value={1}>A</Radio>
                    <Radio value={2}>B</Radio>
                    <Radio value={3}>C</Radio>
                    <Radio value={4}>D</Radio>
                </RadioGroup>
            </div>

        )
    }
}
export default Children