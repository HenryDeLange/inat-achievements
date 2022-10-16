import I18n from 'i18n-js';
import { memo } from 'react';
import GitInfo from 'react-git-info/macro';
import packageJson from '../../package.json';
import mywild from '../images/mywild.png';

export default memo(function Version() {
    const gitInfo = GitInfo();
    const date = new Date(gitInfo.commit.date);
    return (
        <div>
            <img src={mywild} alt='MyWild' className='MyWild-Small-Logo' />
            <span className='Version'>
                {I18n.t('version', {
                    timestamp: date.toLocaleString('en-za'),
                    version: packageJson.version,
                    commit: `${gitInfo.branch} (${gitInfo.commit.shortHash})`
                })}
            </span>
        </div>
    );
});
