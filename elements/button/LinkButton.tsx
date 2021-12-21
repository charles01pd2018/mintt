// dependencies
import Link from 'next/link';
// types
import { ConditionalProps } from 'types';
// import { BackgroundColors } from 'types';

/* TYPES */
interface Content {
    text: string;
    icon?: {
        data: string;
        alt: string;
    }
}

type Props = ConditionalProps<
    {
        // customization
        className?: string;
        content: Content;
        href: string;
        // styling
        type?: 'CTA' | 'sticky';
        size?: 'sm' | 'md' | 'lg';
        color?: 'ghost-white' | 'antique-white' | 'mint-cream' | 'alice-blue';
        isRounded?: boolean;
    }, 
        'type',
    {
        // if type is sticky, isRounded must be false
        type: 'sticky';
        isRounded: false;
    }
>

/**
 * Link Buttons redirect to another part of the website (internal).
 * Looks like a button.
 */
const LinkButton = ( {
    className='',
    content,
    href,
    type='CTA',
    size='md',
    color='ghost-white',
    isRounded=true,
}: Props ) => {

    /* CONTENT */
    const { text } = content;
    
    /* CLASSNAMES */
    const linkButtonClasses = `
        button-wrapper
        link-button-wrapper
        ${className}
        ${type}
        button--${size}
        ${color}
        ${isRounded ? 'rounded' : ''}
    `;

    return (
        <Link href={href}> 
        <a className='link-button-container' target='_blank'>
            <div className={linkButtonClasses}>
                <div className='link-button-text'>
                    {text}
                    {
                        type === 'CTA' && (
                            <div className='arrow'>➤</div>
                        )
                    }
                </div>
            </div>
        </a>
        </Link>
    );
}

export default LinkButton;