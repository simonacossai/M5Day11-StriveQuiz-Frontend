import React, { Component } from 'react'
import { Container, Row, Col, Button} from 'react-bootstrap';
import './Answers.css';

export default class ProductList extends Component {
    state = {
        answer:{
        answer: 0,
        question: 0,
      },
      exam:"",
      seconds: null,
     user:{
        name: JSON.parse(localStorage.getItem('name')),
        email:JSON.parse(localStorage.getItem('email')),
     },
     selected: false,
     active_index: null,
    }

    componentDidMount() {
        this.myInterval = setInterval(() => {
            const seconds = this.state.seconds
            if (seconds > 0) {
                this.setState(({seconds}) => ({
                    seconds: seconds - 1
                }))
            }
        }, 1000)
    }

  
    componentWillUnmount() {
        clearInterval(this.myInterval)
    }

   sendAnswer = async () => {
     const answer={
         "answer": 0,
         "question": this.state.answer.question
     }
        try {
            let response = await fetch(`http://localhost:3001/exams/${this.state.exam._id}/answer`,
            {
                method: 'POST',
                body: JSON.stringify(this.state.active_index!=null ? this.state.answer : answer ),
                headers: new Headers({
                    "Content-Type": "application/json"
                })
            })
            if (response.ok) {
                console.log("ok")
                {this.state.exam && this.setState({seconds: this.state.exam.questions[this.state.answer.question].duration})}
            } else {
                console.log("ok")
                {this.state.exam && this.setState({seconds: this.state.exam.questions[this.state.answer.question].duration})}
            }
        } catch (err) {
            console.log(err);
            alert(err)
        }
        if(this.state.answer.question!=this.state.exam.questions.length-1){
        this.setState({answer:{question: this.state.answer.question + 1}, active_index: null})
        }else{
            this.props.history.push('/result/'+ this.state.exam._id)
            console.log(this.state.exam._id)
        }
    }
    
    handleSelect= async(index)=>{
            this.setState({active_index: index})
            this.setState({selected:true})
            await this.setState({
                answer:{
                    answer: index,
                    question: this.state.answer.question,
                }
            })
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
                this.setState({seconds: this.state.exam.questions[this.state.answer.question].duration})
                console.log(exam)
            } else {
                alert("an error accourred")
            }
        } catch (err) {
            console.log(err);
        }
    }
   
    render() {
        const { seconds } = this.state
        return (
            <>
            {!this.state.exam ? 
            <Button className="start-exam-button" style={{marginTop:"300px"}} onClick={this.startExam}>Start the exam</Button>
            :          
            <Container>           
                { seconds === 0
                    ? this.sendAnswer() && <h1>time's up</h1>
                    : <h1 className="text-white">Time Remaining: 00:{seconds < 10 ? `0${seconds}` : seconds}</h1>   
                }
                <p className="px-5 mt-4 text-white">{this.state.exam.questions[this.state.answer.question].text}</p>
                   <Row className="d-flex"> 
                      {this.state.exam.questions[this.state.answer.question].answers.map((e, index)=>
                       <Col md={6} lg={6} >
                       <div className={this.state.selected && this.state.active_index===index ? "answer-selected-div" : "answer-div"}  onClick={()=>this.handleSelect(index)}>
                           <span>{e.text}</span>
                       </div>
                   </Col>)}
                   </Row>
                   <Button className="start-exam-button mt-5" style={{width:"150px"}} onClick={()=>this.sendAnswer()}>Next</Button>
            </Container>
}
            </>
        )
    }
}

