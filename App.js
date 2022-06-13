import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TouchableOpacity,  ActivityIndicator } from 'react-native';
import React, { useState } from 'react';


export default function App() {
  const [loading,setLoading] = useState(true);

  const BUSSTOP_URL = "https://arrivelah2.busrouter.sg/?id=22249"



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bus arrival time: </Text>
      <Text style={styles.arrivalTime}>{loading ? <ActivityIndicator color={'blue'}/> : "Loaded"} </Text>
      <TouchableOpacity  style={styles.button} onPress={() => setLoading(true)}>
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
