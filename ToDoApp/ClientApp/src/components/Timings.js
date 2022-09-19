import React, { Component } from 'react';
import PropTypes from 'prop-types';
import com from '../assets/com.jpg'
import l1 from '../assets/1.png'
import l2 from '../assets/2.jpg'
import l3 from '../assets/3.png'
import l4 from '../assets/4.png'
import l5 from '../assets/5.png'
import start from '../assets/start.jpg'
import stop from '../assets/stop.jpg'
import printB from '../assets/printB.png'
import reset from '../assets/reset.jpg'
import printC from '../assets/printC.png'

class Timings extends Component {
    constructor(props) {
        super(props);
        this.state = {
            com1Start : false,com1PrintB : 0, name1: '',
            com2Start : false,com2PrintB : 0, name2: '',
            com3Start : false,com3PrintB : 0,name3: '',
            com4Start : false,com4PrintB : 0,name4: '',
            com5Start : false,com5PrintB : 0,name5: '',
            com1Time : '',
            com2Time : '',
            com3Time : '',
            com4Time : '',
            com5Time : '',
            time: {}, 
            seconds: 0,
            timer : 0,            
            time1: {}, 
            timer1:0,
            seconds1:0,
            time2: {}, 
            timer2:0,
            seconds2:0,
            time3: {}, 
            timer3:0,
            seconds3:0,
            time4: {}, 
            timer4:0,
            seconds4:0,
            time5: {}, 
            timer5:0,
            seconds5:0
        };
    this.startTimer = this.startTimer.bind(this);
    this.countDown = this.countDown.bind(this);
    this.countDown2 = this.countDown2.bind(this);
    this.countDown3 = this.countDown3.bind(this);
    this.countDown4 = this.countDown4.bind(this);
    this.countDown5 = this.countDown5.bind(this);
    }

    startTimer(id) {       
        switch(id){
            case '1c':
                   if(this.state.timer == 0) {
                        this.state.timer = setInterval(this.countDown, 1000);
                        document.getElementById("stop1").src = stop
                    }
                    return
            case '2c' :
                    if (this.state.timer2 == 0) {
                        this.state.timer2 = setInterval(this.countDown2, 1000);
                        document.getElementById("stop2").src = stop
                    }   
                    return
          case '3c' :
                        if (this.state.timer3 == 0) {
                            this.state.timer3 = setInterval(this.countDown3, 1000);
                            document.getElementById("stop3").src = stop
                        }   
                        return
        case '4c' :
            if (this.state.timer4 == 0) {
                this.state.timer4 = setInterval(this.countDown4, 1000);
                document.getElementById("stop4").src = stop
            }   
            return       
        case '5c' :
            if (this.state.timer5 == 0) {
                this.state.timer5 = setInterval(this.countDown5, 1000);
                document.getElementById("stop5").src = stop
            }   
            return      
            default :
            return
        }       
      }
      stopCom(id) {       
        switch(id){
            case '1c':
                clearInterval(this.state.timer);
                if(!this.state.com1Start){
                    this.setState({
                        com1Start : false,
                        timer : 0, 
                        time : {},
                        seconds : 0, name1 : '', com1PrintB : 0
                    })
                    document.getElementById("stop1").src = stop
                }
                else 
               { this.setState({
                    com1Start : false,
                    timer : 0
                });
                document.getElementById("stop1").src = reset
            }
                    return
            case '2c' :
                clearInterval(this.state.timer2);
                if(!this.state.com2Start){
                    this.setState({
                        com2Start : false,
                        timer2 : 0, 
                        time2 : {},
                        seconds2 : 0, name2 : '', com2PrintB : 0
                    })
                    document.getElementById("stop2").src = stop
                }
                else {
                this.setState({
                    com2Start : false,
                    timer2 : 0
                })
                       document.getElementById("stop2").src = reset
                   }
             return
             case '3c' :
                        clearInterval(this.state.timer3);
                        if(!this.state.com3Start){
                            this.setState({
                                com3Start : false,
                                timer3 : 0, 
                                time3 : {},
                                seconds3 : 0, name3 : '', com3PrintB : 0
                            })
                            document.getElementById("stop3").src = stop
                        }
                        else 
                        {
                        this.setState({
                            com3Start : false,
                            timer3 : 0
                        })
                         document.getElementById("stop3").src = reset
                    }

                            return
            case '4c' :
                clearInterval(this.state.timer4);
                if(!this.state.com4Start){
                    this.setState({
                        com4Start : false,
                        timer4 : 0, 
                        time4 : {},
                        seconds4 : 0, name4 : '', com4PrintB : 0
                    })
                    document.getElementById("stop4").src = stop

                }
                else 
                {

                this.setState({
                    com4Start : false,
                    timer4 : 0
                })
                    document.getElementById("stop4").src = reset
            }
            return
            case '5c' :
                clearInterval(this.state.timer5);
                if(!this.state.com5Start){
                    this.setState({
                        com5Start : false,
                        timer5 : 0, 
                        time5 : {},
                        seconds5 : 0, name5 : '', com5PrintB : 0
                    })
                    document.getElementById("stop5").src = stop

                }
                else 
                {

                this.setState({
                    com5Start : false,
                    timer5 : 0
                })
               document.getElementById("stop5").src = reset
            }
            return
            default :
            return
        }       
      }
      countDown() {
        let seconds = this.state.seconds + 1;
        this.setState({
          time: this.secondsToTime(seconds),
          seconds: seconds,
          com1Start : true
        });
        console.log(this.state.time)
        console.log(this.state.seconds)
        if (seconds == 0) {
          clearInterval(this.state.timer);
        }
      }
     
