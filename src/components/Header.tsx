import React from 'react';
import mywild from '../images/mywild.png';
import { doCalculateClick } from '../scripts/ProcessData';

export default function Header() {
    return (
        <>
            <div className='row'>
                <div className='container-fluid'>
                    <div className='container'>
                        <div className='row'>
                            <div className='col'>
                                <img src={mywild} className='App-logo' alt='logo' />
                            </div>
                            <div className='col-md-auto'>
                                <h1 className='display-4'>Wild Achievements</h1>
                            </div>
                        </div>
                        <p className='lead'>Upload observation on iNaturalist.org to try and unlock all achievements!</p>
                    </div>
                </div>
            </div>
            <div className='container'>
                <div className='row'>
                    <div className='input-group mb-3 w-50 mx-auto input-group-lg'>
                        <input
                            id='username'
                            type='text'
                            className='form-control'
                            placeholder='iNaturalist Username'
                            aria-label='Username'
                            aria-describedby='inputGroup-sizing-lg'
                        />
                        <button
                            className='btn btn-lg btn-primary'
                            style={{ marginLeft: 0 }}
                            type='button'
                            onClick={doCalculateClick}
                        >
                            Calculate Achievements
                        </button>
                    </div>
                </div>
                <div className='row'>
                        <a tabIndex={0}
                            className='btn btn-md btn-outline-secondary'
                            role='button'
                            data-toggle='popover'
                            data-trigger='focus'
                            data-html='true'
                            title='Available URL Parameters'
                            data-bs-content='<li>user=username <br /> 
                                            Immediately load the achievements for the specified user.</li>
                                            <li>limit=100 <br /> 
                                            Limit the number of observations that are read.</li>'
                        >
                            URL Parameters
                        </a>
                    </div>
                    {/* <OverlayTrigger
                        delay={{ hide: 450, show: 300 }}
                        overlay={(props) => (
                        <Tooltip {...props}>
                            Hii, I am a simple tooltip information!!!
                        </Tooltip>
                        )}
                        placement="bottom"
                    ><Button variant="warning">Tooltip Button</Button>
                    </OverlayTrigger>
                    </button> */}
            </div>
            {/* <hr /> */}
            <div id='PanelFeedback' style={{ display: 'none' }} className='alert alert-warning w-50 mx-auto' role='alert' />
            {/* <hr /> */}
        </>
    );
}
