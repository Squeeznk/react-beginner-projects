import React from "react";


function KanbanCard({
    textLabel1,
    textLabel2,
    notificationNumber1,
    notificationNumber2,
    notificationNumber3,
    address,
    ellipse1,
    ellipse2,
    dateProps,
}){

    return (
        <div className="kanban-card">
            <p className="text_label"> 
                {textLabel1}
            </p>
            <p className="text_label-1">
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
              <div className="frame-5806794">
                <img className="vector" src="vector.svg" alt="Vector" /> 
                <div className="notification-
                    number valign-text-bottom roboto-semi-bold-
                    manatee-9px">
                    {notificationNumber1}
              </div>
            </div>
            <div className="frame-5806794">
                <img className="vector-1" src="vector-5.svg" alt="Vector" />
                <div className="notification-number valign-text-bottom roboto-semi-bold-manatee-9px">
                    {notificationNumber2}
                </div>
            </div>
            <div className="frame-5806794">
                <img className="vector-2" src="vector-2.svg" alt="Vector" />
                <div className="notification-
                number valign-text-bottom roboto-semi-bold-
                manatee-9px">
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
            <Date />
            <Date className="date-2"/>
            <div className="date"> 
                <div className="address">
                    {address}
                </div>
            </div>
            <div className="members">
                <img className="ellipse-1" src={ellipse1} alt="Ellipse 1" /> 
                <img className="ellipse-2" src={ellipse2} alt="Ellipse 2" />
            </div>
        </footer>
    </div>
    )
}

function Date(props){
    const {className} = props;
    return (
        <div className={`date-1 ${className || ""}` }>
            <div className="address-1 roboto- medium-nevada-9px">
                23 фев.
            </div>
        </div>
    );
}

export default KanbanCard;
