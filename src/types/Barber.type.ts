export interface IBarber {
    // User Information
    barberId?: number;
    userId?: number;
    username: string;
    password: string;
    email: string;
    cel: string;

    startDate?: string; // dd/mm/yyyy HH:MM:SS - Java Instant time
    endDate?: string; // dd/mm/yyyy HH:MM:SS - Java Instant time

    // Barber Information
    name: string;
    localId: number;
    localName: string;
    workTime: string; // Horario del barbero EJ: 10:00 a 18:00
    cutsTimes: string; // Tiempos del los servicios, puede ser fijo o individuales Ej: 30 min

    // Analytics information
    amountOfCuts?: number;
    amountOfClients?: number;
    amountOfComments?: number;
    amountOflikesOnComments?: number;
    amountOfShares?: number;
    amountDailyReserves?: number;
    prestige?: number; // Double
    isActive?: boolean;
}