import React, { memo, ReactNode } from 'react';

declare type HyperLinkType = {
    linkContent: string | ReactNode;
    linkURL: string;
}

export default memo(function HyperLink({ linkContent, linkURL }: HyperLinkType) {
    return (
        <a
            href={linkURL}
            rel='noreferrer'
            target={(window as any).openLink ? '_self' : '_blank'}
            onClick={() => {
                if ((window as any).openLink) {
                    (window as any).openLink(linkURL);
                }
            }}
        >
            {linkContent}
        </a>
    );
});
