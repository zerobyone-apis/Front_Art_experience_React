import moment from 'moment'
import { IReserve } from '../../../types/Reserve.type'
import ReserveActions from '../../../actions/Reserve.actions'
import db from '../../../config/firebase';


/*
{
 METHOD  Post & Put Firebase.
 PROPS: barberName, reserveTime
}
*/
export const createReserveTimeOnFirebase = async (barberName, reserveTime, reserveDate) => {

    try {
        let updateReserve
        let selectedReserveDate

        //? Create new Times Array and add the reserve time.
        let newTimes = []
        let reserveTime_Create = moment(reserveTime)
            .format()
            .toString()
            .split('T')[1]
            .substr(0, 5)
        newTimes.push(reserveTime_Create)

        // Flag to validate when is an update or when is a create.
        let isUpdated = false

        // Validate if already exist reserves in the current date.
        const resultDocs = await getReservesFirebase(barberName)

        if (!resultDocs) {
            // console.error('No existen resultados. . .')
        }

        // Solo para checkear si la fecha es igual a la de actual
        selectedReserveDate = moment(reserveDate.toUTCString())
            .format()
            .toString()
            .split('T')[0]

        // nuevo arreglo de sdocuments formateado en fecha.
        const fullParsedResultData = resultDocs.map((data) => {
            return {
                id: data.id,
                date: moment(data.date.toDate().toUTCString())
                    .format()
                    .toString()
                    .split('T')[0],
                times: data.times,
            }
        })

        //! Function to update document reserves if [] is not empty.
        for (const res of fullParsedResultData) {
            if (res.id) {
                if (selectedReserveDate === res.date) {
                    //? Estamos colocando en el arreglo de horas a guardar para este dia,
                    //? las horas que existan anteriormente para este dia
                    newTimes.push(...res.times)

                    //! Update Obj to PUT on Firebase:
                    updateReserve = {
                        date: reserveDate,
                        times: newTimes,
                    }
                    //? PUT - Actualizar document de reserva dado a que hay reservas para este dia
                    //console.log('IF -> PUT - Update!')
                    await db
                        .collection('reservas')
                        .doc(nameParcerFunction(barberName))
                        .collection('day_reserves')
                        .doc(res.id)
                        .set(updateReserve)

                    //? Flag to control when is Update and When is Post
                    isUpdated = true
                }
            }
        }

        //! Validamos si ya se actualizo o hay que crear un documento nuevo.
        if (!isUpdated) {
            // Creating Obj to POST on Firebase:
            updateReserve = {
                date: reserveDate,
                times: newTimes,
            }

            //? POST - Actualizar document de reserva dado a que hay reservas para este dia
            //console.log('IF -> POST - Creating . . .')
            await db
                .collection('reservas')
                .doc(nameParcerFunction(barberName))
                .collection('day_reserves')
                .doc(selectedReserveDate)
                .set(updateReserve)
        }
        //}
    } catch (error) {
        // console.error(
        //     `Error: Creando o Actualizando Firebase Reserve. -> ${error}`
        // )
    }
}


/*
{
 METHOD  Parce Method - Name convention for firestore docs.
}
*/
//* 
export const nameParcerFunction = (name: string) => {
    let parsedName = name.toLowerCase().replace(' ', '.');
    return parsedName;
};


/*
{
Query Method - GET Firestore Reserves
}
*/
export const getReservesFirebase = async (barberName) => {
    const resRef = await db
        .collection('reservas')
        .doc(nameParcerFunction(barberName))
        .collection('day_reserves');

    const result = await resRef
        .get()
        .then((snapshot) => {
            return snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        })
        .catch((err) => console.error(err));

    return result;
};


/*
{
    METHOD CREATE RESERVE
    PROPS: barber, service, date, hour
}
*/
export const createReserve = async (barber, service, date, hour, userData) => {
    // console.log('accede create reserve')

    let reserveActions: ReserveActions = new ReserveActions()

    const startDateFormatted = `${moment(date).format().split('T')[0]
        }T${hour}:00`

    const newReserve: IReserve = {
        barberOrHairdresserId: barber.barberId,
        clientId: userData.clientId,
        socialNumber: userData.socialNumber,
        nameClient: userData.username,
        mailClient: userData.email,
        celClient: userData.cel || '0000',
        startTime: startDateFormatted,
        priceWork: service.cost,
        workToDo: service.name,
    }

    const response: any = await reserveActions.add(newReserve)
    // console.log(response)
    if (response) {
        //* Post & Put Firebase.
        await createReserveTimeOnFirebase(
            barber.name,
            startDateFormatted,
            date
        )
        return true
    } else {
        return false
    }
}
