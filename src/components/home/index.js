import React, { Component } from 'react';
import Logo from './chat.svg';
import Sentiment from 'sentiment';
import Weird from './weird.svg';
import emo_n_1 from './-1.svg';
import emo_n_2 from './-2.svg';
import emo_n_3 from './-3.svg';
import emo_n_4 from './-4.svg';
import emo_p_1 from './+1.svg';
import emo_p_2 from './+2.svg';
import emo_p_3 from './+3.svg';
import emo_p_4 from './+4.svg';


class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputText: '',
            score: 0,
            comparative: 0,
            tokens: [],
            words: [],
            positive: [],
            negative: []
        };
    }

    onChangeText = (event) => {
        this.setState({
            inputText: event.target.value
        }, () => {
            this.textAnalyze(this.state.inputText);
        });
    };

    textAnalyze = (text) => {
        const sentiment = new Sentiment();
        this.setState({
            score: sentiment.analyze(text).score,
            comparative: sentiment.analyze(text).comparative,
            tokens: sentiment.analyze(text).tokens,
            words: sentiment.analyze(text).words,
            positive: sentiment.analyze(text).positive,
            negative: sentiment.analyze(text).negative
        });
    }

    emoticonFace = (score) => {
        if (score === 0) {
            return (
                <img src={Weird} width="80" height="80" alt="Emoticon" />
            )
        } else {
            if (score >= 4) { return (<img src={emo_p_4} width="80" height="80" alt="Emoticon" />) }
            else if (score === 3) { return (<img src={emo_p_3} width="80" height="80" alt="Emoticon" />) }
            else if (score === 2) { return (<img src={emo_p_2} width="80" height="80" alt="Emoticon" />) }
            else if (score === 1) { return (<img src={emo_p_1} width="80" height="80" alt="Emoticon" />) }
            else if (score <= -4) { return (<img src={emo_n_4} width="80" height="80" alt="Emoticon" />) }
            else if (score === -3) { return (<img src={emo_n_3} width="80" height="80" alt="Emoticon" />) }
            else if (score === -2) { return (<img src={emo_n_2} width="80" height="80" alt="Emoticon" />) }
            else if (score === -1) { return (<img src={emo_n_1} width="80" height="80" alt="Emoticon" />) }
        }
    }
    
    render() {
        let displayResult;
        if (this.state.inputText !== '') {
            displayResult = (
                <div className="container-fluid">
                    <div className = "text-center" style={{paddingTop: '20px'}}>
                        <hr />
                        {this.emoticonFace(this.state.score)}
                    </div>
                    <div className = "text-left" style={{paddingTop: '20px'}}>
                        <hr />
                        <p>Verdict: {this.state.score === 0 ? <b>Neutral</b> : this.state.score < 0 ? <b style={{color: 'red'}}>Negative</b> : <b style={{color: 'green'}}>Positive</b>}</p>
                        <p>Score: {this.state.score === 0 ? <b>{this.state.score}</b> : this.state.score < 0 ? <b style={{color: 'red'}}>{this.state.score}</b> : <b style={{color: 'green'}}>{this.state.score}</b>}</p>
                        <p>Comparative: {this.state.comparative === 0 ? <b>{this.state.comparative}</b> : this.state.comparative < 0 ? <b style={{color: 'red'}}>{this.state.comparative}</b> : <b style={{color: 'green'}}>{this.state.comparative}</b>}</p>
                        <p>Positive: 
                            {this.state.positive.map((item, i) => {
                                return (
                                    <b style={{color: 'green'}} key={i}> {item}{i < this.state.positive.length - 1 ? ',' : ''}</b>
                                )
                            })}
                        </p>
                        <p>Negative:
                            {this.state.negative.map((item, i) => {
                                return (
                                    <b style={{color: 'red'}} key={i}> {item}{i < this.state.negative.length - 1 ? ',' : ''}</b>
                                )
                            })}
                        </p>
                    </div>
                </div>
            );
        }
        return (
            <div className="container" style={{paddingTop: '60px', paddingBottom: '60px'}}>
                <div className="container-fluid">
                    <div className="text-center" style={{paddingTop: '20px'}}>
                        <img src={Logo} width="150" height="150" alt="Logo" />
                    </div>
                    <div className="text-center" style={{paddingTop: '20px'}}>
                        <form>
                            <div className="form-group">
                                <textarea className="form-control" id="textFormControlTextarea" rows="3" placeholder="Type a message ..." onChange={this.onChangeText} value={this.state.inputText}></textarea>
                            </div>
                        </form>
                    </div>       
                </div>
                { displayResult }
            </div>
        );
    }
}

export default Home;