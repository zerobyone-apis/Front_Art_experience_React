export interface ReserveType {
    // Reserve identification info
    reserveId?: number;
    barberOrHairdresserId: number; // ID Barbero que haga la reserva o Peluquera/o.
    clientId: number;
    nameClient: string;
    mailClient: string;
    celClient: string;

    startTime: string; //Reserve Time dd/mm/yyyy HH:MM:SS - Java Instant time
    endTime: string; // dd/mm/yyyy HH:MM:SS - Java Instant time
    reserveDay: string; // Dia de la reservacion -> Tengo que añadirlo en el backend

    // Reserve Description Info
    workId?: number;
    workToDo: number; // Nombre del trabajo EJ: CORTE+BARBA+CEJAS
    priceWork: string; // precio
    workTime: string; // duracion del corte EJ: 30 min

    additionalCost?: string; // Tiempos del los servicios, puede ser fijo o individuales Ej: 30 min
    totalCost: string; // Tiempos del los servicios, puede ser fijo o individuales Ej: 30 min

    // Reserve Analytics info
    createOn?: number; // dd/mm/yyyy HH:MM:SS - Java Instant time
    createBy?: number; // barber name
    updateBy?: number; // barber name
    updateOn?: number; // dd/mm/yyyy HH:MM:SS - Java Instant time
    isActive?: boolean;
}