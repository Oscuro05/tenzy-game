import React from "react"
import "./App.css"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from "react-confetti"



export default function App() {



  const [dice, setDice] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

  React.useEffect(() => {
    const allHeld = dice.every(die => die.isHeld === true)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
      setTenzies(true)
      console.log("You won")
    }
  }, [dice])



  function allNewDice() {
    const newDice = []
    for (let i=0; i < 10; i++ ) {
      newDice.push({
        value: Math.ceil(Math.random() * 6),
        isHeld: false,
        id: nanoid()
      })
    }
    return newDice
  }

  function generateNewDie() {
    return{  
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

  function rollDice() {
    if (!tenzies){
      {setDice(oldDice => oldDice.map(
        die => die.isHeld ? die : generateNewDie()
      ))} 
    } else {
      setTenzies(false)
      setDice(allNewDice)
    }
  }

  function holdDice(id) {
    setDice(oldDice => oldDice.map(
      die => {
        return die.id === id ? {...die, isHeld: !die.isHeld} : die
      }
    ) 
    )
  }

  console.log(allNewDice())

  const diceElements = dice.map(die =>
    <Die 
    key = {die.id} 
    value = {die.value} 
    isHeld = {die.isHeld} 
    holdDice = {() => holdDice(die.id)} 
    />)

  return (
    <div className="screen">
    {tenzies && <Confetti width={1536} height={739} />}
    <h1 className="title">Tenzies</h1>

    <div className="main"> 
    <p className="instructions">Roll until all dice are the same. 
            Click each die to freeze it at its current value between rolls.</p>
    <div className="container">

        {diceElements}

      </div>

      <div className= "roll">
      <button onClick={rollDice} className = {tenzies ? "win" : "roll-dice"}>
        {tenzies ? "Play again" : "Roll"}
      </button>
      </div>

    </div>

    </div>
  )
}