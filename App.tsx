/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
  TextInput,
  Button,
  Alert,
  ActivityIndicator,
  Linking
} from 'react-native';
import axios from 'axios';

// import { Button } from 'react-bootstrap';

// import * as eva from '@eva-design/eva';
// import {ApplicationProvider, Layout, Text} from '@ui-kitten/components';
import {
  Colors,
  DebugInstructions,
  Header,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

const Section: React.FC<{
  title: string;
}> = ({children, title}) => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <View style={styles.sectionContainer}>
      <Text
        style={[
          styles.sectionTitle,
          {
            color: isDarkMode ? Colors.white : Colors.black,
          },
        ]}>
        {title}
      </Text>
      <Text
        style={[
          styles.sectionDescription,
          {
            color: isDarkMode ? Colors.light : Colors.dark,
          },
        ]}>
        {children}
      </Text>
    </View>
  );
};

const App = () => {

  const [username, setUsername] = React.useState('');
    const [loading, setLoading] = React.useState(false);
    const [repositories, setRepositories] = React.useState([]);
    const [error, setError] = React.useState('');

    const show_error = (message: any) => {
        Alert.alert(
        'Whoops!',
        message,
        [
          { text: 'OK', onPress: () => console.log('OK Pressed') }
        ]
      );
    };

    const find_repo = () => {
        if(username === '') {
            show_error('Please enter a username');
            return;
        }

        setLoading(true);

        axios.get(`https://api.github.com/users/${username}/repos`)
            .then((response) => {
                console.log(response.data);
                setRepositories(response.data);
            })
            .catch((error) => {
                console.log(error.code);
                show_error(`${error.code} - ${error.message}`);
            })
            .then(() => {
                setLoading(false);
            });
    };
  
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };



  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <TextInput
            // style={styles.input}
            onChangeText={new_username => setUsername(new_username)}
            defaultValue={username}
            placeholder="Start Typing Your Username..."
          />
           <Button
            title="Find Repositories"
            onPress={() => find_repo()}
          />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        {/* <Header /> */}
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          {/* {error && (<Text style={{ backgroundColor: 'red', color: 'white' }}>{error}</Text>)} */}
         
          {loading && (<ActivityIndicator size="large" color="#0096FF" style={{ marginTop: 20 }} />)}
          <ScrollView style={{ marginTop: 50, marginLeft: 12, marginRight: 12 }}>
            {repositories.map((repository, index) => {
              return (
                <View style={styles.card}>
                  <Text style={{ color: 'black' }}>
                    <Text style={{ fontWeight: 'bold', color: '#0096FF', marginBottom: 20 }}>Name:</Text> <Text style={{ fontWeight: 'bold' }}>{repository.name} </Text>{'\n'}
                    <Text style={{ fontWeight: 'bold', color: '#0096FF' }}>Description:</Text> <Text style={{ fontWeight: 'bold' }}>{repository.description} </Text>{'\n'}
                    <Text style={{ fontWeight: 'bold', color: '#0096FF' }}>File Size:</Text> <Text style={{ fontWeight: 'bold' }}>{repository.size / 1000} MB </Text>{'\n'}
                    <Text style={{ fontWeight: 'bold', color: '#0096FF', marginBottom: 40 }}>Visibility:</Text> <Text style={{ fontWeight: 'bold' }}>{repository.visibility} </Text>{'\n'}{'\n'}
                    <Button
                      title="Visit Repository"
                      onPress={() => Linking.openURL(repository.html_url)}
                    />
                  </Text>
                </View>
              )
            })}
         </ScrollView>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  card: { 
    shadowColor: '#fff',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.58,
    shadowRadius: 16.00,

    elevation: 24,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    marginBottom: 5
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#0096FF',
    padding: 30,
    width: '100%',
  },
});

export default App;
