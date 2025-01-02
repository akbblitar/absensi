import React from "react";
import TambahGajiLayouts from "../../Layouts/Gaji/TambahGajiLayouts";

const TambahGaji = (props) => {
    return <TambahGajiLayouts onLogout={props.onLogout} />;
};

export default TambahGaji;