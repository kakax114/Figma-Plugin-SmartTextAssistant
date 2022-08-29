import * as React from 'react';
import '../styles/ui.css';
import firstNames from './FirstNames';
import lastNames from './LastNames';

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
        'Email',
        'Password',
        'ID',
    ];

    //usestate for message
    const [layers, setLayers] = React.useState([]);
    const [groupByLayerName, setGroupByLayerName] = React.useState(false);
    const [insertOrder, setInsertOrder] = React.useState('random');
    const [userData, setUserData] = React.useState('');
    const [selectedOption, setSelectedOption] = React.useState([{name: 'All', option: options[0]}]);
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

    const genRandomAge = () => {
        return Math.floor(Math.random() * 100).toString();
    };

    const genRandomFirstNames = () => {
        return firstNames[Math.floor(Math.random() * firstNames.length)];
    };

    const genRandomLastNames = () => {
        return lastNames[Math.floor(Math.random() * lastNames.length)];
    };

    const updateText = (layer, e) => {
        layer.value = e.target.value;
        setLayers([...layers]);
        parent.postMessage({pluginMessage: {type: 'overwrite', result: layers}}, '*');
    };

    const randomize = (name) => {
        //find the option of the name in selectedoptions
        const option = selectedOption.find((e) => e.name === name).option;
        if (option === 'Full name') {
            return genRandomFullNames();
        } else if (option === 'Age') {
            return genRandomAge();
        } else if (option === 'First name') {
            return genRandomFirstNames();
        } else if (option === 'Last name') {
            return genRandomLastNames();
        }
    };

    return (
        <div>
            <h2>Hello world</h2>
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

            {/* show button and input only when groupByLayerName is false */}
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
                        onChange={(e) =>
                            setSelectedOption(
                                selectedOption.map((a) => {
                                    return {...a, option: e.target.value};
                                })
                            )
                        }
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
