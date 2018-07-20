// This class draws the list of achievement cards.
class AchievementCardListRender extends React.Component {

    constructor(props) {
        super(props);
    }
// FIXME: Warning: Each child in an array or iterator should have a unique "key" prop.
    render() {
        return (
            <div className="container">
                <div className="row">
                    {
                        this.props.list.map(
                            function(listValue) {
                                return <AchievementCard 
                                        icon={listValue.icon}
                                        title={listValue.title}
                                        details={listValue.details}
                                        goal={listValue.goal}
                                        count={listValue.count} />
                            }
                        )
                    }
                </div>
            </div>
        );
    }
    
}

// Show the Achievements
function showAchievements() {
    // Render all achievements listed in lstAchievementCardWrappers
    ReactDOM.render(
            <AchievementCardListRender list={lstAchievementCardWrappers} />, 
            document.getElementById('achievementList'));
}