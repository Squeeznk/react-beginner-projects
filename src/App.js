import React from 'react';
import './index.scss';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import './react-buttons.css';
import { Button } from '@trendmicro/react-buttons';
import KanbanCard from './KanbanCard.js';

// fake data generator
const getItems = (count, offset = 0) => {
  const ar = Array.from({ length: count }, (v, k) => k).map(k => ({
    id: `item-${k + offset}-${new Date().getTime()}`,
    content: `Задача ${k + offset}`
  }));
  return ar;
};

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

const grid = 8;

const getListStyle = isDraggingOver => ({
  background: isDraggingOver ? "#E3E6EF" : "#F6F7FA",
  padding: grid,
  width: 290,
});

function getStyle( snapshot, style) {
  if (!snapshot.isDropAnimating) {
    return {
      ...style,
      background: snapshot.isDragging ? 
      "repeating-linear-gradient(-45deg, rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5) 15px, rgba(254, 213, 227, 0.5) 0, rgba(254, 213, 227, 0.5) 30px)" : 
      "#FFFFFF",
    }
  }

  // patching the existing style
  return {
    ...style,
    background: '#lightgreen',

  };
}

function App() {
  
  const [state, setState] = React.useState([]);

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

  const addTask = ([key]) => {
    const ar = Array.from(state);
    ar[key] = [ {
      id:`item-${key}-${new Date().getTime()}`,
      content: `item-${key}-${new Date().getTime()}`
    },
    ...ar[key]];
    setState(ar);
  }

  return (
    <div>
      <Button btnStyle="primary" type="button" onClick={() => {setState([...state, []]);}}>
        Добавить колонку
      </Button>
      <Button btnStyle="primary" type="button" onClick={() => {setState([...state, getItems(1)]);}}>
        Добавить задачу
      </Button>
      <Button btnStyle="primary" type="button" onClick={() => {setState([...state, getItems(100)]);}}>
        Генерировать
      </Button>


      <div style={{ display: "flex" }}>
        <DragDropContext onDragEnd={onDragEnd}>
          {state.map((el, ind) => (
            <Droppable key={ind} droppableId={`${ind}`} style="overflow: auto">
              {(provided, snapshot) => (
                <div className="card-container" ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
                 <Button btnStyle="primary" type="button" onClick={() => (addTask([ind]))}>
                   +
                 </Button> 

                 

                 {el.map((item, index) => (
                    <Draggable key={item.id} draggableId={item.id} index={index}>
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                           {/* <KanbanCard 
                              style={getStyle(snapshot)} 
                              head = "Доработки отчёта по срокам просрочки КРІ" 
                              content = '{${item.content}} Отчёт по срокам и типам заданий для исполнения KPI'
                              notificationNumber1= "20/20"  
                              notificationNumber2= "20" 
                              notificationNumber3= "20 / 2" 
                              date1= "23 фев."
                              date2= "27 фев."
                              date3= "3 мар." 
                              useravatar1= "./ellipse-1.png"  
                              useravatar2=  "./ellipse-2.png"                  
                            /> */}
                            {
                            // <Button btnStyle="danger" type="button" onClick={() => {
                            //     const newState = [...state];
                            //     newState[ind].splice(index, 1);
                            //     setState(newState.filter(group => group.length));
                            //   }}>
                            //   Удалить
                            // </Button>
                            }

                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                              padding: "32px",
                              "border-style": "dashed"
                            }}
                          >
                            {item.content}
                            <button
                              type="button"
                              onClick={() => {
                                const newState = [...state];
                                newState[ind].splice(index, 1);
                                setState(
                                  newState.filter(group => group.length)
                                );
                              }}
                            >
                              delete
                            </button>
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
