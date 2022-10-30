import React from 'react';

/**
 * Footer Component for Main Page (contains footer information)
 */
function FooterComp() {
    return (
        <div
            className={
                'text-white px-24 py-4 bg-coolblack absolute bottom-0 w-full h-32'
            }>
            <div className={'flex flex-row justify-between gap-4'}>
                <div className={'flex-1 text-left'}>
                    <p className={'font-bold text-lg'}>Contacts</p>
                    <div className={'flex flex-row gap-2'}>
                        <img
                            className="contact-icon"
                            src={'assets/images/email-icon.png'}
                            alt="email"
                        />
                        <p className={'text-base'}>
                            rhrlgns96@gmail.com (personal)
                        </p>
                    </div>
                </div>
                <div className={'flex-1 text-left'}>
                    <p className={'font-bold text-lg'}>About this Website</p>
                    <p className={'text-base'}>
                        This project was built using NodeJS, ReactJS, deployed
                        in Heroku App Server. Project information was pulled
                        from MongoDB Server
                    </p>
                </div>
            </div>
        </div>
    );
}
export default React.memo(FooterComp);
