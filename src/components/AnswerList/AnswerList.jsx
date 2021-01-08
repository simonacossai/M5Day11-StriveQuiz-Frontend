import React, { Component } from 'react'
import { Container, Row, Col, Button} from 'react-bootstrap';
import './Answers.css';

export default class ProductList extends Component {
    state = {
        answer:{
        answer: 0,
        question: 0,
      },
      minutes: 0,
      exam:"",
      seconds: 7,
     user:{
        name: JSON.parse(localStorage.getItem('name')),
        email:JSON.parse(localStorage.getItem('email')),
     },
     selected: false,
     active_index: null,
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const { seconds, minutes } = this.state

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }))
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval)
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }))
                }
            } 
        }, 1000)
    }

    componentWillUnmount() {
        clearInterval(this.myInterval)
    }


 
   sendAnswer = async (index) => {
    this.setState({active_index: index})
    this.setState({selected:true})
            await this.setState({
            answer:{
                answer: index,
                question: this.state.answer.question,
            }
        })
        try {
            let response = await fetch(`http://localhost:3001/exams/${this.state.exam._id}/answer`,
            {
                method: 'POST',
                body: JSON.stringify(this.state.answer),
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            if (response.ok) {
                console.log("ok")
               //if response.json === true fallo verde
               //else (false) coloralo di rosso
               //anche se in realtà a te serve solo cambiare colore magari in uno più scuro perchè così era quello di strive 
            } else {
                alert("è esploso tutto")
            }
        } catch (err) {
            console.log(err);
            alert(err)
        }
    }


    startExam = async (e) => {
        e.preventDefault();
        try {
            let response = await fetch(`http://localhost:3001/exams/start`,
            {
                method: 'POST',
                body: JSON.stringify(this.state.user),
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            if (response.ok) {
                console.log(this.state.user)
                let exam = await response.json()
                this.setState({exam})
                console.log(exam)
            } else {
                alert("an error accourred")
            }
        } catch (err) {
            console.log(err);
        }
    }

    render() {
        const { minutes, seconds } = this.state
        return (
            <>
            {!this.state.exam ? 
            <Button className="start-exam-button" style={{marginTop:"300px"}} onClick={this.startExam}>Start the exam</Button>
            :          
            <Container>           
                { /*minutes === 0 && seconds === 0
                    ? //nextQuestion() console.log("time's up")
                    : <h1 className="text-white">Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}</h1>
                    */     
                }
                <p className="px-5 mt-4 text-white">{this.state.exam.questions[this.state.answer.question].text}</p>
                   <Row className="d-flex"> 
                      {this.state.exam.questions[this.state.answer.question].answers.map((e, index)=>
                       <Col md={6} lg={6} >
                       <div className={this.state.selected && this.state.active_index===index ? "answer-selected-div" : "answer-div"}  onClick={()=>this.sendAnswer(index)}>
                           <span>{e.text}</span>
                       </div>
                   </Col>)}
                   </Row>
                   <Button className="start-exam-button mt-5" style={{width:"150px"}} onClick={()=>this.setState({answer:{question: this.state.answer.question + 1}, active_index: null})}>Next</Button>
            </Container>
}
            </>
        )
    }
}

/*
 {
     this.state.answers.map((answer, index) =>
                            <div onClick={this.addCart} key={index}>
                                <p>{answer}</p>
                            </div>
                        )
                    }
*/