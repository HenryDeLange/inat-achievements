// This class draws the list of achievement cards.
class AchievementCardListRender extends React.Component {

    constructor(props) {
        super(props);
    }

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
                                        count={listValue.count}
                                        color={listValue.color}
                                        key={"key" + listValue.title} />
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

// TODO: Maybe sort the list to show passed achievements first?

    // Render all achievements listed in lstAchievementCardWrappers
    ReactDOM.render(
            <AchievementCardListRender list={lstAchievementCardWrappers} />, 
            document.getElementById('achievementList'));
    // Activate the new popovers
    $(function () {
        $('[data-toggle="popover"]').popover()
    });
    $('.popover-dismiss').popover({
        trigger: 'focus'
    });
}
