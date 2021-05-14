import React, { useState } from 'react'
const Button = (props) => (
  <button onClick={props.handleClick}>
    {props.text}
  </button>
)

const Statistic = ({text, value}) =>(<nobr>{text} {value}</nobr>)


const Stats = ({good, neutral, bad}) => {
  let totalValue = good - bad
  let totalCount = good + neutral + bad
  if (totalCount === 0){
    return <p>No feedback given</p>
  }
  return (
    <div>
      <table>
        <tr>
          <td><Statistic text ="good"/></td>
          <td><Statistic value ={good}/></td>
        </tr>
        <tr>
          <td><Statistic text ="neutral"/></td>
          <td><Statistic value ={neutral}/></td>
        </tr>
        <tr>
          <td><Statistic text ="bad"/></td>
          <td><Statistic value ={bad}/></td>
        </tr>
        <tr>
          <td><Statistic text ="total"/></td>
          <td><Statistic value ={totalCount}/></td>
        </tr>
        <tr>
          <td><Statistic text ="average"/></td>
          <td><Statistic value ={totalValue/totalCount}/></td>
        </tr>
        <tr>
          <td><Statistic text ="positive"/></td>
          <td><Statistic value ={good/totalCount * 100}/> %</td>
        </tr>
      </table>
    </div>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick = {()=> setGood(good + 1)} text ="good"/>
      <Button handleClick = {()=> setNeutral(neutral + 1)} text = "neutral"/>
      <Button handleClick = {()=> setBad(bad + 1)} text = "bad"/>
      <h1>statistics</h1>
      <Stats good = {good} bad = {bad} neutral ={neutral}/>
    </div>
  )
}

export default App