// This class draws the individual achievement cards.
class AchievementCard extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
// TODO: Fix the alignment of the icons when using "fontSize": "6rem"
        return (
            <div className="col-6 col-sm-4 col-md-3 col-lg-2">
                <div className="card text-center border-0" style={{"margin": "2rem"}}>
                    <a tabIndex="0" data-toggle="popover" data-trigger="focus" 
                        className={this.props.icon + " btn text-center"} role="button" 
                        style={{"color": this.props.color, "fontSize": "5.25rem"}}
                        title="Achievement Details" 
                        data-content={this.props.details} />
                    <h6 className="card-title" style={{"color": this.props.color}}>
                        {this.props.title}
                    </h6>
                    <div className="card-text" style={{"color": this.props.color}}>
                        <small>{"(" + this.props.count + " of " + this.props.goal + ")"}</small>
                    </div>
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
