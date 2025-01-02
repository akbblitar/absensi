import React from "react";
import EditGajiLayouts from "../../Layouts/Gaji/EditGajiLayouts";

const EditGaji = (props) => {
    return <EditGajiLayouts onLogout={props.onLogout} />;
};

export default EditGaji;