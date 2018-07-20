// This class draws the individual achievement cards.
class AchievementCard extends React.Component {

    constructor(props) {
        super(props);
    }
// TODO: Add the details info in a popu message when clicked
// TODO: Change colour based on wether the goal was reached
    render() {
        return (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                <div className="card text-center border-0" style={{"margin": "2rem"}}>
                    <span className={this.props.icon} style={{"color": "#Bcb371", "fontSize": "6rem"}} ></span>
                    <div className="card-text">{this.props.title + " (" + this.props.count + " of " + this.props.goal + ")"}</div>
                </div>
            </div>
        );
    }
    
}

AchievementCard.defaultProps = {
   icon: "icon-template",
   title: "..TEMPLATE..",
   goal: 0,
   count: 0
}
