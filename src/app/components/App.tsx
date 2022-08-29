import * as React from 'react';
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
        'First name',
        'Last name',
        'Full name',
        'City',
        'Age',
        'Address',
        'Phone number',
        'Balance',
        'Email',
        'Year',
        'Credit card',
        'ID',
        'Custom',
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
                                    if (e.target.value === 'Custom') {
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
        if (option === 'Full name') {
            return genRandomFullNames();
        } else if (option === 'Age') {
            return genRandomAges();
        } else if (option === 'First name') {
            return genRandomFirstNames();
        } else if (option === 'Last name') {
            return genRandomLastNames();
        } else if (option === 'City') {
            return genRandomCities();
        } else if (option === 'Email') {
            return genRandomEmails();
        } else if (option === 'ID') {
            return genRandomID();
        } else if (option === 'Address') {
            return genRandomAddresses();
        } else if (option === 'Phone number') {
            return genRandomPhoneNumbers();
        } else if (option === 'Credit card') {
            return genRandomCreditCards();
        } else if (option === 'Year') {
            return genRandomYears();
        } else if (option === 'Balance') {
            return genRandomBalances();
        } else if (option === 'Custom') {
            return randomeCustomData();
        }
    };

    return (
        <div>
            {/* modal div with textarea that updates the customerdata state, a save button to setmodalopen to false */}

            <h2>Hello world</h2>

            {modalOpen ? (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Customize your data</h2>
                        </div>
                        <div className="modal-body">
                            <textarea
                                value={customData}
                                onChange={(e) => {
                                    setCustomData(e.target.value);
                                }}
                            />
                        </div>
                        <div className="modal-footer">
                            <button
                                onClick={() => {
                                    setModalOpen(false);
                                    setCustomData('');
                                }}
                            >
                                Clear
                            </button>
                            <button
                                onClick={() => {
                                    setModalOpen(false);
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <>Nothing</>
            )}

            <button
                onClick={() => {
                    parent.postMessage({pluginMessage: {type: 'run'}}, '*');
                }}
            >
                Refresh
            </button>
            {/* checkbox */}
            <label>
                <input
                    type="checkbox"
                    checked={groupByLayerName}
                    onChange={() => setGroupByLayerName(!groupByLayerName)}
                />
                Group by layer name
            </label>

            {/* show button and input in none-grouped list */}
            {!groupByLayerName && (
                <div>
                    <p>overwrite all selected texts</p>
                    <input
                        type="text"
                        ref={textbox}
                        onChange={(e) => {
                            const {value} = e.target;
                            const updatedLayers = layers.map((layer) => {
                                return {
                                    ...layer,
                                    value,
                                };
                            });

                            setLayers(updatedLayers);
                            parent.postMessage({pluginMessage: {type: 'overwrite', result: updatedLayers}}, '*');
                        }}
                    />

                    <button
                        onClick={() => {
                            const updatedLayers = layers.map((layer) => {
                                return {
                                    ...layer,
                                    value: randomize('All'),
                                };
                            });
                            setLayers(updatedLayers);
                            parent.postMessage({pluginMessage: {type: 'overwrite', result: updatedLayers}}, '*');
                        }}
                    >
                        Random
                    </button>
                    <select
                        value={selectedOption[0].option}
                        onChange={(e) => {
                            setSelectedOption(
                                selectedOption.map((a) => {
                                    return {...a, option: e.target.value};
                                })
                            );
                            //if the option is custom, open the modal
                            if (e.target.value === 'Custom') {
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
                </div>
            )}

            {/* if groupbylayername is true, then group by layer element by getUniqueLayerNames() */}
            {groupByLayerName
                ? getUniqueLayerNames().map((layerName) => {
                      return (
                          <>
                              <p>{layerName}</p>
                              <p>overwrite all selected texts</p>
                              <input
                                  type="text"
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
                              <button
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
                                  Random
                              </button>

                              {/* print selectedOption as select that update setselectedOption */}

                              {getOptionList(layerName)}

                              <div key={layerName}>
                                  {layers
                                      .filter((layer) => layer.name === layerName)
                                      .map((layer) => {
                                          return (
                                              <div key={layer.id}>
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
                          </>
                      );
                  })
                : layers.map((layer) => {
                      return (
                          <div key={layer.id}>
                              <p>{layer.name}</p>
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
    );
};

export default App;
