import React, {useState} from 'react';
import DropDownPicker from 'react-native-dropdown-picker';
import RadioForm from 'react-native-simple-radio-button';
import { StyleSheet, Text, TextInput, View, Button } from 'react-native';

export default function App() {

  const [weight, setWeight] = useState('');
  const [bottles, setBottles] = useState(1);
  const [time, setTime] = useState(1);
  const [gender, setGender] = useState('male');
  const [promilles, setPromilles] = useState(0);

  function calculate() {

    let litres = calc_litres(bottles);
    let grams = alcograms(litres);
    let burnt_grams = alcograms(calc_litres(1)) * time;
    let grams_left = grams - burnt_grams;

    // Jos tulos on negatiivinen, korvautuu nollaksi:
    if (grams_left < 0) {
      grams_left = 0;
    }

    let result = 0;
        if (gender === 'male') {
          result = grams_left / (weight * 0.7);
        }
        else {
          result = grams_left / (weight * 0.6);
        }


    setPromilles(result);
  }

  function alcograms(litres) {
    return litres * 8 * 4.5;
  }
  function calc_litres(bottles) {
    return bottles * 0.33;
  }


// zIndexit järjestelty niin, etteivät overlappaa

  return (
    <View style={styles.container}>

      <View>
        <Text style={styles.header}>Alcometer</Text>
      </View>

      <View style={styles.field}>
        <Text>Weight:</Text>
        <TextInput placeholder="Enter weight" value={weight} onChangeText={text => setWeight(text)} ></TextInput>
      </View>

      <View style={styles.field, {zIndex: 3}}>
        <Text>Bottles:</Text>
          <DropDownPicker items={[
            {label: '1 bottle', value: 1},
            {label: '2 bottles', value: 2},
            {label: '3 bottles', value: 3},
            {label: '4 bottles', value: 4},
            {label: '5 bottles', value: 5},
            {label: '6 bottles', value: 6},
            {label: '7 bottles', value: 7},
            {label: '8 bottles', value: 8},
          ]}
          defaultValue={bottles}
          onChangeItem={item => setBottles(item.value)}        
          >
          </DropDownPicker>
        </View>

        <View style={styles.field, {zIndex: 2}}>
          <Text>Time:</Text>
            <DropDownPicker items={[
              {label: '30 minutes', value: 0.5},
              {label: '1 hour', value: 1},
              {label: '2 hours', value: 2},
              {label: '3 hours', value: 3},
              {label: '4 hours', value: 4},
              {label: '5 hours', value: 5},
              {label: '6 hours', value: 6},
              {label: '7 hours', value: 7},
              {label: '8 hours', value: 8},
            ]}
            defaultValue={time}
            onChangeItem={item => setTime(item.value)}  
                  
            >
            </DropDownPicker>
          </View>

          <View style={styles.field, {zIndex: 1}}>
            <Text>Gender:</Text>
            <RadioForm
              radio_props={[
                {label: 'Male', value:'male'},
                {label: 'Female', value:'female'}
              ]}
              onPress={(value) => {setGender(value)}}
            >
            </RadioForm>
          </View>

          <View style={styles.field}>
            <Text>Promilles of alcohol in blood:</Text>
            <Text style={styles.header}>{promilles.toFixed(2)}</Text>
          </View>

          <View style={styles.field}>
            <Button onPress={calculate} title="CALCULATE"></Button>
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
header:{
  fontSize: 32
},

  container: {
    flex: 1,
    width: 150, height: 70,
    marginTop: 25,
    marginLeft: 20,
    flexDirection: 'column'
  },
  field:{
    margin: 20,
  },
});
