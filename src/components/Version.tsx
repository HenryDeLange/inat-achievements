import I18n from 'i18n-js';
import React, { memo } from 'react';
import GitInfo from 'react-git-info/macro';
import packageJson from '../../package.json';

export default memo(function Version() {
    const gitInfo = GitInfo();
    const date = new Date(gitInfo.commit.date);
    return (
        <span className='Version'>
            {I18n.t('version', {
                timestamp: date.toLocaleString('en-za'),
                version: packageJson.version,
                commit: `${gitInfo.branch} (${gitInfo.commit.shortHash})`
            })}
        </span>
    );
});
