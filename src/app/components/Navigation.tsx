import * as React from 'react';

const Navigation = ({currentTab, setCurrentTab}) => {
    return (
        <nav className="navigation">
            <button
                className={currentTab === 'colors' ? 'active' : 'secondary'}
                onClick={() => setCurrentTab('colors')}
            >
                Colors
            </button>
            <button
                className={currentTab === 'typography' ? 'active' : 'secondary'}
                onClick={() => setCurrentTab('typography')}
            >
                Typography
            </button>
            <button className={currentTab === 'grid' ? 'active' : 'secondary'} onClick={() => setCurrentTab('grid')}>
                Sizes
            </button>
            <button
                className={currentTab === 'effects' ? 'active' : 'secondary'}
                onClick={() => setCurrentTab('effects')}
            >
                Effects
            </button>
            <button className={currentTab === 'json' ? 'active' : 'secondary'} onClick={() => setCurrentTab('json')}>
                JSON
            </button>
        </nav>
    );
};

const BackButton = ({setSelectedStyle}) => {
    return (
        <nav className="navigation">
            <button
                className="active"
                onClick={() => {
                    setSelectedStyle(null);
                }}
            >
                Back
            </button>
        </nav>
    );
};

export {Navigation, BackButton};
