// Show the Achievements
function showResults() {
    ReactDOM.render(
            <div className="container">
                <div className="row">
                    <AchievementCard title={"Life Lister (" + speciesCount + ")"} 
                                     icon="icon-LifeLister" />
                    <AchievementCard title={"Self Polinator (" + selfCommentCount + ")"} 
                                     icon="icon-SelfPolinator" />
                    <AchievementCard title={"Mammal Tryhard (" + mammalTryhardCount + ")"} 
                                     icon="icon-TryMammals" />
                    <AchievementCard title={"Night Owl (" + nocturnalBirdCount + ")"} 
                                     icon="icon-NightOwl" />
                    <AchievementCard title={"King Fisher (" + fishCount + ")"} 
                                     icon="icon-KingFisher" />
                    <AchievementCard title={"Daisy Town (" + daisyCount + ")"} 
                                     icon="icon-DaisyTown" />
                    <AchievementCard title={"Heart Of The Matter (" + endangeredCount + ")"} 
                                     icon="icon-HeartOfTheMatter" />
                    <AchievementCard title={"Social Butterfly (" + butterflyCount + "," + socialCount + ")"} 
                                     icon="icon-SocialButterfly" />
                    <AchievementCard title={"Group Therapy (" + projectCount.length + ")"} 
                                     icon="icon-GroupTherapy" />
                    <AchievementCard title={"Name Giver (" + idCount + ")"} 
                                     icon="icon-NameGiver" />
                    <AchievementCard title={"Daily Life (" + dailyObsCountMax + "," + dailySpeciesCountMax + ")"} 
                                     icon="icon-DailyLife" />
                    <AchievementCard title={"Rat King (" + rodentCount + ")"} 
                                     icon="icon-RatKing" />
                    <AchievementCard title={"Craney Storker (" + storkCount + ")"} 
                                     icon="icon-CraneyStorker" />
                    <AchievementCard title={"So Many Bugs (" + bugCount + ")"} 
                                     icon="icon-TooManyBugs" />
                    <AchievementCard title={"Not A Bug (" + notBugCount + ")"} 
                                     icon="icon-NotABug" />
                    <AchievementCard title={"I Lichen Moss (" + mossCount + ")"} 
                                     icon="icon-LickenMoss" />
                    <AchievementCard title={"Toads and Toadstools (" + toadCount + "," + toadstoolCount + ")"} 
                                     icon="icon-ToadsAndToadstools" />
                    <AchievementCard title={"Flower Child (" + flowerOrderCount.length + ")"} 
                                     icon="icon-FlowerChild" />
                    <AchievementCard title={"Classy Observer (" + classCount.length + ")"} 
                                     icon="icon-WorldClass" />
                    <AchievementCard title={"Always On (" + alwaysOnCountMax + ")"} 
                                     icon="icon-AlwaysOn" />
                </div>
            </div>,
            document.getElementById('achievementList')
    );
}