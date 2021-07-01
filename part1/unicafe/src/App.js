import React, { useState } from 'react'

const Header = (props) => (
  <h1>{props.title}</h1>
)

const Button = (props) =>(
  <button onClick={props.handleClick}> {props.name} </button>
)

const Statistic = (props) =>(
  <tr>
    <td> {props.text} </td>
    <td> {props.value} </td>
  </tr>
)

const Statistics = (props) =>{
  const {good, neutral, bad} = props
  const all = good+neutral+bad
  const average = (good-bad)/all
  const positive = good/all*100 +'%'

  if(all>0){
    return(
      <table>
        <tbody>
          <Statistic text = "good" value ={good} />
          <Statistic text = "neutral" value ={neutral} />
          <Statistic text = "bad" value ={bad}/>
          <Statistic text = "all" value ={all}/>
          <Statistic text = "average" value ={average}/>
          <Statistic text = "positive" value ={positive}/>
        </tbody>
      </table>
    )
  }
  return(
    <div> No feedback given </div>
  )

}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const all = good+neutral+bad
  const average = (good-bad)/all
  const positive = good/all*100 +'%'


  return (
    <div>
      <Header title = "give feedback" />
      <Button handleClick = {()=> setGood(good+1)} name = "good"/>
      <Button handleClick = {()=> setNeutral(neutral+1)} name = "neutral"/>
      <Button handleClick = {()=> setBad(bad+1)} name = "bad"/>
      <Header title = "statistic" />
      <Statistics good= {good} neutral= {neutral} bad = {bad} />
    </div>
  )
}

export default App
