// Componente de validacion de campos

<ValidationForm
    objectTest={loginFields} // Fields: El objeto que corresponde a los fields internos 
    buttonLabel="Acceder"
    buttonClassName="access_btn art_experience-button_outlined"
    onClick={() => {      // Automaticamente al clickear, primero se realizara la validacion, y si 
        login()           // es valido, se accionara el metodo proporcionado.
    }}
>
    <TextField
        value={loginFields.email}
        name="email"    // el name es requerido internamente
        type="email"    // los types son: email, password, number (default: string)
        required={true} // Required: Si es true, el validador lo incluye en su lista de validacion
        label="Email"
        onChange={onChangeLoginField} />
    <TextField
        value={loginFields.password}
        name="password"
        type="password"
        required={true}
        label="Contraseña"
        onChange={onChangeLoginField} />
</ValidationForm>