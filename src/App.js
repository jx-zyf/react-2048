import React, { Component } from 'react';
import './App.css';

import Main from './util/2048';

class App extends Component {
  constructor() {
    super()
    this.state = {
      hidden: false,
      start: "开始游戏",
      num: [],
      score: 0,
      bestScore: 0, // 最高分
      endMsg: '',
      over: false,  // 游戏是否结束 
      main: null,
    }
    this.touchStartX = 0;
    this.touchStartY = 0;
    this.touchEndX = 0;
    this.touchEndY = 0;
    this.main = null;
  }
  componentDidMount() {
    this.gameStart()
  }
  gameStart = () => {
    this.main = new Main(4);
    this.setState({
      hidden: true,
      over: false,
      score: 0,
      num: this.main.board.grid
    });
  }
  touchStart = (ev) => { // 触摸开始坐标
    var touch = ev.touches[0];
    this.touchStartX = touch.clientX;
    this.touchStartY = touch.clientY;

  }
  touchMove = (ev) => { // 触摸最后移动时的坐标
    var touch = ev.touches[0];
    this.touchEndX = touch.clientX;
    this.touchEndY = touch.clientY;
  }
  touchEnd = () => {
    var disX = this.touchStartX - this.touchEndX;
    var absdisX = Math.abs(disX);
    var disY = this.touchStartY - this.touchEndY;
    var absdisY = Math.abs(disY);

    if (this.main.isOver()) { // 游戏是否结束
      this.gameOver();
    } else {
      if (Math.max(absdisX, absdisY) > 30) { // 确定是否在滑动
        this.setState({
          start: "重新开始",
        });
        var direction = absdisX > absdisY ? (disX < 0 ? 1 : 3) : (disY < 0 ? 2 : 0);  // 确定移动方向
        var data = this.main.move(direction);
        this.updateView(data);
      }
    }
  }
  updateView = (data) => {
    var max = 0;
    for (var i = 0; i < 4; i++)
      for (var j = 0; j < 4; j++)
        if (data[i][j] !== "" && data[i][j] > max)
          max = data[i][j];
    this.setState({
      num: data,
      score: max
    });
  }
  gameOver = () => {  // 游戏结束
    this.setState({
      over: true
    });
    if (this.state.score >= 2048) {
      this.setState({
        endMsg: '恭喜达到2048！'
      });
    } else if (this.state.score > this.state.bestScore) {
      this.setState({
        endMsg: '创造新纪录！'
      });
    } else {
      this.setState({
        endMsg: '游戏结束！'
      });
    }
  }
  render() {
    const { start, num, score, bestScore, endMsg, over } = this.state;
    return (
      <div className="container">
        <div className='head'>
          <div className='lside'>
            <div className='title'>2048</div>
            <div className='play' onClick={this.gameStart}>{start}</div>
          </div>
          <div className='rside'>
            <div>score <div className='score'>{score}</div></div>
          </div>
        </div>

        <div
          className="game"
          onTouchStart={this.touchStart}
          onTouchMove={this.touchMove}
          onTouchEnd={this.touchEnd}
        >
          <div>
            {
              num.map((item, index) => {
                return <div className="row" key={index}>
                  {
                    item.map((cell, index) => {
                      return <div className="cell" key={index}>
                        <div className={`cell-con cell-con-${cell}`}>{cell}</div>
                      </div>
                    })
                  }
                </div>
              })
            }
          </div>

          <div className='game-over' hidden={!over}>
            <div className='nowScore'>历史最高分：{bestScore}</div>
            <div className='nowScore'>本次成绩：{score}</div>
            <div className='pro'>{endMsg}</div>
          </div>
        </div >
      </div>
    );
  }
}

export default App;
