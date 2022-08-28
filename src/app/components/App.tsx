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
    const [selectedOption, setSelectedOption] = React.useState(options[0]);

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

    const genRandomFullNames = () => {
        return (
            firstNames[Math.floor(Math.random() * firstNames.length)] +
            ' ' +
            lastNames[Math.floor(Math.random() * lastNames.length)]
        );
    };

    const updateText = (layer, e) => {
        layer.value = e.target.value;
        setLayers([...layers]);
        parent.postMessage({pluginMessage: {type: 'overwrite', result: layers}}, '*');
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
                                    value: genRandomFullNames(),
                                };
                            });
                            setLayers(updatedLayers);
                            parent.postMessage({pluginMessage: {type: 'overwrite', result: updatedLayers}}, '*');
                        }}
                    >
                        Random
                    </button>
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
                                                  value: genRandomFullNames(),
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
                              <Dropdown
                                  options={options}
                                  selectedOption={selectedOption}
                                  setSelectedOption={setSelectedOption}
                              />
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

const Dropdown = ({options, selectedOption, setSelectedOption}) => {
    return (
        <select onChange={(e) => setSelectedOption(e.target.value)} value={selectedOption}>
            {options.map((option) => (
                <option key={option} value={option}>
                    {option}
                </option>
            ))}
        </select>
    );
};

export default App;
