import React from 'react';
import './index.scss';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './react-buttons.css';
import { Button } from '@trendmicro/react-buttons';
import KanbanCard from './KanbanCard.js';

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `Задача ${k + offset}`
  }));

const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list);
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed);

  return result;
};

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source);
  const destClone = Array.from(destination);
  const [removed] = sourceClone.splice(droppableSource.index, 1);

  destClone.splice(droppableDestination.index, 0, removed);

  const result = {};
  result[droppableSource.droppableId] = sourceClone;
  result[droppableDestination.droppableId] = destClone;

  return result;
};
const grid = 18;

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "#E3E6EF" : "#F6F7FA",
  padding: grid,
  width: 300
});

function getStyle(style, snapshot) {
  if (!snapshot.isDropAnimating) {
    return {
      ...style,
      background: snapshot.isDragging ? "lightgreen" : "#FFFFFF",
      userSelect: "none",
      padding: grid,
      margin: `0 0 ${grid}px 0`,
      gap: 10,
      width: 275,
      height: 180,
      'box-shadow': '1px 2px 8px rgba(0, 0, 0, 0.06)',
      'border-radius': '10px',
    }
  }

  const { moveTo, curve, duration } = snapshot.dropAnimation;
  // move to the right spot
  const translate = `translate(${moveTo.x}px, ${moveTo.y}px)`;
  // add a bit of turn for fun
  //const rotate = 'rotate(1turn)';

  // patching the existing style
  return {
    ...style,
    background: '#EBE7FF',
    userSelect: "none",
    padding: grid,
    margin: `0 0 ${grid}px 0`,
    gap: 10,
    width: 275,
    height: 180,
    'box-shadow': '1px 2px 8px rgba(0, 0, 0, 0.06)',
    'border-radius': '10px',
    //transform: `${translate} ${rotate}`,
    transform: `${translate}`,
    // slowing down the drop because we can
    transition: `all ${curve} ${duration+0.3}s`,
  };
}

function App() {
  //const [state, setState] = React.useState([getItems(3), getItems(5, 3)]);
  const [state, setState] = React.useState([getItems(3),getItems(5,4)]);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter(group => group.length));
    }
  }

  const printState = () => {
    console.log(state);
  }

  const addTask = ([key]) => {
    const ar = Array.from(state);
    ar[key] = [ {
      id:`item-${key}-${new Date().getTime()}`,
      content: `item-${key}-${new Date().getTime()}`
    },
    ...ar[key]];
    setState(ar);
  }


  const kanbanCardData = {
    textLabel1: "Доработки отчёта по срокампросрочки КРІ", 
    textLabel2: "Отчёт по срокам и типам заданий для исполнения KPI (АК)", 
    notificationNumber1: "20/20", 
    notificationNumber2: "20", 
    notificationNumber3: "20 / 2", 
    address: "23 фев.", 
    ellipse1: "./ellipse-1.png", 
    ellipse2: "./ellipse-2.png", 
  };

  return (
    <div>
      <Button btnStyle="primary" type="button" onClick={() => {setState([...state, []]);}}>
        Добавить колонку
      </Button>
      <Button btnStyle="primary" type="button" onClick={() => {setState([...state, getItems(1)]);}}>
        Добавить задачу
      </Button>
      <Button btnStyle="primary" type="button" onClick={printState}>
        Показать state
      </Button>


      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`}>
              {(provided, snapshot) => (
                <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
                 <Button btnStyle="primary" type="button" onClick={() => (addTask([ind]))}>
                   +
                 </Button> 
                 <KanbanCard {kanbanCardData}/>
                 {el.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={getStyle(provided.draggableProps.style, snapshot)}
                        >
                          <div style={{display: "flex", gap:10, "flex-direction": "column", "align-items": "flex-start"}}>
                            <div className="card-head">
                              Доработки отчёта по срокам просрочки KPI
                            </div>
                            <div className="card-content">
                            {item.content} - При создании списка выполненных работ необходимо добавить, чтобы учитывалась доска проекта 
                            </div>
                            <div className="tags-container">
                              <div className="tag" style={{ "background-color": "#FED5E3"}}></div>
                              <div className="tag" style={{ "background-color": "#EBE7FF"}}></div>
                              <div className="tag" style={{ "background-color": "#DAF8E7"}}></div>
                              <div className="tag" style={{ "background-color": "#D8F1FF"}}></div>
                              <div className="tag" style={{ "background-color": "#B9EFFF"}}></div>
                            </div>
                            <div style={{flex: "none", "align-self": "stretch", "flex-grow": 0}}>
                            <Button btnStyle="danger" 
                              type="button"
                              onClick={() => {
                                const newState = [...state];
                                newState[ind].splice(index, 1);
                                setState(
                                  newState.filter(group => group.length)
                                );
                              }}
                            >
                              Удалить
                            </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
    </div>
  );
}


export default App;
