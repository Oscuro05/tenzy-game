import React from "react"

export default function Die (props) {
    const styles = {
        backgroundColor: props.isHeld ? "rgb(255, 0, 119)" : ""
    }

    return (
        <div onClick={props.holdDice} style = {styles} className="die-face">
            <h2>
                {props.value}
            </h2>
        </div>
    )
}