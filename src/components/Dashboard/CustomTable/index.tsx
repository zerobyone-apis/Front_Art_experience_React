import React from 'react';
import './Table.scss';
export const Table = () => {
    // const [items, setItems] = useState(props.items || []);

    return (
        <div className="table-box">
            <div className="no-orders">
                {/* <p>No tiene ordenes creadas</p> */}
            </div>
            <div className="no-orders">
                {/* <p>No se encontraron coincidencias</p> */}
            </div>
            <div className="left-box">
            </div>
            <div className="content-box">



                {/* <table className="table">
                    <tr>
                        {props.headers.map((header, i) => {
                            return <th className="header" key={i}>{header.text}</th>
                        })}
                    </tr>
                    {
                        items.map((item, i) => {
                            return (
                                <tr key={i} className="row">
                                    {props.headers.map((header, i) => {
                                        return <td className="column" key={i}>{item[header.value]}</td>
                                    })}
                                    <td className="column">{'button'}</td>
                                </tr>

                            )
                        })
                    }
                </table> */}


            </div>
            <div className="right-box">
            </div>
        </div >
    );
}

{/* <v-layout row wrap>
                        <v-flex xs2 xl2 sm2 v-for="(header, index) in headerOrder" :key="index">
                          <p
                            v-if="header.value != 'status'"
                            className="item_table-text"
                        >{{ item[header.value] }}</p>
                        <!-- :outlined="$store.getters.theme  === 'dark' ? true : false" -->
                          <v-chip
                            v-if="header.value == 'status'"
                            :color="getColorByStatus(item[header.value])"
                          >{{ item[header.value] }}</v-chip>
                        </v-flex>
                      </v - layout > */}