      countDown2() {
        let seconds2 = this.state.seconds2 + 1;
        this.setState({
          time2: this.secondsToTime(seconds2),
          seconds2: seconds2,
          com2Start : true
        });
        if (seconds2 == 0) { 
          clearInterval(this.state.timer2);
        }
      }
      countDown3() {
        let seconds3 = this.state.seconds3 + 1;
        this.setState({
          time3: this.secondsToTime(seconds3),
          seconds3: seconds3,
          com3Start : true
        });
        if (seconds3 == 0) { 
          clearInterval(this.state.timer3);
        }
      }
      countDown4() {
        let seconds4 = this.state.seconds4 + 1;
        this.setState({
          time4: this.secondsToTime(seconds4),
          seconds4: seconds4,
          com4Start : true
        });
        if (seconds4 == 0) { 
          clearInterval(this.state.timer4);
        }
      }
      countDown5() {
        let seconds5 = this.state.seconds5 + 1;
        this.setState({
          time5: this.secondsToTime(seconds5),
          seconds5: seconds5,
          com5Start : true
        });
        if (seconds5 == 0) { 
          clearInterval(this.state.timer5);
        }
      }
      secondsToTime(secs){
        let hours = Math.floor(secs / (60 * 60));
        if(hours.toString().length == 1){
            hours = '0' + hours
        }
        let divisor_for_minutes = secs % (60 * 60);
        let minutes = Math.floor(divisor_for_minutes / 60);
        if(minutes.toString().length == 1){
            minutes = '0' + minutes
        }
        let divisor_for_seconds = divisor_for_minutes % 60;
        let seconds = Math.ceil(divisor_for_seconds);
        if(seconds.toString().length == 1){
            seconds = '0' + seconds
        }
        let obj = {
          "h": hours,
          "m": minutes,
          "s": seconds
        };
        return obj;
      }
   
    addPrintB(id) {
        switch(id){
            case '1c':
                this.setState({
                    com1PrintB : this.state.com1PrintB + 1 
                })
                    return
            case '2c' :
                this.setState({
                    com2PrintB : this.state.com2PrintB + 1 
                })
                    return
            case '3c' :
                this.setState({
                    com3PrintB : this.state.com3PrintB + 1 
                })
                return
            case '4c' :
                this.setState({
                    com4PrintB : this.state.com4PrintB + 1 
                })
                return
            case '5c' :
                this.setState({
                    com5PrintB : this.state.com5PrintB + 1 
                })
                return
            default :
            return
        }       
     }
     changeHandler = (e) =>{
         this.setState({[e.target.name] : e.target.value})
     }
   
