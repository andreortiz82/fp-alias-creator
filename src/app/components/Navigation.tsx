import * as React from 'react';

const Navigation = ({currentTab, setCurrentTab}) => {
    return (
        <div className="navigation">
            <nav>
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
                <button
                    className={currentTab === 'sizes' ? 'active' : 'secondary'}
                    onClick={() => setCurrentTab('sizes')}
                >
                    Sizes
                </button>
                <button
                    className={currentTab === 'effects' ? 'active' : 'secondary'}
                    onClick={() => setCurrentTab('effects')}
                >
                    Effects
                </button>
                <button
                    className={currentTab === 'json' ? 'active' : 'secondary'}
                    onClick={() => setCurrentTab('json')}
                >
                    JSON Output
                </button>
            </nav>
        </div>
    );
};

export default Navigation;
