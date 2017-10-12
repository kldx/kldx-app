import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, ListView, Text, View, Image } from 'react-native';

export default class Movies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {
    url = 'http://kldxteam.com/api/v1/articles'
    return fetch(url)
      .then((response) => response.json())
      .then((responseJson) => {
        let ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.setState({
          isLoading: false,
          dataSource: ds.cloneWithRows(responseJson.data),
        }, function() {
          // do something with new state
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  render() {
    if (this.state.isLoading) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
          <ActivityIndicator />
        </View>
      );
    }

    return (
      <View style={{flex: 1, paddingTop: 20}}>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={(rowData) => <Text><Image style={styles.image} source={{uri: rowData.attributes["default-picture"].url}} /> {rowData.attributes.title}, {rowData.attributes.status}</Text>}
        />
      </View>
    );
  }
}

var styles = StyleSheet.create({
  image: {
    width: 50,
    height: 50,
  }
});
