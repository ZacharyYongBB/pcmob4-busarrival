import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity,  ActivityIndicator, TextInput,SafeAreaView, Keyboard, TouchableWithoutFeedback } from 'react-native';
import React, { useState , useEffect } from 'react';



export default function App() {
  const [loading,setLoading] = useState(true);
  const [arrival,setArrival] = useState("");
  const [nextArrival,setNextArrival] = useState("");
  const [countdown,setCountdown] = useState("");
  const [nextCountdown,setNextCountdown] = useState("");
  const timeCountdown = millisToMinutesAndSeconds(countdown);
  const timeNextCountdown = millisToMinutesAndSeconds(nextCountdown);

  const timeArrival = new Date(arrival);
  const timeNextArrival = new Date(nextArrival);
 
  const [busNumber, onChangeBus] = React.useState(null); 
  const [stopNumber, onChangeStop] = React.useState(null); 

  const BUSSTOP_URL = `https://arrivelah2.busrouter.sg/?id=${stopNumber}`


  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return minutes + "min " + (seconds < 10 ? '0' : '') + seconds +'sec';
  }
  




  function loadBusStopData() {
    setLoading(true);
    fetch(BUSSTOP_URL)
    .then((response) => {
      return response.json();
    })
    .then((responseData) => {
      console.log("Original Data:");
      console.log(responseData);

        const myBus = responseData.services.filter(
        (item) => item.no === busNumber
        )[0];
        console.log("My Bus:");
        console.log(myBus.next.time);

          setArrival(myBus.next.time);
          setCountdown(myBus.next.duration_ms);
          
          
          setNextArrival(myBus.next2.time);
          setNextCountdown(myBus.next2.duration_ms);
          

        setLoading(false);
    });
  }

  useEffect(() => {
    const interval = setInterval(loadBusStopData,15000);
    return () => clearInterval(interval);
  },[]);



  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
    <SafeAreaView style={styles.container}>
      <Text style={styles.bigTitle}>Bus Number</Text>
      <TextInput
      style={styles.input}
      onChangeText={onChangeBus}
      value={busNumber}
      placeholder="Bus Number"
      keyboardType="numeric"
       />
      <Text style={styles.bigTitle}>Stop Number</Text>
      <TextInput
      style={styles.input}
      onChangeText={onChangeStop}
      value={stopNumber}
      placeholder="Bus Stop Number"
      keyboardType="numeric"
      />

      
      <TouchableOpacity  style={styles.button} onPress={() => loadBusStopData()}>
        <Text style={styles.buttonText}>Search</Text>
      </TouchableOpacity>
      
      
      <Text style={styles.title}>NEXT Bus arrival time: </Text>
      <Text style={styles.arrivalTime}>{loading ? <ActivityIndicator color={'blue'} size={"large"}/> : timeArrival.toTimeString()} </Text>
      <Text style={styles.arrivalTime}>{loading ? <ActivityIndicator color={'blue'} size={"large"}/> : `coming in: ${timeCountdown}`} </Text>

      <Text style={styles.title}>NEXT NEXT Bus arrival time: </Text>
      <Text style={styles.arrivalTime}>{loading ? <ActivityIndicator color={'blue'} size={"large"}/> : timeNextArrival.toTimeString()} </Text>
      <Text style={styles.arrivalTime}>{loading ? <ActivityIndicator color={'blue'} size={"large"}/> : `coming in: ${timeNextCountdown}`} </Text>

      <TouchableOpacity  style={styles.button} onPress={() => loadBusStopData()}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>
      <TouchableOpacity  style={styles.button} onPress={() => setLoading(true)}>
        <Text style={styles.buttonText}>STOP</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightgreen',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 100,
  },
  text: {
    fontSize: 50,
    marginVertical: 20,
  },
  button: {
    backgroundColor:"green",
    padding: 20,
    marginVertical:20,
    borderRadius:10,
    marginTop:20,
  },
  buttonText: {
    fontSize:20,
    color:'white',
    
  },
  title: {
    marginTop:30,
    fontSize:25,
  },
  arrivalTime:{
    marginTop:5,
    fontSize:20,
    color:'gray',
  },
  bigTitle: {
    fontSize:30,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor:'white',
    borderRadius:5,
  },
});
