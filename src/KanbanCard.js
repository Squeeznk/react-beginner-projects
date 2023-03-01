import React from "react";


function KanbanCard({
    style,
    textLabel1,
    textLabel2,
    notificationNumber1,
    notificationNumber2,
    notificationNumber3,
    address,
    ellipse1,
    ellipse2,
}) {

    return (
        <div className="kanban-card" style={style}>
            <p className="text_header"> 
                {textLabel1}
            </p>
            <p className="text_content">
                {textLabel2}
            </p>
            <div className="tags">
                <div className="rectangle-44"></div>
                <div className="rectangle-45"></div>
                <div className="rectangle-46"></div>
                <div className="rectangle-47"></div>
                <div className="rectangle-48"></div>
            </div>
            <div className="informers">
              <div className="icon-informer">
                <img src="vector.svg" alt="Vector" /> 
                <div className="notification-number">
                    {notificationNumber1}
              </div>
            </div>
            <div className="icon-informer">
                <img src="vector-5.svg" alt="Vector" />
                <div className="notification-number">
                    {notificationNumber2}
                </div>
            </div>
            <div className="icon-informer">
                <img src="vector-2.svg" alt="Vector" />
                <div className="notification-number">
                    {notificationNumber3}
                </div>
            </div>
            <div className="frame-580679481">
                <div className="frame-580679477"> 
                    <div className="ellipse-1-1"></div>
                    <div className="ellipse-1-1"></div>
                    <div className="ellipse-1-1"></div>
                    <div className="ellipse-1-2"></div>
                    <div className="ellipse-1-2"></div>
                </div>
            </div>
        </div>

        <footer className="footer">
            <Date className="starting" content={address}/>
            <Date className="ending" content={address}/>
            <Date className="deadline" content={address}/>

            <div className="members">
                <img className="ellipse-1" src={ellipse1} alt="Ellipse 1" /> 
                <img className="ellipse-2" src={ellipse2} alt="Ellipse 2" />
            </div>
        </footer>
    </div>
    )
}

function Date(props){
    const {className, content} = props;
    return (
        <div className={`date-badge ${className || ""}` }>
            <div className="badge_text --font-family-roboto --font-size-xs">
                {content}
            </div>
        </div>
    );
}

export default KanbanCard;
