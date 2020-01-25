import React from "react"
import styled from "styled-components"

// import { ReactComponent as Hamburger } from "./hamburger.svg";
// import "./App.css";

const Container = styled.div`
  margin: 10px;
  border-radius: 5px;
  width: 33%;
  color: #eee;
  display: flex;
  flex-direction: row;
`

export default class Menu extends React.Component {
  state = {
    items: [
      { id: 1, content: "🍰 Cake" },
      { id: 2, content: "🍩 Donut" },
      { id: 3, content: "🍎 Apple" },
      { id: 4, content: "🍕 Pizza" }
    ]
  }

  onDragStart = (e, index) => {
    this.draggedItem = this.state.items[index]
    e.dataTransfer.effectAllowed = "move"
    e.dataTransfer.setData("text/html", e.target.parentNode)
    e.dataTransfer.setDragImage(e.target.parentNode, 20, 20)
  }

  onDragOver = index => {
    const draggedOverItem = this.state.items[index]

    // if the item is dragged over itself, ignore
    if (this.draggedItem === draggedOverItem) {
      return
    }

    // filter out the currently dragged item
    let items = this.state.items.filter(item => item !== this.draggedItem)

    // add the dragged item after the dragged over item
    items.splice(index, 0, this.draggedItem)

    this.setState({ items })
  }

  onDragEnd = () => {
    this.draggedIdx = null
  }

  render() {
    return (
      <div className="App">
        <Container>
          <h3>List of items</h3>
          <ul>
            {this.state.items.slice(0, 2).map((item) => (
              <li key={item.id} onDragOver={() => this.onDragOver(item.id)}>
                <div
                  className="drag"
                  draggable
                  onDragStart={e => this.onDragStart(e, item.id)}
                  onDragStart={e => {
                    console.log(e, item)
                    this.onDragStart(e, item.id)}}
                  onDragEnd={this.onDragEnd}
                >
                  000
                </div>
                <span className="content">{item.content}</span>
              </li>
            ))}
          </ul>

          <ul>
            {this.state.items.slice(2, 4).map((item) => (
              <li key={item.id} onDragOver={() => this.onDragOver(item.id)}>
                <div
                  className="drag"
                  draggable
                  onDragStart={e => {
                    console.log(e, item)
                    this.onDragStart(e, item.id)}}
                  onDragEnd={this.onDragEnd}
                >
                  000
                </div>
                <span className="content">{item.content}</span>
              </li>
            ))}
          </ul>
        </Container>
        <style jsx>{`
          .App {
            font-family: sans-serif;
            font-size: 1.5rem;
            text-align: center;
            width: 100vw;
            height: 100vh;
            display: flex;
            justify-content: center;
            align-items: center;
          }

          .App main {
            background-color: #383838;
            color: #fff;
            padding: 10px;
          }

          .App ul {
            margin: 0;
            padding: 0;
            list-style: none;
          }

          .App ul li {
            background-color: #383838;
            padding: 10px 20px;
            position: relative;
            display: flex;
            align-items: flex-start;
            line-height: 1;
          }

          .App li .drag {
            margin-right: 15px;
            cursor: move;
          }

          .App li svg {
            height: 2rem;
            color: #fff;
          }
        `}</style>
      </div>
    )
  }
}