    render() {
        return (
            <div id="timingsMainDiv">
                    <div id="1c">
                        <div>
                            <img onClick={() => this.startTimer("1c")} src={start} className="startStop" alt='start' />
                            <div className="startTime">    {this.state.time.h}    : {this.state.time.m}  : {this.state.time.s} </div>
                            <img onClick={() => this.stopCom("1c")} src={stop} className="startStop" alt='stop' id="stop1" />
                          </div>
                       <div style={{display:'inline-block',marginTop:'11px'}}> <img onClick={() => this.addPrintB("1c")} src={printB} className="startStop" alt='stop' /> </div>
                         <div style={{fontSize:'22px',display:'inline-block'}}>Prints : {this.state.com1PrintB}</div>
                         <div><input  onChange={this.changeHandler} name='name1' value={this.state.name1} type="text"></input></div>  
                        <img src={com} className="computer" alt='computer' />
                        <img src={l1} className="l2" alt='1' />
                       
                    </div>
                    <div id="2c">
                         <div>
                            <img onClick={() => this.startTimer("2c")} src={start} className="startStop" alt='start'  />
                            <div className="startTime"> {this.state.time2.h} : {this.state.time2.m}  : {this.state.time2.s} </div>
                            <img onClick={() => this.stopCom("2c")} src={stop} className="startStop" alt='stop'  id="stop2"/>
                        </div>
                        <div style={{display:'inline-block',marginTop:'11px'}}> <img onClick={() => this.addPrintB("2c")} src={printB} className="startStop" alt='stop' /> </div>
                         <div style={{fontSize:'22px',display:'inline-block'}}>Prints : {this.state.com2PrintB}</div>
                         <div><input  onChange={this.changeHandler} name='name2' value={this.state.name2} type="text"></input></div>  
                        <img src={com} className="computer" alt='computer' />
                        <img src={l2} className="l2" alt='2' />
                    </div>

                    <div id="3c">
                        <div>
                            <img onClick={() => this.startTimer("3c")} src={start} className="startStop" alt='start' />
                            <div className="startTime"> {this.state.time3.h} : {this.state.time3.m}  : {this.state.time3.s} </div>
                            <img  onClick={() => this.stopCom("3c")} src={stop} className="startStop" alt='stop'  id="stop3"/>
                        </div>
                        <div style={{display:'inline-block',marginTop:'11px'}}> <img onClick={() => this.addPrintB("3c")} src={printB} className="startStop" alt='print' /> </div>
                         <div style={{fontSize:'22px',display:'inline-block'}}>Prints : {this.state.com3PrintB}</div>
                         <div><input  onChange={this.changeHandler} name='name3' value={this.state.name3} type="text"></input></div>  
                        <img src={com} className="computer" alt='computer' />
                        <img src={l3} className="l2" alt='3' />
                    </div>

                    <div id="4c">
                        <div>
                            <img onClick={() => this.startTimer("4c")} src={start} className="startStop" alt='start' />
                            <div className="startTime"> {this.state.time4.h} : {this.state.time4.m}  : {this.state.time4.s} </div>
                            <img  onClick={() => this.stopCom("4c")} src={stop} className="startStop" alt='stop'  id="stop4"/>
                        </div>
                        <div style={{display:'inline-block',marginTop:'11px'}}> <img onClick={() => this.addPrintB("4c")} src={printB} className="startStop" alt='print' /> </div>
                         <div style={{fontSize:'22px',display:'inline-block'}}>Prints : {this.state.com4PrintB}</div>
                         <div><input  onChange={this.changeHandler} name='name4' value={this.state.name4} type="text"></input></div>  
                        <img src={com} className="computer" alt='computer' />
                        <img src={l4} className="l2" alt='4' />
                    </div>

                    <div id="5c">
                        <div>
                            <img onClick={() => this.startTimer("5c")} src={start} className="startStop" alt='start' />
                            <div className="startTime"> {this.state.time5.h} : {this.state.time5.m}  : {this.state.time5.s} </div>
                            <img  onClick={() => this.stopCom("5c")} src={stop} className="startStop" alt='stop'  id="stop5"/>
                        </div>
                        <div style={{display:'inline-block',marginTop:'11px'}}> <img onClick={() => this.addPrintB("5c")} src={printB} className="startStop" alt='print' /> </div>
                         <div style={{fontSize:'22px',display:'inline-block'}}>Prints : {this.state.com5PrintB}</div>
                         <div><input  onChange={this.changeHandler} name='name5' value={this.state.name5} type="text"></input></div>  
                        <img src={com} className="computer" alt='computer' />
                        <img src={l5} className="l2" alt='5' />
                    </div>
            </div>
        );
    }
}

Timings.propTypes = {

};

export default Timings;