import React, { memo, ReactChild, ReactFragment, ReactNode, ReactPortal } from 'react';
import { Button, OverlayTrigger } from 'react-bootstrap';

declare type MenuButtonType = {
    buttonContent: string | ReactNode;
    linkURL?: string;
    popupComponent?: true | ReactChild | ReactFragment | ReactPortal;
}

export default memo(function MenuButton({ buttonContent, linkURL, popupComponent }: MenuButtonType) {
    if (popupComponent) {
        return (
            <OverlayTrigger trigger='click' placement='bottom' overlay={popupComponent as any} rootClose>
                <Button
                    className='m-1'
                    variant='success'
                    href={linkURL}
                    target={linkURL ? (window as any).openLink ? '_self' : '_blank' : undefined}
                    onClick={linkURL ? () => {
                        if ((window as any).openLink) {
                            (window as any).openLink(linkURL);
                        }
                    } : undefined}
                >
                    {buttonContent}
                </Button>
            </OverlayTrigger>
        );
    }
    return (<Button
        className='m-1'
        variant='success'
        href={linkURL}
        target={linkURL ? (window as any).openLink ? '_self' : '_blank' : undefined}
        onClick={linkURL ? () => {
            if ((window as any).openLink) {
                (window as any).openLink(linkURL);
            }
        } : undefined}
    >
        {buttonContent}
    </Button>);
});
