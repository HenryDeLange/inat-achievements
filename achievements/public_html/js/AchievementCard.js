// Declare the AchievementCard
function AchievementCard(props) {
    var cardHTML =
        <div className="col-6 col-sm-4 col-md-3 col-lg-2">
            <div className="card text-center border-0" style={{"margin": "2rem"}}>
                <span className={props.icon} style={{"color": "#Bcb371", "fontSize": "6rem"}} ></span>
                <div className="card-text">{props.title}</div>
            </div>
        </div>
    return cardHTML;
}