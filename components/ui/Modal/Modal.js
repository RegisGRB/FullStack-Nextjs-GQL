import React from 'react';
import MotionFade from "../../Motion/MotionFade";
import { motion } from "framer-motion";
import {GrClose} from "react-icons/gr";
import MotionModal from "../../Motion/MotionModal";
import StyledTheme from '../../StyledComponents/StyledTheme';
const Modal = ({ModalContent,triggerClassName,variants,...props}) => {
const [openSettings,setopenSettings] = React.useState(false);

    return (
        <>
        <motion.div className={triggerClassName} onClick={() => {setopenSettings(true)}}>
                {props.children}
        </motion.div>
        <MotionModal controller={openSettings} variants={variants}>
            {ModalContent}
            <StyledTheme as={GrClose} strokecolor="true" onClick={()=>setopenSettings(false)} cursor="pointer" absolute="true" top="10%" right="10%" ></StyledTheme>
        </MotionModal>
    </>
    );
};

export default Modal;