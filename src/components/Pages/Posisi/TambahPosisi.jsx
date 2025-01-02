import React from 'react';
import TambahPosisiLayouts from '../../Layouts/Posisi/TambahPosisiLayouts';

const TambahPosisi = (props) => {
    return <TambahPosisiLayouts onLogout={props.onLogout} />;
};

export default TambahPosisi;