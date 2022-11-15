import React, { useState, useEffect, useRef } from 'react'
import { SafeAreaView, StyleSheet, Text, View, Image, Button, TouchableOpacity } from 'react-native'
import { Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { useDispatch, useSelector } from 'react-redux';
import AvaliableTickets from '../Components/AvaliableTickets';
import { addTicket, getTicketTotal } from '../redux/Ticket';
import { Ionicons, MaterialCommunityIcons } from "react-native-vector-icons";

function PaymentScreen() {

  const panelRef = useRef(null);

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(addTicket(tickets));

  }, [tickets]);
  const { totalCount, totalAmount } = useSelector((state) => state.ticket);

  const [tickets, setTickets] = useState([{
    id: 1,
    title: "Normal Ticket",
    price: 700.0,
    img: "https://res.cloudinary.com/drecbsopp/image/upload/v1627398399/samasung-galaxy-a51-8gb-8uh_tndbgv.jpg",
    amount: 0,
  },
  {
    id: 2,
    title: "Vip Ticket",
    price: 600.0,
    img: "https://res.cloudinary.com/drecbsopp/image/upload/v1627398477/MotoGPowerDual_2021_Reformatted_1_330x_wp8gve.png",
    amount: 0,
  },
  {
    id: 3,
    title: "Foriener Tickcet",
    price: 500.0,
    img: "https://res.cloudinary.com/drecbsopp/image/upload/v1627398543/D7A7DA95-AEF8-228B-A2D2-A3FEBF237C33_y9p6wq.png",
    amount: 0,
  },])
  /*  , */
  const [visible, setVisible] = useState(false);

  const toggleBottomNavigationView = () => {
    //Toggling the visibility state of the bottom sheet
    setVisible(!visible);
  };

  const { items } = useSelector((state) => state.ticket);
  console.log(items[0])
  const { id, img, amount } = items
  const width = Dimensions.get('window').width;
  const height = Dimensions.get('window').height;
  return (

    <SafeAreaView style={styles.Main}>
      <View >
        <View style={[styles.ticketsdescription, { height: height / 3 }, { width: width }]}>
          <View style={[styles.imageContainer,]}>
            <Image
              style={styles.image}
              source={{
                uri: 'https://ahun.app/_next/image?url=https%3A%2F%2Fstorage.ahun.app%2F7edf45a0-590a-11ed-82c8-c7fd381a241e_796412e0-590a-11ed-9057-8992abf518fa&w=1200&q=75',
              }}
            />
          </View>
          <View style={[styles.DiscriptionText,]}>
            <Text style={[styles.H1Text,]}>በርሜል Fest</Text>
            <View style={[styles.Date,]}>
              <Icon name="calendar" size={20} color="#F9C361" />
              <Text style={[styles.H4Text,]}>Sun, Nov 13 (2 AM)Lt</Text>
            </View>
            <View style={[styles.Date,]}>
              <Icon name="map-marker" size={20} color="#F9C361" />
              <Text style={[styles.H4Text,]}>Ghion Hotel</Text>
            </View>

          </View>

        </View>
        {/* Abaliable Tickets */}
        <Text style={[styles.H1Text, { marginLeft: 20 }]}>Avaliable Tickets</Text>




        {
          items.map((tik) => {
            return (
              <AvaliableTickets ticket={tik} />

            );
          })}



        {/* {items&&<AvaliableTickets ticket= {items}/> } */}
      </View>

      <View style={styles.bottomNavigationView}>
    <MaterialCommunityIcons
            name="ticket"
            size={20}
            color="#900" />
          <Text style={styles.BSTicketcount}>{totalCount}</Text>
        
        <View style={styles.LeftbottomNavigationView}>
          <Text style={styles.BStext}>Total:</Text>
          
          <Text style={styles.BSTicketTotal}>{totalAmount} Birr</Text>
        </View>
        <TouchableOpacity o onPress={() => {
       
        }} 
        style={styles.appButtonContainer}>
          <Text style={styles.appButtonText}>Countinue</Text>
        </TouchableOpacity>
      </View>


    </SafeAreaView>

  )
}
const styles = StyleSheet.create({
  Main: {
    flex: 1,
    alignItems: "center",
  },
  appButtonContainer: {
    elevation: 8,
    backgroundColor: "#009688",
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 12
  },
  appButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
    alignSelf: "center",
    textTransform: "uppercase"
  },
  BSTicketTotal: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'black',
    marginRight: 5,
  },
  BSTicketcount: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'white',
    marginRight: 5,
    marginLeft: 5,
  },
  BStext: {

  },
  BStext: {
    fontSize: 20,
    fontWeight: "bold",
    color: 'white',
    marginRight: 5,
  },
  LeftbottomNavigationView: {
    display: 'flex',
    flexDirection: "row",
    alignItems: 'center',
    justifyContent: 'center'

  },
  bottomNavigationView: {
    paddingHorizontal:10,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    backgroundColor: '#ffbb00',
    width: '100%',
    height: 70,
    position: 'absolute',
    bottom: 0,
    margin: 0,
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  ticketsdescription: {
    margin: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    width: '100%',
  },
  imageContainer: {
    paddingLeft:10,
    display: 'flex',
    flex: 1,
    height: '100%',
    width: '50%'
  },
  image: {
    borderRadius: 15,
    height: '100%',
    resizeMode: 'cover',
    width: '100%'
  },
  DiscriptionText: {

    display: 'flex',
    flex: 1,
    marginLeft: 15,
    flexDirection: 'column',
    alignItems: 'flex-start',
    // justifyContent: 'space-around',
    spacing: 2,
    height: '100%',
    width: '50%',
  },
  H1Text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft:10
  },
  H4Text: {
    fontSize: 15,
    color: 'grey',
    paddingLeft: 10,
  },
  Date: {
    marginTop: 40,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center'
  },
  bottomsheet: {
    position: "absolute",
    bottom: 0,
    height: 10,
    right: 0, width: "100%",
    backgroundColor: "#900"
  }

})

export default PaymentScreen
