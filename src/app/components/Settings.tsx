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
                    placeholder="Github API Key"
                />

                <input
                    name="gh-org"
                    defaultValue={localStore.ghOrg}
                    onChange={(e) => {
                        setLocalStore((current) => ({
                            ...current,
                            ghOrg: e.target.value,
                        }));
                    }}
                    placeholder="Github Organization"
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
                    placeholder="Github Repo"
                />

                <input
                    name="gh-file-path"
                    defaultValue={localStore.ghPath}
                    onChange={(e) => {
                        setLocalStore((current) => ({
                            ...current,
                            ghPath: e.target.value,
                        }));
                    }}
                    placeholder="Github File Path"
                />

                <button
                    className="save"
                    onClick={() => {
                        setLocalStore((current) => ({
                            ...current,
                            hasConfig: true,
                        }));
                        saveToLocalStorage(localStore);
                    }}
                >
                    Save
                </button>
            </div>
        </div>
    );
};

export default Settings;
