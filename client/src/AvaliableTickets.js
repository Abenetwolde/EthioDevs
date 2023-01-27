
import React, { useState, useEffect } from 'react';
import {

    Text,
    View,

    TouchableOpacity,
    Image,
    StyleSheet,
    Alert,

} from 'react-native'

import { Ionicons, MaterialCommunityIcons } from "react-native-vector-icons";
import { useSelector, useDispatch } from "react-redux";
import { decrease, getTicketTotal, increase } from '../redux/Ticket';
// <-- import styles to be used

function AvaliableTickets({ ticket, totalCount }) {

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTicketTotal());
    }, [ticket]);
    const { id, title, price, img, amount } = ticket
    console.log(ticket.ticket)
    return (

        <View>
            {/* <Text>Total Ticket:{totalCount}</Text> */}
            <View>
                {ticket.length != 0 ? (
                    <View>
                        <View style={styles.productView}>

                            <View style={styles.productView}>
                                <MaterialCommunityIcons
                                    name="ticket"
                                    size={22}
                                    color="#900" />
                                <Text style={styles.productTitle}>{id}</Text>
                            </View>
                            <View style={styles.productMiddleView}>

                            </View>
                            {/*   <Text style={styles.productCompanyTitle}>
                                        {tk.company}
                                    </Text> */}


                            <View style={styles.productRightView}>
                                {amount !== 0 ? <Text
                                    style={styles.productPriceText}
                                >{`${price * amount}`}</Text> : <Text>null</Text>
                                }
                                <View style={styles.productItemCounterView}>
                                    <TouchableOpacity

                                        onPress={() => {
                                            amount > 0 && dispatch(decrease(id))
                                            /*  if (tk.quantity === 1) {
                                                 return Alert.alert(
                                                     `Remove ${tk.name}?`,
                                                     '',
                                                     [
                                                         { text: 'Cancel' },
                                                         {
                                                             text: 'Remove',
                                                             onPress: () => {
                                                                 const newCart = cart.filter(
                                                                     (p) => p.id !== id
                                                                 );
                                                                 setCart(newCart);
                                                             },
                                                         },
                                                     ]
                                                 );
                                             } */

                                        }}
                                    >
                                        {/* <Icon
                                                    style={styles.toggleCounterButton}
                                                    name='minus-circle'
                                                    type='font-awesome'
                                                /> */}
                                        <MaterialCommunityIcons
                                            name="minus-thick"
                                            size={22}
                                        />
                                    </TouchableOpacity>
                                    <Text style={styles.counterValue}>
                                        {amount}
                                    </Text>
                                    <TouchableOpacity
                                        onPress={() => {
                                            dispatch(increase(id))
                                        }}
                                    >
                                        <MaterialCommunityIcons
                                            name="plus-thick"
                                            size={22}
                                        />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>


                    </View>
                ) : <View><Text>no ticket</Text></View>
                }

            </View>
        </View>

    );
}
const styles = StyleSheet.create({

    cartTitleView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    cartTitle: {
        fontSize: 26,
        fontWeight: '700',
        marginLeft: 10,
    },
    productView: {
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#fff',
        paddingVertical: 6,
        paddingHorizontal: 8,
        shadowColor: '#333',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.2,
        borderRadius: 5,
        marginTop: 5,
        marginHorizontal: 20,
    },
    productImage: {
        width: 60,
        height: 60,
        alignSelf: 'center',
    },
    productMiddleView: {
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        paddingHorizontal: 10,
        justifyContent: 'center',
    },
    productTitle: {
        fontSize: 20,
        fontWeight: '500',
    },
    productCompanyTitle: {
        fontSize: 16,
        fontWeight: '300',
    },
    productRightView: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    productItemCounterView: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        marginTop: 4,
    },
    counterValue: {
        fontSize: 20,
        fontWeight: '500',
    },
    productPriceText: {
        alignSelf: 'flex-end',
        paddingRight: 10,
        fontSize: 20,
        fontWeight: '700',
    },
    toggleCounterButton: {
        paddingHorizontal: 10,
    },

});
export default AvaliableTickets
