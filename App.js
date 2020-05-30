import * as React from 'react';
import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import TopTab from './src/components/Navigation';
import { connect } from 'react-redux'
import Auth from './src/components/Auth';

const App = ({ auth: { isAuthenticated } }) => {
  return (
    <View style={styles.container}>
      {
        isAuthenticated ? <NavigationContainer>
          <TopTab />
        </NavigationContainer> : <Auth />
      }
    </View>
  );
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(App);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 10,
    backgroundColor: '#F5FCFF',
  }
});
