import * as React from 'react';
import Toggle from './Toggle';
import EmptyState from './EmptyState';
import '../styles/ui.css';
import firstNames from './FirstNames';
import lastNames from './LastNames';
import cities from './Cities';
import addresses from './Addresses';

declare function require(path: string): any;

const App = ({}) => {
    React.useEffect(() => {
        parent.postMessage({pluginMessage: {type: 'run'}}, '*');
    }, []);

    const textbox = React.useRef<HTMLInputElement>(undefined);

    const options = [
        '1️⃣ First name',
        '2️⃣ Last name',
        '💁 Full name',
        '🏙 City',
        '⏳ Age',
        '📍 Address',
        '📞 Phone number',
        '💸 Balance',
        '📨 Email',
        '📅 Year',
        '💳 Credit card',
        '🆔 ID',
        '🎛 Custom',
    ];

    //usestate for message
    const [layers, setLayers] = React.useState([]);
    const [groupByLayerName, setGroupByLayerName] = React.useState(false);
    const [selectedOption, setSelectedOption] = React.useState([{name: 'All', option: options[0]}]);
    const [modalOpen, setModalOpen] = React.useState(false);
    const [customData, setCustomData] = React.useState('');
    console.log(selectedOption);

    React.useEffect(() => {
        window.onmessage = (event) => {
            const {type, message} = event.data.pluginMessage;
            if (type === 'selection') {
                // console.log(message.textLayers);
                setLayers(message.textLayers);
            }
        };
    }, []);

    //get the unique occurences of the layer name and put in array
    const getUniqueLayerNames = () => {
        const uniqueLayerNames = [];
        layers.forEach((layer) => {
            if (!uniqueLayerNames.includes(layer.name)) {
                uniqueLayerNames.push(layer.name);
            }
        });
        return uniqueLayerNames;
    };

    React.useEffect(() => {
        if (!groupByLayerName) {
            setSelectedOption([{name: 'All', option: options[0]}]);
        } else {
            setSelectedOption(getUniqueLayerNames().map((e) => ({name: e, option: options[0]})));
        }
    }, [groupByLayerName]);

    const getOptionList = (layerName) => {
        return (
            <div className="option-list">
                {selectedOption.map((option) => (
                    <div className="option-list-item" key={option.name}>
                        {option.name === layerName ? (
                            <div className="wraper select-div">
                                <select
                                    value={option.option}
                                    onChange={(e) => {
                                        setSelectedOption(
                                            selectedOption.map((a) => {
                                                if (a.name === layerName) {
                                                    //return the target value of the select
                                                    return {...a, option: e.target.value};
                                                }
                                                return a;
                                            })
                                        );
                                        if (e.target.value === '🎛 Custom') {
                                            setModalOpen(true);
                                        } else {
                                            setModalOpen(false);
                                        }
                                    }}
                                >
                                    {options.map((e) => (
                                        <option key={e} value={e}>
                                            {e}
                                        </option>
                                    ))}
                                </select>
                                <svg
                                    width="8"
                                    height="6"
                                    viewBox="0 0 8 6"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path
                                        d="M4.83205 4.75193C4.43623 5.34566 3.56377 5.34566 3.16795 4.75192L1.03647 1.5547C0.59343 0.890145 1.06982 3.82338e-07 1.86852 3.12514e-07L6.13148 -6.01665e-08C6.93018 -1.29991e-07 7.40657 0.890145 6.96353 1.5547L4.83205 4.75193Z"
                                        fill="#666C72"
                                    />
                                </svg>
                            </div>
                        ) : (
                            ''
                        )}
                    </div>
                ))}
            </div>
        );
    };

    const genRandomFullNames = () => {
        return (
            firstNames[Math.floor(Math.random() * firstNames.length)] +
            ' ' +
            lastNames[Math.floor(Math.random() * lastNames.length)]
        );
    };

    const genRandomAges = () => {
        return (Math.floor(Math.random() * 55) + 15).toString();
    };

    const genRandomFirstNames = () => {
        return firstNames[Math.floor(Math.random() * firstNames.length)];
    };

    const genRandomLastNames = () => {
        return lastNames[Math.floor(Math.random() * lastNames.length)];
    };

    const genRandomYears = () => {
        return (Math.floor(Math.random() * (2029 - 1900 + 1)) + 1900).toString();
    };

    const genRandomBalances = () => {
        return (
            Math.floor(Math.random() * 9000)
                .toFixed(0)
                .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                .toString() +
            '.' +
            Math.floor(Math.random() * 100).toFixed(0)
        );
    };

    const genRandomEmails = () => {
        return (
            firstNames[Math.floor(Math.random() * firstNames.length)] +
            '.' +
            lastNames[Math.floor(Math.random() * lastNames.length)].charAt(0) +
            '@' +
            'email.com'
        );
    };

    const genRandomCreditCards = () => {
        return (
            Math.floor(Math.random() * 9999) +
            ' ' +
            Math.floor(Math.random() * 9999) +
            ' ' +
            Math.floor(Math.random() * 9999) +
            ' ' +
            Math.floor(Math.random() * 9999)
        );
    };

    const genRandomAddresses = () => {
        const alphabet = 'abcdefghijklmnopqrstuvwxyz';
        return (
            Math.floor(Math.random() * 100) +
            //random letter from alphabet, or nothing
            (Math.floor(Math.random() * 2) ? alphabet[Math.floor(Math.random() * alphabet.length)] : '') +
            ' ' +
            addresses[Math.floor(Math.random() * addresses.length)]
        );
    };

    const genRandomID = () => {
        //1 letter + 5 digits number
        return (
            firstNames[Math.floor(Math.random() * firstNames.length)].charAt(0) +
            Math.floor(Math.random() * 100000).toString()
        );
    };

    const genRandomCities = () => {
        return cities[Math.floor(Math.random() * cities.length)].city;
    };

    const genRandomPhoneNumbers = () => {
        return '1 ' + Math.floor(Math.random() * 100000000).toString();
    };

    const updateText = (layer, e) => {
        layer.value = e.target.value;
        setLayers([...layers]);
        parent.postMessage({pluginMessage: {type: 'overwrite', result: layers}}, '*');
    };

    const randomeCustomData = () => {
        //break up the string into an array of words by new line
        const words = customData.split('\n');
        //randomly select a word from the array
        const randomWord = words[Math.floor(Math.random() * words.length)];
        //return the random word
        return randomWord;
    };

    const randomize = (name) => {
        //find the option of the name in selectedoptions
        const option = selectedOption.find((e) => e.name === name).option;
        if (option === '💁 Full name') {
            return genRandomFullNames();
        } else if (option === '⏳ Age') {
            return genRandomAges();
        } else if (option === '1️⃣ First name') {
            return genRandomFirstNames();
        } else if (option === '2️⃣ Last name') {
            return genRandomLastNames();
        } else if (option === '🏙 City') {
            return genRandomCities();
        } else if (option === '📨 Email') {
            return genRandomEmails();
        } else if (option === '🆔 ID') {
            return genRandomID();
        } else if (option === '📍 Address') {
            return genRandomAddresses();
        } else if (option === '📞 Phone number') {
            return genRandomPhoneNumbers();
        } else if (option === '💳 Credit card') {
            return genRandomCreditCards();
        } else if (option === '📅 Year') {
            return genRandomYears();
        } else if (option === options[7]) {
            return genRandomBalances();
        } else if (option === '🎛 Custom') {
            return randomeCustomData();
        }
    };

    return (
        <>
            {/* if the layer.length is 0, then show nothing, else show all UI */}
            {layers.length === 0 ? (
                <>
                    {/* diplay EmptyState and pass parent.postMessage({pluginMessage: {type: 'run'}}, '*'); as props */}
                    <EmptyState
                        onClick={() => {
                            parent.postMessage({pluginMessage: {type: 'run'}}, '*');
                        }}
                    />
                </>
            ) : (
                <div>
                    {/* modal div with textarea that updates the customerdata state, a save button to setmodalopen to false */}

                    {modalOpen ? (
                        <div className="modal">
                            <div className="modal-content">
                                <p className="label">🎛 Custom data</p>
                                <textarea
                                    placeholder="Pig 
Goat 
Duck 
Cow 
Chicken 
Sheep 
Horse
                                "
                                    value={customData}
                                    onChange={(e) => {
                                        setCustomData(e.target.value);
                                    }}
                                />
                                <div className="wraper">
                                    <div
                                        className="secondary-button"
                                        onClick={() => {
                                            setModalOpen(false);
                                            setCustomData('');
                                        }}
                                    >
                                        Clear
                                    </div>
                                    <div
                                        className="button"
                                        onClick={() => {
                                            setModalOpen(false);
                                        }}
                                    >
                                        Save
                                    </div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <></>
                    )}

                    {/* checkbox */}

                    <div className="container">
                        <div className="wraper">
                            <Toggle
                                checked={groupByLayerName}
                                onChange={() => setGroupByLayerName(!groupByLayerName)}
                            />
                            <p className={groupByLayerName ? 'label' : 'label label-inactive'}>Group by layer name</p>
                        </div>
                        <div
                            className="refresh"
                            onClick={() => {
                                // groupbye layer name to false
                                setGroupByLayerName(false);
                                parent.postMessage({pluginMessage: {type: 'run'}}, '*');
                            }}
                        >
                            Refresh
                        </div>
                    </div>
                    <hr className="divider" />

                    {/* show button and input in none-grouped list */}
                    {!groupByLayerName && (
                        <>
                            <div className="container">
                                <p className="label">All texts from selection</p>

                                <div className="wraper">
                                    <div
                                        className="random-div"
                                        onClick={() => {
                                            const updatedLayers = layers.map((layer) => {
                                                return {
                                                    ...layer,
                                                    value: randomize('All'),
                                                };
                                            });
                                            setLayers(updatedLayers);
                                            parent.postMessage(
                                                {pluginMessage: {type: 'overwrite', result: updatedLayers}},
                                                '*'
                                            );
                                        }}
                                    >
                                        <svg
                                            width="15"
                                            height="13"
                                            viewBox="0 0 15 13"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M14.0018 3.51004C14.0021 3.68238 13.9312 3.84824 13.8023 3.97697C13.587 4.19205 13.3716 4.40695 13.1562 4.62168C12.76 5.01698 12.364 5.4121 11.9683 5.80775C11.8358 5.94051 11.6921 6.01074 11.5293 6.02213C11.2639 6.04069 11.0182 5.8969 10.9031 5.65538C10.7858 5.4093 10.8334 5.12381 11.0245 4.928C11.1459 4.80365 11.2704 4.67965 11.3909 4.55985C11.4406 4.51029 11.4904 4.4609 11.5401 4.41115L11.7403 4.21079C11.7633 4.18802 11.786 4.16508 11.809 4.14231C10.6094 4.1579 9.64752 4.46212 8.81664 5.08248C8.11116 5.60896 7.59098 6.26067 7.27047 7.01922C6.89321 7.91228 6.40596 8.63177 5.78105 9.2185C4.88326 10.0616 3.81068 10.595 2.59325 10.8032C2.2195 10.8671 1.84329 10.8808 1.48547 10.8808C1.42802 10.8808 1.37128 10.8804 1.31488 10.8799C1.20279 10.8789 1.08772 10.8792 0.976501 10.8794C0.875619 10.8797 0.771058 10.8799 0.667723 10.8792C0.29204 10.8766 0.00673033 10.6021 0.00427832 10.2408C0.00305231 10.0681 0.0673301 9.90752 0.185202 9.78824C0.309204 9.66284 0.481895 9.59331 0.671401 9.59261C0.795052 9.59226 0.920105 9.59278 1.04113 9.59331C1.24062 9.59436 1.44676 9.59541 1.64783 9.59138C2.33369 9.57807 2.97419 9.44076 3.55147 9.1833C4.12699 8.92654 4.65785 8.54245 5.12934 8.04153C5.49066 7.65762 5.79348 7.17808 6.0555 6.57558C6.76798 4.93641 7.98576 3.79868 9.67502 3.19408C10.2821 2.9769 10.917 2.86674 11.5622 2.86674H11.568C11.6442 2.86674 11.7203 2.86691 11.7971 2.86691C11.7442 2.81384 11.6913 2.76095 11.6384 2.70806C11.4377 2.50734 11.2371 2.3068 11.0364 2.10609C10.859 1.92849 10.7989 1.69958 10.8672 1.46191C10.9343 1.22862 11.1107 1.06486 11.351 1.01231C11.5074 0.978161 11.7407 0.984642 11.9645 1.20918C12.3901 1.63618 12.8238 2.06948 13.2432 2.48843L13.3508 2.59579C13.4739 2.71892 13.6 2.84362 13.7219 2.96429L13.7974 3.0389C13.9287 3.16886 14.0012 3.33612 14.0018 3.51004ZM13.8074 9.77441C13.7813 9.74796 13.7555 9.72327 13.7306 9.69945C13.7116 9.68141 13.6926 9.66319 13.6741 9.64463L13.3979 9.3686C12.9304 8.90149 12.4468 8.41844 11.9724 7.9424C11.8359 7.80562 11.689 7.73416 11.5233 7.724C11.2574 7.70736 11.0129 7.85396 10.9003 8.0967C10.7839 8.34786 10.8353 8.62827 11.0345 8.82898C11.2779 9.07418 11.5265 9.32219 11.7668 9.56196L11.7974 9.59261C11.7133 9.59261 11.6291 9.59243 11.5456 9.59208C11.1394 9.59068 10.7474 9.53866 10.3803 9.43761C9.46502 9.18522 8.69211 8.68449 8.08314 7.94941C7.96229 7.80351 7.79783 7.71454 7.62006 7.69913C7.45139 7.68424 7.28658 7.73766 7.15575 7.84888C6.87482 8.08795 6.84785 8.47694 7.09147 8.77381C7.44649 9.20624 7.85562 9.58052 8.3075 9.88615C9.15256 10.4575 10.0742 10.7834 11.0466 10.8549C11.2988 10.8734 11.552 10.8766 11.7995 10.8773C11.5594 11.1167 11.31 11.3663 11.0455 11.6316C10.9126 11.7649 10.8397 11.9359 10.8404 12.1129C10.8411 12.2816 10.9093 12.4413 11.032 12.5627C11.1587 12.6877 11.318 12.7499 11.4792 12.7499C11.6475 12.7499 11.8177 12.6818 11.9538 12.5464C12.5922 11.9108 13.2159 11.2887 13.8072 10.6971C14.0681 10.4361 14.0681 10.0394 13.8074 9.77441ZM6.16163 4.97179C5.38189 4.02741 4.38445 3.38359 3.19697 3.05834C2.50708 2.86936 1.86606 2.84975 1.44781 2.86691C1.35096 2.86691 1.26269 2.86621 1.18037 2.86569C0.98701 2.86428 0.819748 2.86323 0.652661 2.87076C0.520602 2.87654 0.382414 2.92086 0.272949 2.99249C0.0431602 3.14346 -0.0524683 3.43035 0.0349285 3.7062C0.118997 3.97102 0.362097 4.15072 0.640401 4.15299C0.836211 4.15439 1.03465 4.15422 1.22661 4.15404C1.39054 4.15369 1.56026 4.15352 1.72647 4.15439C2.35628 4.15807 2.96228 4.28785 3.52747 4.54006C4.1664 4.82537 4.7174 5.24606 5.16524 5.79059C5.28732 5.93893 5.45248 6.02983 5.63025 6.04665C5.64986 6.0484 5.66948 6.04927 5.6891 6.04927C5.83674 6.04927 5.98001 5.99691 6.09753 5.89883C6.37724 5.66483 6.40491 5.26621 6.16163 4.97179Z"
                                                fill="white"
                                            />
                                        </svg>
                                    </div>
                                    <div className="wraper select-div">
                                        <select
                                            value={selectedOption[0].option}
                                            onChange={(e) => {
                                                setSelectedOption(
                                                    selectedOption.map((a) => {
                                                        return {...a, option: e.target.value};
                                                    })
                                                );
                                                //if the option is custom, open the modal
                                                if (e.target.value === '🎛 Custom') {
                                                    setModalOpen(true);
                                                } else {
                                                    setModalOpen(false);
                                                }
                                            }}
                                        >
                                            {options.map((e) => (
                                                <option key={e} value={e}>
                                                    {e}
                                                </option>
                                            ))}
                                        </select>
                                        <svg
                                            width="8"
                                            height="6"
                                            viewBox="0 0 8 6"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M4.83205 4.75193C4.43623 5.34566 3.56377 5.34566 3.16795 4.75192L1.03647 1.5547C0.59343 0.890145 1.06982 3.82338e-07 1.86852 3.12514e-07L6.13148 -6.01665e-08C6.93018 -1.29991e-07 7.40657 0.890145 6.96353 1.5547L4.83205 4.75193Z"
                                                fill="#666C72"
                                            />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <input
                                    type="text"
                                    ref={textbox}
                                    placeholder="Bulk replace or randomize..."
                                    onChange={(e) => {
                                        const {value} = e.target;
                                        const updatedLayers = layers.map((layer) => {
                                            return {
                                                ...layer,
                                                value,
                                            };
                                        });

                                        setLayers(updatedLayers);
                                        parent.postMessage(
                                            {pluginMessage: {type: 'overwrite', result: updatedLayers}},
                                            '*'
                                        );
                                    }}
                                />
                            </div>
                        </>
                    )}

                    {/* if groupbylayername is true, then group by layer element by getUniqueLayerNames() */}

                    {groupByLayerName
                        ? getUniqueLayerNames().map((layerName) => {
                              return (
                                  <>
                                      <div className="container">
                                          <p className="label">Layer: {layerName}</p>

                                          <div className="wraper">
                                              <div
                                                  className="random-div"
                                                  onClick={() => {
                                                      const updatedLayers = layers.map((layer) => {
                                                          if (layer.name === layerName) {
                                                              console.log(layer.id);
                                                              return {
                                                                  ...layer,
                                                                  value: randomize(layerName),
                                                              };
                                                          } else {
                                                              return layer;
                                                          }
                                                      });
                                                      setLayers(updatedLayers);
                                                      parent.postMessage(
                                                          {pluginMessage: {type: 'overwrite', result: updatedLayers}},
                                                          '*'
                                                      );
                                                  }}
                                              >
                                                  <svg
                                                      width="15"
                                                      height="13"
                                                      viewBox="0 0 15 13"
                                                      fill="none"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                      <path
                                                          d="M14.0018 3.51004C14.0021 3.68238 13.9312 3.84824 13.8023 3.97697C13.587 4.19205 13.3716 4.40695 13.1562 4.62168C12.76 5.01698 12.364 5.4121 11.9683 5.80775C11.8358 5.94051 11.6921 6.01074 11.5293 6.02213C11.2639 6.04069 11.0182 5.8969 10.9031 5.65538C10.7858 5.4093 10.8334 5.12381 11.0245 4.928C11.1459 4.80365 11.2704 4.67965 11.3909 4.55985C11.4406 4.51029 11.4904 4.4609 11.5401 4.41115L11.7403 4.21079C11.7633 4.18802 11.786 4.16508 11.809 4.14231C10.6094 4.1579 9.64752 4.46212 8.81664 5.08248C8.11116 5.60896 7.59098 6.26067 7.27047 7.01922C6.89321 7.91228 6.40596 8.63177 5.78105 9.2185C4.88326 10.0616 3.81068 10.595 2.59325 10.8032C2.2195 10.8671 1.84329 10.8808 1.48547 10.8808C1.42802 10.8808 1.37128 10.8804 1.31488 10.8799C1.20279 10.8789 1.08772 10.8792 0.976501 10.8794C0.875619 10.8797 0.771058 10.8799 0.667723 10.8792C0.29204 10.8766 0.00673033 10.6021 0.00427832 10.2408C0.00305231 10.0681 0.0673301 9.90752 0.185202 9.78824C0.309204 9.66284 0.481895 9.59331 0.671401 9.59261C0.795052 9.59226 0.920105 9.59278 1.04113 9.59331C1.24062 9.59436 1.44676 9.59541 1.64783 9.59138C2.33369 9.57807 2.97419 9.44076 3.55147 9.1833C4.12699 8.92654 4.65785 8.54245 5.12934 8.04153C5.49066 7.65762 5.79348 7.17808 6.0555 6.57558C6.76798 4.93641 7.98576 3.79868 9.67502 3.19408C10.2821 2.9769 10.917 2.86674 11.5622 2.86674H11.568C11.6442 2.86674 11.7203 2.86691 11.7971 2.86691C11.7442 2.81384 11.6913 2.76095 11.6384 2.70806C11.4377 2.50734 11.2371 2.3068 11.0364 2.10609C10.859 1.92849 10.7989 1.69958 10.8672 1.46191C10.9343 1.22862 11.1107 1.06486 11.351 1.01231C11.5074 0.978161 11.7407 0.984642 11.9645 1.20918C12.3901 1.63618 12.8238 2.06948 13.2432 2.48843L13.3508 2.59579C13.4739 2.71892 13.6 2.84362 13.7219 2.96429L13.7974 3.0389C13.9287 3.16886 14.0012 3.33612 14.0018 3.51004ZM13.8074 9.77441C13.7813 9.74796 13.7555 9.72327 13.7306 9.69945C13.7116 9.68141 13.6926 9.66319 13.6741 9.64463L13.3979 9.3686C12.9304 8.90149 12.4468 8.41844 11.9724 7.9424C11.8359 7.80562 11.689 7.73416 11.5233 7.724C11.2574 7.70736 11.0129 7.85396 10.9003 8.0967C10.7839 8.34786 10.8353 8.62827 11.0345 8.82898C11.2779 9.07418 11.5265 9.32219 11.7668 9.56196L11.7974 9.59261C11.7133 9.59261 11.6291 9.59243 11.5456 9.59208C11.1394 9.59068 10.7474 9.53866 10.3803 9.43761C9.46502 9.18522 8.69211 8.68449 8.08314 7.94941C7.96229 7.80351 7.79783 7.71454 7.62006 7.69913C7.45139 7.68424 7.28658 7.73766 7.15575 7.84888C6.87482 8.08795 6.84785 8.47694 7.09147 8.77381C7.44649 9.20624 7.85562 9.58052 8.3075 9.88615C9.15256 10.4575 10.0742 10.7834 11.0466 10.8549C11.2988 10.8734 11.552 10.8766 11.7995 10.8773C11.5594 11.1167 11.31 11.3663 11.0455 11.6316C10.9126 11.7649 10.8397 11.9359 10.8404 12.1129C10.8411 12.2816 10.9093 12.4413 11.032 12.5627C11.1587 12.6877 11.318 12.7499 11.4792 12.7499C11.6475 12.7499 11.8177 12.6818 11.9538 12.5464C12.5922 11.9108 13.2159 11.2887 13.8072 10.6971C14.0681 10.4361 14.0681 10.0394 13.8074 9.77441ZM6.16163 4.97179C5.38189 4.02741 4.38445 3.38359 3.19697 3.05834C2.50708 2.86936 1.86606 2.84975 1.44781 2.86691C1.35096 2.86691 1.26269 2.86621 1.18037 2.86569C0.98701 2.86428 0.819748 2.86323 0.652661 2.87076C0.520602 2.87654 0.382414 2.92086 0.272949 2.99249C0.0431602 3.14346 -0.0524683 3.43035 0.0349285 3.7062C0.118997 3.97102 0.362097 4.15072 0.640401 4.15299C0.836211 4.15439 1.03465 4.15422 1.22661 4.15404C1.39054 4.15369 1.56026 4.15352 1.72647 4.15439C2.35628 4.15807 2.96228 4.28785 3.52747 4.54006C4.1664 4.82537 4.7174 5.24606 5.16524 5.79059C5.28732 5.93893 5.45248 6.02983 5.63025 6.04665C5.64986 6.0484 5.66948 6.04927 5.6891 6.04927C5.83674 6.04927 5.98001 5.99691 6.09753 5.89883C6.37724 5.66483 6.40491 5.26621 6.16163 4.97179Z"
                                                          fill="white"
                                                      />
                                                  </svg>
                                              </div>

                                              {/* print selectedOption as select that update setselectedOption */}

                                              {getOptionList(layerName)}
                                          </div>
                                      </div>

                                      {layers.filter((layer) => layer.name === layerName).length > 1 && (
                                          <div className="container">
                                              <input
                                                  type="text"
                                                  placeholder="Replace or randomize group..."
                                                  ref={textbox}
                                                  onChange={(e) => {
                                                      const {value} = e.target;
                                                      const updatedLayers = layers.map((layer) => {
                                                          if (layer.name === layerName) {
                                                              return {
                                                                  ...layer,
                                                                  value,
                                                              };
                                                          } else {
                                                              return layer;
                                                          }
                                                      });

                                                      setLayers(updatedLayers);
                                                      parent.postMessage(
                                                          {pluginMessage: {type: 'overwrite', result: updatedLayers}},
                                                          '*'
                                                      );
                                                  }}
                                              />
                                          </div>
                                      )}

                                      {/* if layers.filter((layer) => layer.name === layerName).length = 1, then show nothing */}

                                      <div key={layerName}>
                                          {layers
                                              .filter((layer) => layer.name === layerName)
                                              .map((layer) => {
                                                  return (
                                                      <div key={layer.id} className="list-item">
                                                          <input
                                                              type="text"
                                                              ref={textbox}
                                                              value={layer.value}
                                                              onChange={(e) => updateText(layer, e)}
                                                          />
                                                      </div>
                                                  );
                                              })}
                                          <hr className="divider" />
                                      </div>
                                  </>
                              );
                          })
                        : layers.map((layer) => {
                              return (
                                  <div key={layer.id} className="list-item">
                                      <p className="label">{layer.name}</p>
                                      <input
                                          type="text"
                                          ref={textbox}
                                          value={layer.value}
                                          onChange={(e) => updateText(layer, e)}
                                      />
                                  </div>
                              );
                          })}
                </div>
            )}
        </>
    );
};

export default App;
