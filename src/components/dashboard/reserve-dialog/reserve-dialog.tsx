import React, { useContext, useState, useEffect } from 'react';
import { DialogModal } from '../../dialog-modal/dialog-modal';
import ReserveActions from '../../../actions/Reserve.actions';
import { IReserve } from '../../../types/Reserve.type';
import { ValidationForm } from '../../validation-form/validation-form';
import { Button } from '../../button/button';
import { TextField } from '../../text-field/text-field';
import { ButtonContext } from '../../../contexts/ButtonsContext';
import moment from 'moment';
import './reserve-dialog.scss';
import '../../../styles/theme-buttons.scss';
import '../../../styles/effects.scss';

export const ReserveDialog = (props: {
  reserve: IReserve;
  onClose: any;
  onFinalized?: () => undefined;
  onCancelled?: () => undefined;
  updated?: () => undefined;
}) => {
  const baseReserve: IReserve = {
    barberOrHairdresserId: -1,
    celClient: '',
    clientId: -1,
    mailClient: '',
    nameClient: '',
    priceWork: 0,
    startTime: '',
    additionalCost: 0,
    socialNumber: 0,
  };
  const {
    // @ts-ignore
    disabled,
    setDisabledButton,
  } = useContext(ButtonContext);

  const reserveActions: ReserveActions = new ReserveActions();
  const [showDialog, setShowDialog] = useState(false);

  // confirm dialog data
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [confirmDialogData, setConfirmDialogData] = useState({
    title: '',
    message: '',
    onAccept: () => undefined,
    onCancel: () => undefined,
  });

  const [reserve, setReserve] = useState(props.reserve || baseReserve);
  const [updated, setUpdated] = useState(false);

  const onChangeReserve = (value: string, fieldName: string) => {
    setReserve({ ...reserve, [fieldName]: value });
  };

  const ConfirmDialog = (props: {
    onAccept: () => undefined;
    onCancel: () => void;
    title: string;
    message: string;
  }) => {
    return (
      <DialogModal
        className="confirm-dialog"
        title={props.title}
        showModal={showConfirmDialog}
        onClose={() => {
          props.onCancel();
        }}
      >
        <div className="reserve-modal">
          <div className="reserve_data-box">
            <p className="reserve_info effect-slide_left">{props.message}</p>
            <Button
              className="footer-button theme-button-outlined"
              label="Realizar Accion"
              onClick={() => {
                props.onAccept;
              }}
            />
            <Button
              className="footer-button theme-button-outlined"
              label="Cancelar"
              onClick={() => {
                props.onCancel;
              }}
            />
          </div>
        </div>
      </DialogModal>
    );
  };

  return (
    <DialogModal
      className="reserve-dialog"
      title="Control de Reserva"
      showModal={showDialog}
      onClose={props.onClose}
    >
      <div className="reserve-modal">
        <div className="reserve_data-box">
          <p className="reserve_info effect-slide_left">Datos del Cliente</p>
          <ValidationForm
            objectTest={reserve}
            buttonLabel="Guardar Cambios"
            buttonClassName="access_btn theme-button-outlined"
            onClick={props.updated}
          >
            <TextField
              value={reserve.nameClient}
              disabled={true}
              name="nameClient"
              type="string"
              required={false}
              label="Nombre"
              className="theme-text_field--dark"
              onChange={onChangeReserve}
            />
            <TextField
              value={reserve.mailClient}
              name="mailClient"
              type="email"
              required={true}
              label="Email"
              className="theme-text_field--dark"
              onChange={onChangeReserve}
            />
            <TextField
              value={reserve.celClient}
              name="celClient"
              type="number"
              required={true}
              label="Celular"
              className="theme-text_field--dark"
              onChange={onChangeReserve}
            />
            <p className="reserve_info">Datos de la Reserva</p>
            <TextField
              value={reserve.startTimeFront}
              name="startTimeFront"
              type="allow"
              required={true}
              label="Fecha y hora"
              className="theme-text_field--dark"
              onChange={onChangeReserve}
            />
            <TextField
              value={reserve.barberName}
              name="barberOrHairdresserId"
              type="allow"
              required={true}
              disabled={true}
              label="Barbero"
              className="theme-text_field--dark"
              onChange={onChangeReserve}
            />
            <TextField
              value={reserve.workToDo}
              name="workToDo"
              type="allow"
              required={true}
              label="Servicio"
              className="theme-text_field--dark"
              onChange={onChangeReserve}
            />
            <TextField
              value={reserve.totalCost}
              name="totalCost"
              type="number"
              required={true}
              label="Costo Total"
              className="theme-text_field--dark"
              onChange={onChangeReserve}
            />
          </ValidationForm>
        </div>
      </div>

      <div className="footer">
        <div className="footer_right-box">
          <Button
            className="footer-button theme-button-outlined"
            label="Finalizar Reserva"
            onClick={() => {
              setShowConfirmDialog(true);
            }}
          />
          <Button
            className="footer-button theme-button-outlined"
            label="Cancelar Reserva"
            onClick={() => {
              setShowConfirmDialog(true);
            }}
          />
        </div>
      </div>

      {showConfirmDialog ? (
        <ConfirmDialog
          title={confirmDialogData.title}
          message={confirmDialogData.message}
          onAccept={confirmDialogData.onAccept()}
          onCancel={() => {
            setShowConfirmDialog(false);
          }}
        />
      ) : null}
    </DialogModal>
  );
};
