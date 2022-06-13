import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity,  ActivityIndicator } from 'react-native';
import React, { useState , useEffect } from 'react';



export default function App() {
  const [loading,setLoading] = useState(true);
  const [arrival,setArrival] = useState("");

  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=22249"

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
        (item) => item.no === "192"
        )[0];
        console.log("My Bus:");
        console.log(myBus.next.time);
        setArrival(myBus.next.time);
        
        setLoading(false);
    });
  }

  useEffect(() => {
    const interval = setInterval(loadBusStopData,5000);
    return () => clearInterval(interval);
  },[]);



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus arrival time: </Text>
      <Text style={styles.arrivalTime}>{loading ? <ActivityIndicator color={'blue'} size={"large"}/> : arrival} </Text>
      <TouchableOpacity  style={styles.button} onPress={() => setLoading(false)}>
        <Text style={styles.buttonText}>Refresh</Text>
      </TouchableOpacity>

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: 100,
  },
  text: {
    fontSize: 50,
    marginVertical: 20,
  },
  button: {
    backgroundColor:"#f0f",
    padding: 20,
    marginVertical:20,
  },
  buttonText: {
    fontSize:20,
  },
});
