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
                            <div className="wraper">
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
                            <p className={groupByLayerName ? 'label' : 'label label-inactive'}>Group by name</p>
                        </div>
                        <div
                            className="refresh"
                            onClick={() => {
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
                                            width="14"
                                            height="14"
                                            viewBox="0 0 14 14"
                                            fill="none"
                                            xmlns="http://www.w3.org/2000/svg"
                                        >
                                            <path
                                                d="M8.18599e-08 6.99868C0.000585966 10.8595 3.15001 14.0053 7.00923 14C10.8635 13.9947 14.0021 10.8495 14 6.99458C13.9982 3.14314 10.85 -0.00175667 6.9978 9.53674e-07C3.14386 0.00205135 -0.000585802 3.14665 8.18599e-08 6.99868ZM5.05999 8.55033C5.19269 8.64992 5.33008 8.75977 5.47362 8.85995C6.42539 9.52344 7.43956 9.95961 8.63769 9.71853C8.66611 9.71267 8.71649 9.73171 8.73143 9.75486C9.01002 10.1948 9.24701 10.653 9.27953 11.1855C9.31146 11.7105 9.06451 12.105 8.69013 12.4495C7.61445 13.439 6.17786 13.4997 5.05706 12.5828C4.45389 12.0895 4.07102 11.4462 3.83725 10.7101C3.72505 10.3571 3.64508 9.99711 3.62575 9.66463C3.90375 9.49883 4.17501 9.37053 4.40585 9.19038C4.64138 9.00701 4.83706 8.77266 5.05999 8.55033ZM3.08117 9.21528C2.92473 9.21528 2.77358 9.22963 2.62593 9.21293C1.91379 9.13179 1.29451 8.82275 0.721224 8.41089C0.673474 8.37662 0.636563 8.30515 0.624846 8.24509C0.321651 6.65273 0.580319 5.15351 1.38152 3.74628C1.40378 3.70732 1.43219 3.67158 1.4653 3.62354C1.48405 3.65899 1.49371 3.67539 1.50133 3.69267C1.98117 4.7938 2.60806 5.80645 3.33837 6.7576C3.37206 6.80154 3.38377 6.88414 3.37001 6.9398C3.19248 7.6525 3.08322 8.37311 3.09288 9.10953C3.09318 9.14234 3.08556 9.17544 3.08117 9.21528ZM9.5672 2.43864C7.63817 2.12726 6.06156 2.76204 4.76353 4.1804C4.52654 3.80076 4.32441 3.41673 4.25557 2.98261C4.22803 2.8089 4.23301 2.61967 4.27139 2.44831C4.37861 1.972 4.71344 1.66384 5.11711 1.43448C6.04486 0.907497 7.04321 0.778901 8.08579 0.955538C8.46456 1.01969 8.82283 1.14565 9.12573 1.392C9.45588 1.66033 9.5962 2.01038 9.5672 2.43864ZM9.79862 9.20092C10.8207 8.39097 11.503 7.36953 11.911 6.14567C12.3176 6.43684 12.6686 6.77019 12.9193 7.19846C13.1262 7.55144 13.2504 7.93195 13.1927 8.34381C13.0746 9.18804 12.5836 9.78678 11.8776 10.2148C11.4927 10.4479 11.0826 10.4172 10.6947 10.1899C10.2952 9.95551 10.0289 9.59902 9.79862 9.20092ZM5.4994 0.689557C5.11506 0.842174 4.75211 1.02936 4.44071 1.30295C3.81381 1.85395 3.58268 2.52593 3.82348 3.34174C3.94476 3.75243 4.13752 4.12885 4.36806 4.48651C4.42313 4.57176 4.42372 4.62771 4.36953 4.71881C4.17267 5.04923 3.98577 5.38581 3.8059 5.72561C3.72124 5.88584 3.66119 6.05925 3.58913 6.22827C3.57243 6.21744 3.56188 6.21392 3.55661 6.2066C2.86585 5.2742 2.27206 4.28615 1.84641 3.2029C1.82708 3.15339 1.83997 3.06317 1.87454 3.02538C2.16689 2.70521 2.44753 2.3701 2.77035 2.08273C3.55603 1.38351 4.47323 0.92478 5.4994 0.689557ZM5.05618 4.63679C6.34776 3.00751 8.28851 2.639 9.4594 2.9583C9.42454 3.04442 9.38997 3.12937 9.35599 3.21461C9.19692 3.61182 9.03053 4.00611 8.88142 4.40713C8.8032 4.61745 8.81668 4.6198 8.59141 4.62595C7.58427 4.65407 6.68611 4.95051 5.97133 5.69631C5.96606 5.70188 5.95434 5.70129 5.92534 5.7092C5.63972 5.35651 5.34912 4.99826 5.05618 4.63679ZM9.46965 1.01442C10.8134 1.56454 11.8601 2.4612 12.6 3.7082C13.2281 4.76685 13.5184 5.91513 13.4973 7.15774C13.4674 7.14251 13.4554 7.14046 13.4522 7.13401C13.1437 6.51359 12.6627 6.05105 12.0985 5.66731C12.0215 5.61488 12.0153 5.55746 12.0106 5.47398C11.9936 5.15908 12.0048 4.83481 11.9295 4.5328C11.6966 3.59894 11.0633 3.01103 10.1961 2.65248C10.0957 2.61088 10.0585 2.57104 10.0675 2.45446C10.1015 2.00364 9.98113 1.595 9.68818 1.24495C9.62022 1.16381 9.54259 1.09087 9.46965 1.01442ZM11.4435 5.85244C11.2487 6.93628 10.1677 8.37105 9.56778 8.71027C9.08267 7.66304 8.98834 6.08532 9.22563 5.14853C10.0136 5.2326 10.753 5.46841 11.4435 5.85244ZM8.90075 9.10777C8.11479 8.02686 7.1724 7.09125 6.2839 6.09382C6.93833 5.37614 7.76941 5.14004 8.70683 5.12129C8.49591 6.46262 8.60693 7.75239 9.12749 9.00408C9.04723 9.04069 8.97809 9.07233 8.90075 9.10777ZM5.00667 13.169C3.46082 12.9135 1.13457 10.6336 0.882342 9.11832C1.58306 9.51963 2.31307 9.778 3.12247 9.72175C3.29589 11.1293 3.83549 12.3174 5.00667 13.169ZM8.30403 13.3497C8.50499 13.2067 8.71444 13.0737 8.90574 12.9188C9.80448 12.19 10.0175 11.3411 9.56691 10.2748C9.46115 10.0246 9.32757 9.78649 9.20073 9.53135C9.24789 9.50879 9.29886 9.48448 9.32728 9.47101C9.53761 9.73288 9.72041 10.0006 9.94275 10.23C10.6725 10.9831 11.568 11.061 12.4234 10.4664C12.4436 10.4523 12.4679 10.4444 12.5271 10.416C11.4971 11.9887 10.1071 12.9674 8.30403 13.3497ZM5.97661 6.50128C6.80387 7.42489 7.6496 8.27497 8.39514 9.2601C7.14164 9.39777 6.19924 8.82012 5.31954 8.11445C5.53983 7.57399 5.75221 7.05228 5.97661 6.50128ZM9.29418 4.6488C9.51681 4.11361 9.72832 3.6045 9.93982 3.09627C10.9724 3.44515 11.5947 4.39073 11.5041 5.30994C10.8198 4.9678 10.1039 4.74488 9.29418 4.6488ZM4.91909 7.78549C4.59187 7.42431 4.296 7.1015 4.00716 6.77224C3.97903 6.74002 3.9761 6.65976 3.99485 6.61641C4.17882 6.19283 4.36747 5.7713 4.56111 5.35212C4.60886 5.24842 4.68004 5.15557 4.74127 5.05685C5.03216 5.40485 5.31192 5.73615 5.58524 6.07243C5.60838 6.10114 5.60516 6.16998 5.58846 6.20923C5.46718 6.49543 5.33682 6.77781 5.21437 7.06342C5.11858 7.28604 5.0304 7.5116 4.91909 7.78549ZM3.59499 9.0943C3.58796 8.48207 3.65973 7.90852 3.77895 7.40087C4.06164 7.65718 4.35839 7.92609 4.65602 8.19618C4.38036 8.59163 4.06018 8.90624 3.59499 9.0943Z"
                                                fill="#C4C4C6"
                                            />
                                        </svg>
                                    </div>
                                    <div className="wraper">
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
                                                      width="14"
                                                      height="14"
                                                      viewBox="0 0 14 14"
                                                      fill="none"
                                                      xmlns="http://www.w3.org/2000/svg"
                                                  >
                                                      <path
                                                          d="M8.18599e-08 6.99868C0.000585966 10.8595 3.15001 14.0053 7.00923 14C10.8635 13.9947 14.0021 10.8495 14 6.99458C13.9982 3.14314 10.85 -0.00175667 6.9978 9.53674e-07C3.14386 0.00205135 -0.000585802 3.14665 8.18599e-08 6.99868ZM5.05999 8.55033C5.19269 8.64992 5.33008 8.75977 5.47362 8.85995C6.42539 9.52344 7.43956 9.95961 8.63769 9.71853C8.66611 9.71267 8.71649 9.73171 8.73143 9.75486C9.01002 10.1948 9.24701 10.653 9.27953 11.1855C9.31146 11.7105 9.06451 12.105 8.69013 12.4495C7.61445 13.439 6.17786 13.4997 5.05706 12.5828C4.45389 12.0895 4.07102 11.4462 3.83725 10.7101C3.72505 10.3571 3.64508 9.99711 3.62575 9.66463C3.90375 9.49883 4.17501 9.37053 4.40585 9.19038C4.64138 9.00701 4.83706 8.77266 5.05999 8.55033ZM3.08117 9.21528C2.92473 9.21528 2.77358 9.22963 2.62593 9.21293C1.91379 9.13179 1.29451 8.82275 0.721224 8.41089C0.673474 8.37662 0.636563 8.30515 0.624846 8.24509C0.321651 6.65273 0.580319 5.15351 1.38152 3.74628C1.40378 3.70732 1.43219 3.67158 1.4653 3.62354C1.48405 3.65899 1.49371 3.67539 1.50133 3.69267C1.98117 4.7938 2.60806 5.80645 3.33837 6.7576C3.37206 6.80154 3.38377 6.88414 3.37001 6.9398C3.19248 7.6525 3.08322 8.37311 3.09288 9.10953C3.09318 9.14234 3.08556 9.17544 3.08117 9.21528ZM9.5672 2.43864C7.63817 2.12726 6.06156 2.76204 4.76353 4.1804C4.52654 3.80076 4.32441 3.41673 4.25557 2.98261C4.22803 2.8089 4.23301 2.61967 4.27139 2.44831C4.37861 1.972 4.71344 1.66384 5.11711 1.43448C6.04486 0.907497 7.04321 0.778901 8.08579 0.955538C8.46456 1.01969 8.82283 1.14565 9.12573 1.392C9.45588 1.66033 9.5962 2.01038 9.5672 2.43864ZM9.79862 9.20092C10.8207 8.39097 11.503 7.36953 11.911 6.14567C12.3176 6.43684 12.6686 6.77019 12.9193 7.19846C13.1262 7.55144 13.2504 7.93195 13.1927 8.34381C13.0746 9.18804 12.5836 9.78678 11.8776 10.2148C11.4927 10.4479 11.0826 10.4172 10.6947 10.1899C10.2952 9.95551 10.0289 9.59902 9.79862 9.20092ZM5.4994 0.689557C5.11506 0.842174 4.75211 1.02936 4.44071 1.30295C3.81381 1.85395 3.58268 2.52593 3.82348 3.34174C3.94476 3.75243 4.13752 4.12885 4.36806 4.48651C4.42313 4.57176 4.42372 4.62771 4.36953 4.71881C4.17267 5.04923 3.98577 5.38581 3.8059 5.72561C3.72124 5.88584 3.66119 6.05925 3.58913 6.22827C3.57243 6.21744 3.56188 6.21392 3.55661 6.2066C2.86585 5.2742 2.27206 4.28615 1.84641 3.2029C1.82708 3.15339 1.83997 3.06317 1.87454 3.02538C2.16689 2.70521 2.44753 2.3701 2.77035 2.08273C3.55603 1.38351 4.47323 0.92478 5.4994 0.689557ZM5.05618 4.63679C6.34776 3.00751 8.28851 2.639 9.4594 2.9583C9.42454 3.04442 9.38997 3.12937 9.35599 3.21461C9.19692 3.61182 9.03053 4.00611 8.88142 4.40713C8.8032 4.61745 8.81668 4.6198 8.59141 4.62595C7.58427 4.65407 6.68611 4.95051 5.97133 5.69631C5.96606 5.70188 5.95434 5.70129 5.92534 5.7092C5.63972 5.35651 5.34912 4.99826 5.05618 4.63679ZM9.46965 1.01442C10.8134 1.56454 11.8601 2.4612 12.6 3.7082C13.2281 4.76685 13.5184 5.91513 13.4973 7.15774C13.4674 7.14251 13.4554 7.14046 13.4522 7.13401C13.1437 6.51359 12.6627 6.05105 12.0985 5.66731C12.0215 5.61488 12.0153 5.55746 12.0106 5.47398C11.9936 5.15908 12.0048 4.83481 11.9295 4.5328C11.6966 3.59894 11.0633 3.01103 10.1961 2.65248C10.0957 2.61088 10.0585 2.57104 10.0675 2.45446C10.1015 2.00364 9.98113 1.595 9.68818 1.24495C9.62022 1.16381 9.54259 1.09087 9.46965 1.01442ZM11.4435 5.85244C11.2487 6.93628 10.1677 8.37105 9.56778 8.71027C9.08267 7.66304 8.98834 6.08532 9.22563 5.14853C10.0136 5.2326 10.753 5.46841 11.4435 5.85244ZM8.90075 9.10777C8.11479 8.02686 7.1724 7.09125 6.2839 6.09382C6.93833 5.37614 7.76941 5.14004 8.70683 5.12129C8.49591 6.46262 8.60693 7.75239 9.12749 9.00408C9.04723 9.04069 8.97809 9.07233 8.90075 9.10777ZM5.00667 13.169C3.46082 12.9135 1.13457 10.6336 0.882342 9.11832C1.58306 9.51963 2.31307 9.778 3.12247 9.72175C3.29589 11.1293 3.83549 12.3174 5.00667 13.169ZM8.30403 13.3497C8.50499 13.2067 8.71444 13.0737 8.90574 12.9188C9.80448 12.19 10.0175 11.3411 9.56691 10.2748C9.46115 10.0246 9.32757 9.78649 9.20073 9.53135C9.24789 9.50879 9.29886 9.48448 9.32728 9.47101C9.53761 9.73288 9.72041 10.0006 9.94275 10.23C10.6725 10.9831 11.568 11.061 12.4234 10.4664C12.4436 10.4523 12.4679 10.4444 12.5271 10.416C11.4971 11.9887 10.1071 12.9674 8.30403 13.3497ZM5.97661 6.50128C6.80387 7.42489 7.6496 8.27497 8.39514 9.2601C7.14164 9.39777 6.19924 8.82012 5.31954 8.11445C5.53983 7.57399 5.75221 7.05228 5.97661 6.50128ZM9.29418 4.6488C9.51681 4.11361 9.72832 3.6045 9.93982 3.09627C10.9724 3.44515 11.5947 4.39073 11.5041 5.30994C10.8198 4.9678 10.1039 4.74488 9.29418 4.6488ZM4.91909 7.78549C4.59187 7.42431 4.296 7.1015 4.00716 6.77224C3.97903 6.74002 3.9761 6.65976 3.99485 6.61641C4.17882 6.19283 4.36747 5.7713 4.56111 5.35212C4.60886 5.24842 4.68004 5.15557 4.74127 5.05685C5.03216 5.40485 5.31192 5.73615 5.58524 6.07243C5.60838 6.10114 5.60516 6.16998 5.58846 6.20923C5.46718 6.49543 5.33682 6.77781 5.21437 7.06342C5.11858 7.28604 5.0304 7.5116 4.91909 7.78549ZM3.59499 9.0943C3.58796 8.48207 3.65973 7.90852 3.77895 7.40087C4.06164 7.65718 4.35839 7.92609 4.65602 8.19618C4.38036 8.59163 4.06018 8.90624 3.59499 9.0943Z"
                                                          fill="#C4C4C6"
                                                      />
                                                  </svg>
                                              </div>

                                              {/* print selectedOption as select that update setselectedOption */}

                                              {getOptionList(layerName)}
                                          </div>
                                      </div>
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
