import React, { useState, useEffect, useContext } from "react";
import { ButtonContext } from "../contexts/ButtonsContext";
import { Toolbar } from "../components/containers/toolbar";
import { UserContext } from "../contexts/UserContext";
import { BiCalendarEvent } from 'react-icons/bi';
import { IVerticalToolbarItem, VerticalToolbar } from "../components/pages/dashboard/vertical-toolbar";
import { ReserveManager } from "../components/pages/dashboard/reserves-manager";
import { LoginDialog } from "../components/dialogs/login-dialog";
import { PageBase } from "../components/pages/page-base";
import { DASHBOARD_PAGE } from "../types/Pages.type";
import "./Dashboard.scss";

const DashboardPage = () => {
  const [wizard, setWizard] = useState(0);

  const verticalToolbarItems: IVerticalToolbarItem[] = [
    {
      icon: <BiCalendarEvent />,
      tool: <ReserveManager />,
      label: 'Administracion de Reservas',
    }
  ];

  const getToolByWizard = (wizard: number) => {
    return verticalToolbarItems[wizard].tool;
  }

  const {
    userIsAdmin,
  } = useContext(UserContext);

  useEffect(() => {
    if (!userIsAdmin()) {
      document.location.href = "/";
    }
  }, []);

  return (
    <>
      {
        userIsAdmin() && 
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
      }
    </>
  )
}

export default DashboardPage;
