import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const SupportedDeviceSection = () => {
    return (
        <div className="container lpMainContainer">
            <div className="row lpFlexWrapper" style={{ paddingTop: '36px',fontSize: '16pt' }}>
            </div>
            <div className="row lpFlexWrapper">
                <div className="col col-12 col-md-8">
                    <h2 className="H1" style={{ paddingBottom: '0px' }}>
                        Stream Anywhere</h2>
                </div>
            </div>

            <div className="row lpFlexWrapper" style={{ paddingTop: '35px' }}>
                <div className="col col-12 col-md-6">
                    <div className="lpSectionFont lpSectionBlack lpSectionTextCenter"> RunwayTV is available on Android, iOS, Roku, Android&nbsp;TV, Amazon Fire TV and the Web.</div>
                    <div className="lpSectionFont lpSectionBlack lpSectionTextCenter"></div>
                </div>
            </div>
            <div className="row lpFlexWrapper">
                <div className="Col Col--12 Col--sMd-8 Col--md-7 Col--lg-6 Col--xl-4">
                    <div className="streamIconWrapper streamSectionMargin">
                        <div className="streamIconIndividual">
                            <svg className="svgIcon iconWidth6" preserveAspectRatio="xMidYMid meet" viewBox="0 -5 80 40" style={{ fill: 'currentcolor' }}>
                                <path fill="currentColor" d="M11.88 8.45c0-2.1-1.7-3.8-3.78-3.8H6.25v7.57H8.1c2.07 0 3.77-1.7 3.77-3.77m8.5 15.11h-6.86L8.07 16H6.23v7.55H.18V.87h8.67c5 0 9.08 3.4 9.08 7.58 0 2.55-1.57 4.83-3.95 6.22l6.4 8.9"></path>
                                <path fill="currentColor" d="M27.2 9.81c-1.59 0-2.95 2.17-2.95 4.86 0 2.7 1.36 4.87 2.96 4.87 1.63 0 2.99-2.18 2.99-4.87s-1.36-4.86-3-4.86m9.32 4.86a9.27 9.27 0 01-9.31 9.25 9.24 9.24 0 110-18.5 9.27 9.27 0 019.31 9.25m14.2-8.87l-6.97 6.97v-7H37.7v17.78h6.05v-7.21l7.28 7.2h7.61L49.4 14.3l7.66-7.66V17.2c0 3.5 2.1 6.73 7.41 6.73a8.4 8.4 0 005.95-2.72l2.72 2.35h1.3V5.8h-6.06v11.5c-.68 1.18-1.63 1.93-3.1 1.93-1.48 0-2.17-.88-2.17-3.7V5.8H50.72z"></path>
                            </svg>
                        </div>
                        <div className="streamIconIndividual">
                            <svg className="svgIcon iconWidth100" preserveAspectRatio="xMidYMid meet" viewBox="0 0 184 39" style={{ fill: 'currentcolor' }}>
                                <defs>
                                    <path id="a" d="M5.66 8.67h4.42l-.85 2.62H5.66v14.67H2.39V11.29H.08V8.67h2.31V5.53c0-2.1.84-3.6 2.1-4.5C6.2-.18 8.98-.11 10.73.74l-.68 2.62c-1.95-.75-4.38-.76-4.38 2.43v2.89zM35.4 8.3c4.74 0 7.16 3.62 7.18 8.53v1.15h-11.1c.19 1.67.54 3.04 1.6 4.06 1.8 1.74 4.53 2.13 8.15.34l.97 2.25c-2.7 1.8-7.78 2.35-10.75.05-1.96-1.4-3.23-4.14-3.23-7.45 0-5.57 3.1-8.93 7.18-8.93zm.04 2.55c2.48 0 3.81 2.4 3.81 4.7l-7.74.03c0-2.67 1.73-4.73 3.92-4.73zM19 8.71h2.75l.33 2.13c2.22-2.56 4.88-3.12 6.9-2.05l-1.1 2.88c-2.02-1.11-3.8-.1-5.65 1.78v12.5h-3.23V8.72zm-6.13 17.25h3.23V8.7h-3.23v17.25zM14.5 1.02a2.1 2.1 0 110 4.22 2.1 2.1 0 010-4.22z"></path>
                                </defs>
                                <g fill="currentColor" fillRule="evenodd">
                                    <g transform="translate(107.97)">
                                        <mask id="b" fill="#fff">
                                            <use xlinkHref="#a"></use>
                                        </mask>
                                        <path fill="currentColor" d="M5.66 8.67h4.42l-.85 2.62H5.66v14.67H2.39V11.29H.08V8.67h2.31V5.53c0-2.1.84-3.6 2.1-4.5C6.2-.18 8.98-.11 10.73.74l-.68 2.62c-1.95-.75-4.38-.76-4.38 2.43v2.89zM35.4 8.3c4.74 0 7.16 3.62 7.18 8.53v1.15h-11.1c.19 1.67.54 3.04 1.6 4.06 1.8 1.74 4.53 2.13 8.15.34l.97 2.25c-2.7 1.8-7.78 2.35-10.75.05-1.96-1.4-3.23-4.14-3.23-7.45 0-5.57 3.1-8.93 7.18-8.93zm.04 2.55c2.48 0 3.81 2.4 3.81 4.7l-7.74.03c0-2.67 1.73-4.73 3.92-4.73zM19 8.71h2.75l.33 2.13c2.22-2.56 4.88-3.12 6.9-2.05l-1.1 2.88c-2.02-1.11-3.8-.1-5.65 1.78v12.5h-3.23V8.72zm-6.13 17.25h3.23V8.7h-3.23v17.25zM14.5 1.02a2.1 2.1 0 110 4.22 2.1 2.1 0 010-4.22z" mask="url(#b)"></path>
                                    </g>
                                    <path fill="currentColor" d="M63.2 32.28c-5.92 4.37-14.5 6.69-21.9 6.69a39.6 39.6 0 01-26.73-10.2c-.55-.5-.06-1.18.6-.8a53.83 53.83 0 0026.76 7.1 53.2 53.2 0 0020.4-4.17c1-.43 1.85.66.87 1.38"></path>
                                    <path fill="currentColor" d="M65.66 29.47c-.76-.97-5-.46-6.91-.23-.58.07-.67-.44-.15-.8 3.4-2.39 8.94-1.7 9.59-.9.65.8-.17 6.37-3.35 9.02-.49.41-.95.2-.73-.35.71-1.78 2.31-5.77 1.55-6.74m-6.78-17.85v-2.3c0-.36.27-.6.59-.6h10.36c.34 0 .6.24.6.59v1.98c0 .33-.28.77-.78 1.46l-5.37 7.66c2-.05 4.1.25 5.91 1.27.41.23.52.57.55.9v2.47c0 .34-.37.73-.76.53a11.94 11.94 0 00-10.95.02c-.36.2-.74-.2-.74-.54v-2.34c0-.38.01-1.02.39-1.6l6.22-8.91h-5.42a.58.58 0 01-.6-.59m-37.8 14.45h-3.15a.6.6 0 01-.57-.54V9.35a.6.6 0 01.61-.58h2.94c.3.01.55.25.57.54v2.11h.06c.77-2.04 2.2-3 4.15-3 1.97 0 3.21.96 4.1 3 .76-2.04 2.5-3 4.35-3 1.32 0 2.77.55 3.65 1.78 1 1.36.8 3.33.8 5.07v10.21a.6.6 0 01-.62.58h-3.15a.59.59 0 01-.56-.58V16.9c0-.67.06-2.38-.1-3.02-.23-1.1-.93-1.4-1.85-1.4-.76 0-1.56.5-1.88 1.33-.32.81-.3 2.18-.3 3.1v8.57a.6.6 0 01-.6.59h-3.15a.59.59 0 01-.57-.58V16.9c0-1.8.3-4.46-1.94-4.46-2.27 0-2.18 2.58-2.18 4.46v8.57a.6.6 0 01-.6.59m58.3-14.34c-2.33 0-2.48 3.17-2.48 5.14 0 1.98-.03 6.2 2.44 6.2 2.45 0 2.56-3.4 2.56-5.48 0-1.36-.06-3-.47-4.3-.35-1.12-1.06-1.56-2.06-1.56zm-.04-3.3c4.68 0 7.21 4.01 7.21 9.12 0 4.94-2.8 8.86-7.2 8.86-4.6 0-7.1-4.02-7.1-9.03 0-5.04 2.53-8.95 7.1-8.95zm13.28 17.64H89.5a.59.59 0 01-.56-.58l-.01-16.2a.6.6 0 01.6-.52h2.93c.28.01.5.2.56.45v2.47h.06c.88-2.2 2.12-3.27 4.3-3.27 1.4 0 2.8.52 3.68 1.91.82 1.3.82 3.48.82 5.04v10.18a.6.6 0 01-.6.51H98.1a.6.6 0 01-.57-.5v-8.79c0-1.77.21-4.36-1.97-4.36-.76 0-1.47.51-1.82 1.3-.44.98-.5 1.97-.5 3.06v8.71a.6.6 0 01-.62.58m-38.83-.04c-.2.2-.5.2-.74.08-1.05-.87-1.24-1.27-1.81-2.1-1.73 1.76-2.96 2.29-5.2 2.29-2.65 0-4.72-1.64-4.72-4.91 0-2.56 1.39-4.3 3.36-5.16 1.71-.75 4.1-.89 5.93-1.1v-.4c0-.75.06-1.64-.38-2.29-.39-.58-1.12-.82-1.77-.82-1.2 0-2.27.62-2.54 1.9-.05.28-.26.56-.54.58l-3.06-.33c-.26-.06-.54-.27-.47-.66.7-3.71 4.05-4.83 7.05-4.83 1.54 0 3.54.4 4.75 1.57 1.53 1.43 1.39 3.34 1.39 5.43v4.9c0 1.49.61 2.13 1.19 2.93.2.29.24.63-.01.84-.65.54-1.8 1.53-2.42 2.1v-.02zm-3.18-7.68c0 1.23.03 2.25-.59 3.34-.5.89-1.3 1.44-2.18 1.44-1.21 0-1.92-.93-1.92-2.3 0-2.68 2.41-3.16 4.7-3.16v.68zm-38.15 7.68c-.21.2-.51.2-.75.08-1.04-.87-1.23-1.27-1.8-2.1-1.73 1.76-2.96 2.29-5.2 2.29-2.66 0-4.72-1.64-4.72-4.91 0-2.56 1.39-4.3 3.36-5.16 1.71-.75 4.1-.89 5.93-1.1v-.4c0-.75.06-1.64-.38-2.29-.39-.58-1.12-.82-1.77-.82-1.2 0-2.28.62-2.54 1.9-.05.28-.26.56-.54.58L1 13.76c-.26-.06-.55-.27-.47-.66.7-3.71 4.05-4.83 7.05-4.83 1.53 0 3.54.4 4.75 1.57 1.53 1.43 1.39 3.34 1.39 5.43v4.9c0 1.49.61 2.13 1.19 2.93.2.29.24.63-.01.84-.65.54-1.8 1.53-2.42 2.1l-.01-.02zm-3.18-7.68c0 1.23.03 2.25-.59 3.34-.5.89-1.3 1.44-2.18 1.44-1.21 0-1.92-.93-1.92-2.3 0-2.68 2.41-3.16 4.69-3.16v.68zm166.95 7.5l6.9-17.1h-3.4l-3 7.85a92.97 92.97 0 00-1.78 4.85 97.27 97.27 0 00-1.77-4.85l-3.03-7.85h-3.4l6.92 17.1h2.56"></path>
                                    <path fill="currentColor" d="M165.97 11.3h-4.56v14.53h-3.15V11.31h-4.98V8.74h13.52l-.83 2.57"></path>
                                </g>
                            </svg>
                        </div>
                        {/* <div className="streamIconIndividual">
                            <svg className="svgIcon iconWidth100" preserveAspectRatio="xMidYMid meet" viewBox="0 0 108 36" style={{ fill: 'currentcolor' }}>
                                <path fill="currentColor" d="M90.907 23.5c-9.01 3.897-20.946 7.38-34.245 9.696-29.787 5.19-55.127 2.556-56.595-5.88-.795-4.567 5.577-9.9 16.32-14.652-.54.392-.912.96-1.04 1.74-.08.5-.092.95.025 1.51.488 2.28 4.454 2.94 5.03 4.386.108.27.074.618.023.828-.093.372-.345.75-1.088.75-.7 0-1.124-.4-1.124-1.014v-1.08h-2.995l-.002.864c0 2.49 1.96 3.24 4.06 3.24 2.02 0 3.683-.69 3.947-2.55.135-.965.035-1.597-.012-1.835-.47-2.337-4.708-3.035-5.023-4.343a1.48 1.48 0 0 1-.012-.588c.077-.356.32-.75 1.02-.75.653 0 1.038.405 1.038 1.014v.69h2.785v-.784c0-2.433-2.183-2.812-3.765-2.812a6.81 6.81 0 0 0-1.54.16c8.935-3.79 20.633-7.167 33.63-9.43 29.79-5.19 55.124-2.558 56.59 5.875.782 4.48-5.33 9.695-15.697 14.378.6-.438 1.003-1.088 1.087-2.003.033-.372.038-.527.04-.736v-2.997h-3.96v1.63h1.147v1.62c0 .143-.005.298-.025.426-.052.298-.335.81-1.144.81-.807 0-1.088-.51-1.137-.81a2.35 2.35 0 0 1-.028-.425v-5.106c0-.18.013-.38.047-.527.06-.278.298-.814 1.112-.814.85 0 1.066.568 1.113.815.033.16.04.426.037.425v.625h2.815v-.373s.01-.38-.026-.735c-.205-2.09-1.938-2.76-3.92-2.76-1.98 0-3.673.673-3.92 2.76a8.212 8.212 0 0 0-.047.735l-.003 4.702c.004.21.01.364.04.736.19 2.03 1.95 2.756 3.93 2.756a6.46 6.46 0 0 0 1.513-.165zm-11.01-2.45h-.06l-2.567-8.766h-4.147v11.05h2.747l-.153-9.068h.06l2.757 9.068h3.975v-11.05h-2.765l.153 8.767zm-50.25-7.73h.063l1.487 10.13H34.2l-2.06-11.166h-4.967l-2.07 11.166h3.014l1.53-10.13zm13.02 7.5h-.058l-1.38-8.536h-4.556l-.247 11.166h2.797l.07-10.038h.06l1.868 10.038h2.833l1.867-10.038h.058l.073 10.038h2.79l-.24-11.166h-4.555l-1.38 8.536zm14.042-.54c.11.268.074.606.024.816-.09.37-.34.743-1.078.743-.69 0-1.112-.402-1.112-1l-.003-1.073H51.58l-.004.854c0 2.465 1.942 3.21 4.02 3.21 2 0 3.647-.682 3.907-2.526.136-.958.04-1.58-.01-1.814-.467-2.316-4.663-3.007-4.975-4.3a1.403 1.403 0 0 1-.01-.58c.08-.357.32-.74 1.01-.74.647 0 1.024.393 1.024 1v.68h2.763v-.775c0-2.406-2.166-2.784-3.732-2.784-1.962 0-3.572.65-3.863 2.454-.08.495-.09.934.026 1.49.48 2.26 4.408 2.915 4.976 4.346zm9.38 1.5c-.782 0-1.017-.537-1.078-.81a2.673 2.673 0 0 1-.026-.428V12.28h-2.82v8.01a9.53 9.53 0 0 0 .022.733c.196 2.084 1.845 2.76 3.9 2.76 2.05 0 3.7-.676 3.897-2.76.01-.106.03-.528.023-.733v-8.01h-2.823v8.262a2.32 2.32 0 0 1-.027.427c-.053.273-.295.81-1.07.81z"></path>
                            </svg>
                        </div> */}
                        <div className="streamIconIndividual">
                            <svg className="svgIcon iconWidth5" preserveAspectRatio="xMidYMid meet" viewBox="0 0 75 17" style={{ fill: 'currentcolor' }}>
                                <path fill="currentColor" fillRule="evenodd" d="M75,23.9816532 L75,8.75 L72.1065272,8.75 L72.1065272,13.2483367 C71.2977067,12.4633317 70.1965978,12.0311744 68.8380544,12.0311744 C65.5219506,12.0311744 63.0018901,14.7260333 63.0018901,18.09937 C63.0018901,21.486996 65.5219506,24.2279738 68.8380544,24.2279738 C70.1965978,24.2279738 71.2977067,23.7592238 72.1065272,22.9742944 L72.1065272,23.9816532 L75,23.9816532 Z M69.1543095,21.4393649 C67.3730595,21.4393649 65.93188,19.9505544 65.93188,18.09937 C65.93188,16.2831905 67.3730595,14.7720766 69.1543095,14.7720766 C70.3380544,14.7720766 71.4613911,15.3584677 72.0238911,16.3308972 C72.0604083,16.400756 72.1065272,16.4945817 72.1065272,16.6120716 L72.1065272,19.588256 C72.1065272,19.647001 72.0715978,19.7519405 72.0477067,19.78687 C71.4979839,20.7942288 70.3729839,21.4393649 69.1543095,21.4393649 L69.1543095,21.4393649 Z M58.794254,23.9816532 L61.6893145,23.9816532 L61.6893145,12.2647177 L58.794254,12.2647177 L58.794254,23.9816532 Z M60.2482107,11.3749244 C61.1745968,11.3749244 61.9245212,10.6122228 61.9245212,9.6875 C61.9245212,8.75 61.1745968,8 60.2482107,8 C59.3234123,8 58.5734123,8.75 58.5734123,9.6875 C58.5734123,10.6122228 59.3234123,11.3749244 60.2482107,11.3749244 L60.2482107,11.3749244 Z M51.3548891,24.2167843 C54.7425151,24.2167843 57.4834173,21.486996 57.4834173,18.09937 C57.4834173,14.7260333 54.7425151,12.0311744 51.3548135,12.0311744 C47.9815524,12.0311744 45.2389869,14.7260333 45.2389869,18.09937 C45.2389869,21.486996 47.9815524,24.2167843 51.3548135,24.2167843 L51.3548891,24.2167843 Z M51.3548891,21.299496 C49.5974546,21.299496 48.1689768,19.8694304 48.1689768,18.09937 C48.1689768,16.3420111 49.5974546,14.9135333 51.3548891,14.9135333 C53.1360635,14.9135333 54.5550151,16.3420111 54.5550151,18.09937 C54.5550151,19.8694304 53.1360635,21.299496 51.3548891,21.299496 L51.3548891,21.299496 Z M42.2041331,23.9816532 L42.2041331,17.72437 C42.2041331,15.8732611 43.1764869,14.8897177 45.0275958,14.8897177 L45.0275958,12.0311744 C41.3015625,12.0311744 39.3105847,14.0110383 39.3105847,17.72437 L39.3105847,23.9816532 L42.2041331,23.9816532 Z M37.7756552,23.9816532 L37.7756552,8.75 L34.8805948,8.75 L34.8805948,13.2483367 C34.0734375,12.4633317 32.9706653,11.9946573 31.6121976,11.9946573 C28.2960181,11.9946573 25.7775454,14.7260333 25.7775454,18.09937 C25.7775454,21.486996 28.2960181,24.2167843 31.6121976,24.2167843 C32.9706653,24.2167843 34.0734375,23.7592238 34.8805948,22.9742944 L34.8805948,23.9816532 L37.7756552,23.9816532 Z M31.928377,21.4393649 C30.147127,21.4393649 28.7059476,19.9505544 28.7059476,18.09937 C28.7059476,16.2831905 30.147127,14.7720766 31.928377,14.7720766 C33.112122,14.7720766 34.237122,15.3584677 34.7995464,16.3308972 C34.8345514,16.400756 34.8805948,16.4945817 34.8805948,16.6120716 L34.8805948,19.5770665 C34.8805948,19.6359627 34.8456653,19.7519405 34.8234375,19.78687 C34.2720514,20.7942288 33.1470514,21.4393649 31.928377,21.4393649 L31.928377,21.4393649 Z M24.5699093,23.9816532 L24.5699093,17.6433216 C24.5699093,14.5258317 22.1451865,12.0311744 19.0515121,12.0311744 C15.9466482,12.0311744 13.5331149,14.5258317 13.5331149,17.6433216 L13.5331149,23.9816532 L16.4265877,23.9816532 L16.4265877,17.6433216 C16.4265877,16.1083921 17.5054687,14.9357611 19.0515121,14.9357611 C20.5864415,14.9357611 21.6764365,16.1083921 21.6764365,17.6433216 L21.6764365,23.9816532 L24.5699093,23.9816532 Z M11.9981855,23.9816532 L11.9981855,12.2647177 L9.1030494,12.2647177 L9.1030494,13.2483367 C8.29430444,12.4633317 7.19319556,12.0311744 5.83457661,12.0311744 C2.51847278,12.0311744 0,14.7260333 0,18.09937 C0,21.486996 2.51847278,24.2167843 5.83457661,24.2167843 C7.19319556,24.2167843 8.29430444,23.7592238 9.1030494,22.9742944 L9.1030494,23.9816532 L11.9981855,23.9816532 Z M6.15083165,21.4393649 C4.36958165,21.4393649 2.92840222,19.9505544 2.92840222,18.09937 C2.92840222,16.2831905 4.36958165,14.7720766 6.15083165,14.7720766 C7.33457661,14.7720766 8.51832157,15.3234627 9.02207661,16.3308972 C9.05700605,16.400756 9.1030494,16.4945817 9.1030494,16.6120716 L9.1030494,19.5643649 C9.1030494,19.6231855 9.06811996,19.7519405 9.04430444,19.78687 C8.49450605,20.7942288 7.36958165,21.4393649 6.15083165,21.4393649 L6.15083165,21.4393649 Z" transform="translate(0 -8)"></path>
                            </svg>
                        </div>
                        <div className="streamIconIndividual">
                            <svg className="svgIcon iconWidth100" preserveAspectRatio="xMidYMid meet" viewBox="0 0 120 24" style={{ fill: 'currentcolor' }}>
                                <path fill="currentColor" fillRule="evenodd" d="M595.030896,21.2930062 C593.508634,21.2930062 592.061767,20.6129174 591.072058,19.6313583 C590.691492,19.2539269 590.386322,18.8764955 590.082348,18.423103 L589.930361,18.2723678 L584.827432,9.58788421 C583.685736,11.4002672 583,13.5900817 583,15.9318182 C583,22.0490559 587.567983,27.0328125 593.507438,27.7117143 L597.61946,20.6129174 C596.858329,21.0663099 595.944014,21.2930062 595.030896,21.2930062 L595.030896,21.2930062 Z M597.848039,11.3254931 C599.370301,12.3070522 600.436602,13.9687 600.436602,15.9318182 C600.436602,16.3092496 600.36001,16.7626421 600.284615,17.1400735 L600.284615,17.2160346 C600.208035,17.8201622 599.980653,18.3483289 599.675483,18.8776824 L594.498344,27.8636364 L594.955501,27.8636364 C601.579495,27.8636364 606.986398,22.5772225 606.986398,15.9318182 C606.985201,14.2701704 606.680031,12.6844836 606.070886,11.3254931 L597.848039,11.3254931 Z M590.689099,15.9318182 C590.689099,18.2735547 592.593123,20.2366729 595.0297,20.2366729 C597.390881,20.2366729 599.370301,18.3483289 599.370301,15.9318182 C599.370301,13.5153075 597.390881,11.5510024 595.030896,11.6269635 C592.669715,11.6269635 590.689099,13.5900817 590.689099,15.9318182 L590.689099,15.9318182 Z M589.549796,16.0813665 L589.549796,15.8546702 C589.549796,13.2114633 591.529215,10.9456879 594.042383,10.5682564 L594.118975,10.5682564 C594.576133,10.4175212 595.032093,10.4175212 595.48925,10.4175212 L605.616123,10.4175212 C603.63431,6.64320691 599.598879,4 595.030896,4 C591.072058,4 587.56918,5.88834405 585.361182,8.83302135 L589.473204,15.7798961 C589.549796,15.8558571 589.549796,16.0065923 589.549796,16.0813665 L589.549796,16.0813665 Z M693.636856,15.6303478 L691.96141,15.2529164 C691.276871,15.1021812 690.819714,14.7995239 690.819714,14.2713573 C690.819714,13.5912685 691.582041,13.2138371 692.495159,13.2138371 C693.332882,13.2138371 694.170605,13.5153075 694.474579,14.3461314 L695.844854,13.7420037 C695.311105,12.4589743 694.017433,11.7788855 692.570554,11.7788855 C690.819714,11.7788855 689.22086,12.7616315 689.22086,14.2713573 C689.22086,15.781083 690.74433,16.3852107 691.50545,16.6119069 L693.25629,16.9893383 C694.16942,17.2160346 694.397999,17.6682401 694.397999,18.1216326 C694.397999,18.8764955 693.712263,19.329888 692.722553,19.329888 C691.732831,19.329888 690.895109,18.8017213 690.437951,17.7442012 L688.991084,18.3483289 C689.448242,19.5565842 690.667715,20.7660264 692.647146,20.7660264 C694.626565,20.7660264 695.996841,19.6325452 695.996841,18.1228076 C695.996841,17.0652994 695.312301,16.0077792 693.636856,15.6303478 L693.636856,15.6303478 Z M675.589913,19.3310748 C674.219638,19.3310748 672.924757,18.0468585 672.924757,16.2344755 C672.924757,14.3461314 674.219638,13.1378761 675.589913,13.1378761 C676.731609,13.1378761 677.569332,13.7420037 677.949898,14.7235628 L679.396777,14.1194352 C678.863027,12.9111798 677.721331,11.7029245 675.665308,11.7029245 C673.076756,11.7029245 671.249312,13.6660427 671.249312,16.2332886 C671.249312,18.8005344 673.076744,20.7648395 675.743096,20.7660264 C677.799119,20.7660264 679.017384,19.5577711 679.549936,18.3495157 L678.103081,17.7453881 C677.645924,18.7269472 676.808201,19.3310748 675.589913,19.3310748 L675.589913,19.3310748 Z M683.737365,19.329888 C682.899643,19.329888 681.986525,18.8764955 681.986525,17.9708974 C681.986525,17.2148477 682.671064,16.3092496 684.34651,16.3092496 C685.716785,16.3092496 686.402521,16.8374162 686.402521,16.8374162 C686.402521,18.2723678 685.107641,19.329888 683.737365,19.329888 L683.737365,19.329888 Z M684.194535,11.7776987 C681.986537,11.7776987 680.99563,13.061915 680.691669,13.8167779 L682.138524,14.4209056 C682.443694,13.6660427 683.281417,13.2126502 684.194535,13.2126502 C685.336231,13.2126502 686.402533,13.9675131 686.402533,15.2517295 L686.402533,15.5543868 C686.097362,15.3276905 685.259639,15.0262201 684.117943,15.0262201 C682.137327,15.0262201 680.386474,16.0825534 680.386474,17.9708974 C680.386474,19.7073194 681.833341,20.7648395 683.585379,20.7636526 C685.032246,20.7636526 685.945363,20.0087898 686.402521,19.3287011 L686.479113,19.3287011 L686.479113,20.5369564 L688.001387,20.5369564 L688.001387,15.4024647 C688.001387,12.985954 686.250546,11.7776987 684.194535,11.7776987 L684.194535,11.7776987 Z M657.77156,11.7776987 C656.477877,11.7776987 655.411564,12.4577874 654.802431,13.4393465 C654.346459,12.3818263 653.432156,11.7776987 652.061881,11.7776987 C650.995568,11.7776987 649.853883,12.3818263 649.396714,13.2126502 L649.320122,13.2126502 L649.320122,12.0043949 L647.79786,12.0043949 L647.79786,12.0055818 L647.720071,12.0055818 L647.720071,20.5393302 L649.318925,20.5393302 L649.318925,15.857044 C649.318925,14.4980535 650.232055,13.2138371 651.526923,13.2138371 C652.745223,13.2138371 653.430947,13.8179648 653.430947,15.5543868 L653.430947,20.5393302 L655.029813,20.5393302 L655.029813,15.857044 C655.029813,14.4980535 655.942919,13.2138371 657.237811,13.2138371 C658.4561,13.2138371 659.141836,13.8179648 659.141836,15.5543868 L659.141836,20.5369564 L660.817281,20.5369564 L660.817281,15.3265036 C660.817281,13.2126502 659.82756,11.7776987 657.77156,11.7776987 L657.77156,11.7776987 Z M663.710991,15.2517295 C664.016162,14.0434741 664.929292,13.2126502 666.14758,13.2126502 C667.975012,13.2126502 668.584168,14.4968666 668.660748,15.2517295 L663.710991,15.2517295 Z M666.14758,11.7029245 C663.63562,11.7029245 661.960174,13.8167779 661.960174,16.2332886 C661.960174,18.8005344 663.711003,20.7648395 666.373765,20.8384268 C668.354381,20.8384268 669.572669,19.7061325 670.105222,18.4978772 L668.658355,17.8937495 C668.202394,18.9512696 667.211476,19.3287011 666.298382,19.3287011 C664.928107,19.3287011 663.634411,18.347142 663.557832,16.534759 L670.334985,16.534759 L670.334985,16.2332886 C670.334985,13.5153075 668.660748,11.7029245 666.14758,11.7029245 L666.14758,11.7029245 Z M617.949808,19.4070359 C616.579533,19.4070359 615.284641,18.1228195 615.284641,16.3104365 C615.284641,14.4220925 616.579533,13.2138371 617.949808,13.2138371 C619.091492,13.2138371 619.929215,13.8179648 620.309781,14.7995239 L621.756648,14.1194352 C621.222899,12.9111798 620.081202,11.7029245 618.025191,11.7029245 C615.436627,11.7029245 613.609195,13.6660427 613.609195,16.2332886 C613.609195,18.8005344 615.436627,20.7648395 618.10298,20.8419875 C620.158991,20.8419875 621.377279,19.6337321 621.909831,18.4254768 L620.462976,17.8213491 C620.005807,18.8029082 619.168084,19.4070359 617.949808,19.4070359 L617.949808,19.4070359 Z M627.390932,11.7776987 C626.172644,11.7776987 625.107539,12.4577874 624.650382,13.2126502 L624.573802,13.2126502 L624.650382,12.0043949 L624.650382,8.15293264 L623.051528,8.15293264 L623.051528,20.5393302 L624.650382,20.5393302 L624.650382,15.857044 C624.650382,14.4980535 625.564696,13.2138371 626.934972,13.2138371 C628.15326,13.2138371 629.066378,13.8179648 629.066378,15.5543868 L629.066378,20.5369564 L630.665244,20.5369564 L630.665244,15.3265036 C630.665244,13.2126502 629.59893,11.7776987 627.390932,11.7776987 L627.390932,11.7776987 Z M642.086984,19.329888 C640.640129,19.329888 639.269854,18.1975937 639.269854,16.2332886 C639.269854,14.2689835 640.640129,13.1366892 642.086984,13.1366892 C643.533851,13.1366892 644.904126,14.2701704 644.904126,16.2332886 C644.904126,18.1964068 643.533851,19.329888 642.086984,19.329888 L642.086984,19.329888 Z M642.086984,11.7029245 C639.49842,11.7029245 637.670988,13.6660427 637.670988,16.2332886 C637.670988,18.8005344 639.49842,20.7636526 642.086984,20.7636526 C644.675547,20.7636526 646.50298,18.8005344 646.50298,16.2332886 C646.50298,13.6660427 644.675547,11.7029245 642.086984,11.7029245 L642.086984,11.7029245 Z M701.629916,18.9524565 C701.401349,19.1031917 701.173968,19.1031917 700.868797,19.1031917 C700.107654,19.1031917 699.727089,18.7257603 699.727089,17.7442012 L699.727089,13.4393465 L701.7831,13.4393465 L701.7831,12.0043949 L699.727089,12.0043949 L699.727089,9.43714902 L698.128247,9.43714902 L698.128247,12.0043949 L696.605985,12.0043949 L696.605985,13.4393465 L698.128247,13.4393465 L698.128247,17.8949364 C698.128247,19.6313583 699.117956,20.6129174 700.867588,20.5381433 C701.401349,20.5381433 701.781915,20.4621823 702.162469,20.3114471 L701.629916,18.9524565 Z M636.452699,11.7776987 C635.538385,11.7776987 634.320097,12.3818263 633.939531,13.3633854 L633.862939,13.3633854 L633.862939,12.0043949 L632.340677,12.0043949 L632.340677,20.5381433 L634.016123,20.5381433 L634.016123,15.8558571 C634.016123,14.2689835 635.157819,13.3633854 636.224121,13.3633854 C636.529291,13.3633854 636.833265,13.4381596 637.061844,13.5141206 L637.670988,12.0043949 C637.290422,11.8536597 636.985252,11.7776987 636.452699,11.7776987 L636.452699,11.7776987 Z" transform="translate(-583 -4)"></path>
                            </svg>
                        </div>
                        <div className="streamIconIndividual">
                            <svg className="svgIcon iconWidth5" preserveAspectRatio="xMidYMid meet" viewBox="0 -5 60 30" style={{ fill: 'currentcolor' }}>
                                <path fill="currentColor" fillRule="evenodd" d="M45.72 22.26c-3.31 0-5.7-1.87-5.83-4.55h.89c.13 2.2 2.2 3.73 5 3.73 2.75 0 4.67-1.56 4.67-3.66 0-1.7-1.14-2.67-3.86-3.35l-1.91-.47c-3-.77-4.35-1.98-4.35-4 0-2.52 2.35-4.34 5.3-4.34 3.05 0 5.32 1.8 5.43 4.17h-.89c-.12-1.94-2.02-3.35-4.56-3.35-2.43 0-4.37 1.46-4.37 3.5 0 1.61 1.19 2.54 3.78 3.19l1.81.46c3.13.77 4.53 1.97 4.53 4.12 0 2.68-2.25 4.55-5.64 4.55zm-13.64 0c-4.41 0-7.2-3.21-7.2-8.33 0-5.08 2.8-8.31 7.2-8.31s7.2 3.23 7.2 8.31c0 5.12-2.78 8.33-7.2 8.33zM22.85 7a.69.69 0 110-1.38c.39 0 .7.3.7.7 0 .37-.31.68-.7.68zm-.44 15.03h.9V9.96h-.9v12.07zM13.35 5.34c.72.03 2.74.3 4.04 2.18a4.98 4.98 0 00-2.4 4.2c.03 3.32 2.92 4.44 2.96 4.46-.04.08-.47 1.59-1.53 3.13l-.25.37c-.85 1.2-1.76 2.31-3.13 2.34-1.48.03-1.95-.87-3.64-.87-1.69 0-2.22.84-3.62.9-1.43.05-2.54-1.46-3.47-2.8C.43 16.5-1.02 11.5.92 8.15A5.36 5.36 0 015.5 5.38c1.41-.03 2.77.96 3.64.96.87 0 2.5-1.18 4.22-1zm18.73 1.1l.24.01c3.7.12 6.06 3 6.06 7.48 0 4.59-2.45 7.5-6.3 7.5-3.83 0-6.3-2.91-6.3-7.5 0-4.58 2.46-7.48 6.3-7.48zM13.37 0a4.9 4.9 0 01-1.15 3.52 4.14 4.14 0 01-3.27 1.56 4.59 4.59 0 011.16-3.41A4.99 4.99 0 0113.37 0z"></path>
                            </svg>
                        </div>
                        {/* <div className="streamIconIndividual">
                            <svg className="svgIcon iconWidth5" preserveAspectRatio="xMidYMid meet" viewBox="0 -5 60 30" style={{ fill: 'currentcolor' }}>
                                <path fill="currentColor" d="M14.99 11.71c.03 3.33 2.92 4.45 2.96 4.47-.04.08-.47 1.59-1.53 3.13-.92 1.34-1.87 2.68-3.38 2.71-1.48.03-1.95-.87-3.64-.87-1.69 0-2.22.84-3.62.9-1.43.05-2.54-1.46-3.47-2.8C.43 16.5-1.02 11.5.92 8.15A5.36 5.36 0 015.5 5.38c1.41-.03 2.77.96 3.64.96.87 0 2.5-1.18 4.22-1 .72.02 2.74.29 4.04 2.17a4.98 4.98 0 00-2.4 4.2m-2.77-8.2A4.9 4.9 0 0013.37 0a5 5 0 00-3.26 1.67 4.6 4.6 0 00-1.16 3.4c1.23.1 2.5-.63 3.27-1.55m16.56 18.13c-.95.27-1.93.4-2.92.4-2.32 0-3.48-1.32-3.48-3.95V6.5h-2V4.4h2.11V1.66L25.3.52v3.9h3.21v2.1h-3.2v10.96c0 .84.14 1.42.4 1.76.27.34.75.5 1.42.5.39 0 .93-.08 1.66-.22v2.13zm10.15.42h-3.42L29.2 4.69h3.08l3.82 11.3c.14.44.51 1.7 1.1 3.8l.57-1.88.62-1.9 3.95-11.34h3.07l-6.48 17.4z"></path>
                            </svg>
                        </div> */}
                    </div>
                    <div className="lpFlexWrapper">
                        <Link to="/supportdevice">
                            <button className="button buttonLarge buttonSecondary buttonInverse">
                                <div className="buttonBg"></div>
                                <div className="buttonContent">Supported Devices</div>
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default SupportedDeviceSection;
