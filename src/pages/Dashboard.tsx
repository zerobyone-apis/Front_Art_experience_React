import React, { useState, useEffect, useContext } from "react";
import { ButtonContext } from "../contexts/ButtonsContext";
import { Toolbar } from "../components/toolbar";
import { LoaderPage } from "../components/loader-page/loader-page";
import { UserContext } from "../contexts/UserContext";
import { BiCalendarEvent } from 'react-icons/bi';
import { DiGoogleAnalytics } from 'react-icons/di';
import { IVerticalToolbarItem, VerticalToolbar } from "../components/dashboard/vertical-toolbar";
import { ReserveManager } from "../components/dashboard/reserves-manager";
import "./Dashboard.scss";
import { LoginModal } from "../components/login-modal/login-modal";

const DashboardPage = () => {
  // Wizard is used for set the actual tool
  const [wizard, setWizard] = useState(0);


  const verticalToolbarItems: IVerticalToolbarItem[] = [
    {
      icon: <BiCalendarEvent />,
      tool: <ReserveManager />,
      label: 'Administracion de Reservas',
    },
    {
      icon: <DiGoogleAnalytics />,
      tool: <div />,
      label: 'Estadisticas'
    }
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
    <div className="dashboard-page">
      <Toolbar rightItems={[<LoginModal />]} />
      <div className="container">
        <VerticalToolbar
          items={verticalToolbarItems}
          onSelectItem={setWizard}
        />
        {getToolByWizard(wizard)}
      </div>
      <LoaderPage show={disabled} />
    </div>
  );
};

export default DashboardPage;
