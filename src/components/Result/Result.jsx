import React, { Component } from 'react'
import {Container, Row, Button} from 'react-bootstrap'

export default class Result extends Component {
    state={
        data:[],
        questions:null,
    }

    fetchSingleProduct=async()=>{   
        try {
          let response = await fetch(`http://localhost:3001/exams/${this.props.match.params.id}`)
          if (response.ok) {
            let data = await response.json()
            this.setState({data})
            let questions=this.state.data.questions.length
            this.setState({questions})
          } else {
            alert("an error accurred")
          }
        } catch (err) {
          console.log(err);
        }
      }
      componentDidMount(){
          this.fetchSingleProduct()
      }
    render() {
        return (
            <Container>
                <Row className="mt-5 pt-5 d-flex justify-content-center align-items-center text-center">
                    <div className="d-block mt-5 pt-5">
                    <h1 className="text-white font-weight-bold" style={{fontSize: "60px"}}>{this.state.data.name}, your score is: </h1>
                    <h1 className="text-white" style={{fontSize:"50px"}}>{this.state.data && this.state.data.currentScore}<span style={{color: "#14ee00"}}>/{this.state.questions}</span></h1>
                    <Button className="start-exam-button mt-5" style={{width:"150px"}} onClick={()=>this.props.history.push('/')}>Try Again</Button>
                    </div>
                </Row>
            </Container>
        )
    }
}
