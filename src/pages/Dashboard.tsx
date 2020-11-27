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


  useEffect(() => {
    // check user is admin
    // !userIsAdmin() ? (document.location.href = "/") : (
    false && (document.location.href = "/")
  }, []);


  return (
    <PageBase toolbar={
      <Toolbar rightItems={[<ReserveDialog />, <LoginDialog />]} />
    }>
      <VerticalToolbar
        items={verticalToolbarItems}
        onSelectItem={setWizard}
      />
      {getToolByWizard(wizard)}
    </PageBase>
  )
}

export default DashboardPage;
