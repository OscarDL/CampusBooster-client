import { FC, useEffect, useState } from 'react';

import MobileDrawer from '../../components/app/drawers/MobileDrawer';
import DesktopDrawer from '../../components/app/drawers/DesktopDrawer';

import '../../components/app/drawers/Drawers.css';


const Drawer: FC = () => {
  const [mobile, setMobile] = useState(document.body.clientWidth <= 768);


  useEffect(() => {
    // Since the mobile drawer component from MUI is injected into the DOM,
    // We can't show / hide it reliably in a clean way with CSS media queries.
    const chooseDrawer = () => {
      setMobile(document.body.clientWidth <= 768);
    };

    window.addEventListener('resize', chooseDrawer)

    return () => window.removeEventListener('resize', chooseDrawer);
  }, [setMobile]);


  return (
    mobile ? <MobileDrawer/> : <DesktopDrawer/>
  );
};


export default Drawer;
