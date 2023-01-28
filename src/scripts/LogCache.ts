let logs: string[] = [];

export function setLogMessageAction(message: string) {
    logs.push(message);
    if (logs.length > 10) {
        logs = logs.slice(logs.length - 10);
    }
}

export function getLogMessages() {
    return logs.length > 0 ? logs : 'no errors to report :)';
}
