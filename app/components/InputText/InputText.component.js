import React from 'react';
import { View, Text, TextInput } from 'react-native';

import { commonStyles } from '../../screens/styles';

const InputText = props => {
  const {
    placeholder,
    value,
    onChangeText,
    style,
    secureTextEntry,
    autoCapitalize
  } = props;
  return (
    <View style={[commonStyles.logoContainer]}>
      <TextInput
        placeholderTextColor={props.placeholderTextColor}
        underlineColorAndroid="transparent"
        returnKeyType={'next'}
        style={[
          commonStyles.inputbar,
          commonStyles.divider,
          commonStyles.borderleft,
          commonStyles.borderRight,
          style
        ]}
        autoCapitalize={autoCapitalize}
        placeholder={placeholder}
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={onChangeText}
      />
    </View>
  );
};

export default InputText;
