// types
import { FC } from 'react';

/* TYPES */
interface DefaultLayoutProps {

}

const DefaultLayout: FC<DefaultLayoutProps> = ({
    children
}) => {

    return (
        <div className='container'>
            <main className='site-content'>{children}</main>
        </div>
    );
}

export default DefaultLayout;