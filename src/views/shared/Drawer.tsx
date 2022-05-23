import { FC, useEffect, useState } from 'react';

import { maxMobileWidth } from '../../shared/utils/values';

import SideDrawer from '../../components/app/drawers/SideDrawer';
import SwipeDrawer from '../../components/app/drawers/SwipeDrawer';

import '../../components/app/drawers/Drawers.css';


export const isNarrowWidth = () => document.body.clientWidth <= maxMobileWidth;
export const isTouchDevice = () => window.matchMedia('(pointer: coarse)').matches;


const Drawer: FC = () => {
  const [mobile, setMobile] = useState(isTouchDevice() && isNarrowWidth());
  const [collapsed, setCollapsed] = useState(!isTouchDevice() && isNarrowWidth());


  useEffect(() => {
    // Since the mobile drawer component from MUI is injected into the DOM,
    // We can't show / hide it reliably in a clean way with CSS media queries.
    const chooseDrawer = () => {
      setMobile(isTouchDevice() && isNarrowWidth());
      setCollapsed(!isTouchDevice() && isNarrowWidth());
    };

    window.addEventListener('resize', chooseDrawer)

    return () => window.removeEventListener('resize', chooseDrawer);
  }, [setMobile]);


  return (
    mobile ? <SwipeDrawer/> : <SideDrawer forceCollapse={collapsed}/>
  );
};


export default Drawer;
