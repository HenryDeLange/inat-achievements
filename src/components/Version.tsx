import I18n from 'i18n-js';
import { memo, useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { FileEarmarkBinary } from 'react-bootstrap-icons';
import GitInfo from 'react-git-info/macro';
import packageJson from '../../package.json';
import mywild from '../images/mywild.png';
import { getLogMessages } from '../scripts/LogCache';

export default memo(function Version() {
    const [modalShow, setModalShow] = useState(false);
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
            <FileEarmarkBinary size={18} className='m-2' style={{ cursor: 'help' }} onClick={() => setModalShow(true)} />
            <LogsModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
        </div>
    );
});

function LogsModal(props: any) {
    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Console Logs
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {getLogMessages().map((message) => <div>{message}</div>)}
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    );
}
