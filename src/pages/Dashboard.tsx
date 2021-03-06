import React, { useState, useEffect, useContext } from "react";
import { ButtonContext } from "../contexts/ButtonsContext";
import { Toolbar } from "../components/containers/toolbar";
import { LoaderPage } from "../components/decorators/loader-page/loader-page";
import { UserContext } from "../contexts/UserContext";
import { BiCalendarEvent } from 'react-icons/bi';
import { DiGoogleAnalytics } from 'react-icons/di';
import { IVerticalToolbarItem, VerticalToolbar } from "../components/pages/dashboard/vertical-toolbar";
import { ReserveManager } from "../components/pages/dashboard/reserves-manager";
import { LoginDialog } from "../components/dialogs/login-dialog";
import "./Dashboard.scss";
import { PageBase } from "../components/pages/page-base";
import { ReserveDialog } from "../components/dialogs/reserve-dialog";
import { Button } from "../components/inputs/button";
import { FaAccessibleIcon } from "react-icons/fa";
import { IconX } from '../components/decorators/icon'
import { DASHBOARD_PAGE } from "../types/Pages.type";


const DashboardPage = () => {
  // Wizard is used for set the actual tool
  const [wizard, setWizard] = useState(0);

  const verticalToolbarItems: IVerticalToolbarItem[] = [
    {
      icon: <BiCalendarEvent />,
      tool: <ReserveManager />,
      label: 'Administracion de Reservas',
    },
    // {
    //   icon: <DiGoogleAnalytics />,
    //   tool: <div />,
    //   label: 'Estadisticas'
    // }
  ];


  const getToolByWizard = (wizard: number) => {
    return verticalToolbarItems[wizard].tool;
  }


  const {
    // @ts-ignore
    disabled,
    setDisabledButton,
  } = useContext(ButtonContext);
  const {
    // @ts-ignore
    userIsAdmin,
  } = useContext(UserContext);



  // TODO refix the control access - use router or API GATEWAY
  useEffect(() => {
    // check user is admin
    // if (!userIsAdmin()) {
    //   document.location.href = "/";
    // }
  }, []);


  return (
    <PageBase toolbar={
      <Toolbar rightItems={[<LoginDialog pageRef={DASHBOARD_PAGE} />]} />
    }>
      <VerticalToolbar
        items={verticalToolbarItems}
        onSelectItem={setWizard}
        sizeIcons="large"
      />
      {getToolByWizard(wizard)}
    </PageBase>
  )
}

export default DashboardPage;
