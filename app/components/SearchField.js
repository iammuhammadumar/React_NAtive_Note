import React from "react";
import { SearchBar } from "react-native-elements";
export default class SearchField extends React.Component {
  state = {
    search: "",
    Loading: false
  };

  updateSearch = search => {
    this.props.onSearchQuery(search);
    this.setState({ search });
  };

  render() {
    const { search } = this.state;
    return (
      <SearchBar
        lightTheme={true}
        inputContainerStyle={{ backgroundColor: "white" }}
        // inputStyle={{ color: "black" }}
        showLoading={this.props.searching}
        placeholder="Search"
        onChangeText={this.updateSearch}
        value={search}
      />
    );
  }
}
