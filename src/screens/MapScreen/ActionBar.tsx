import React from "react";

import { Appbar } from "react-native-paper";

export default class ActionBar extends React.Component {
  _goBack = () => console.log("Went back");

  _handleSearch = () => console.log("Searching");

  _handleMore = () => console.log("Shown more");

  render() {
    return (
      <Appbar.Header>
        <Appbar.Action icon={"menu"} onPress={this._goBack} />
        <Appbar.Content title="Title" subtitle="Subtitle" />
      </Appbar.Header>
    );
  }
}
