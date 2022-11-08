import * as React from 'react';
import {saveToLocalStorage} from '../utils';
import * as _ from 'lodash';

const Settings = ({localStore, setLocalStore}) => {
    return (
        <div className="settings">
            <h1>Settings</h1>
            <p>Connect to Github</p>
            <div className="settings__form">
                <input
                    name="gh-api-key"
                    type="password"
                    defaultValue={localStore.apiKey}
                    onChange={(e) => {
                        setLocalStore((current) => ({
                            ...current,
                            apiKey: e.target.value,
                        }));
                    }}
                    placeholder="Enter Github API Key"
                />

                <input
                    name="gh-repo"
                    defaultValue={localStore.ghRepo}
                    onChange={(e) => {
                        setLocalStore((current) => ({
                            ...current,
                            ghRepo: e.target.value,
                        }));
                    }}
                    placeholder="Enter Github Repo"
                />

                <input
                    name="gh-branch"
                    defaultValue={localStore.ghBranch}
                    onChange={(e) => {
                        setLocalStore((current) => ({
                            ...current,
                            ghBranch: e.target.value,
                        }));
                    }}
                    placeholder="Enter Github Branch"
                />

                <button className="save" onClick={() => saveToLocalStorage(localStore)}>
                    Save
                </button>
            </div>
        </div>
    );
};

export default Settings;
