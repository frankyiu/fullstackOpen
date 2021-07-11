import React from 'react'

const Course = ({course}) => (
    <div>
      <Header name={course.name} />
      <Content parts= {course.parts}/>
      <Total parts = {course.parts}/>
    </div>
  )
  
  const Part = (props) =>{
    return (
      <p> {props.part.name} {props.part.exercises} </p>
    )
  }
  
  const Header = (props) =>{
    return(
      <h2>{props.name}</h2>
    )
  }
  
  const Content = ({parts}) =>{
    return(
      parts.map(part => <div><Part part = {part}/></div>)
    )
  }
  
  const Total = ({parts}) =>{
    const total = parts.map(part => part.exercises).reduce((a,b) => (a+b))
    return(
      <h4>total of {total} exercises</h4>
    )
  }

  export default Course