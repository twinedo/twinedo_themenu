import {StyleSheet, TextInput, View} from 'react-native';
import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react';
import {IInputProps} from 'types/interfaces';
import globalStyles from 'styles/globalStyles';
import {BLACK, GREY3, WHITE} from 'styles/colors';

export interface InputComponentRef {
  getValue: () => string;
  setValue: (value: string) => void;
}

const Input = forwardRef<InputComponentRef, IInputProps>((props, ref) => {
  const {containerStyle, prefix, postfix, textInputStyle} = props;
  const [value, setValue] = useState('');
  const inputRef = useRef<TextInput>(null);

  useImperativeHandle(ref, () => ({
    getValue: () => value,
    setValue: (newValue: string) => {
      setValue(newValue);
      inputRef.current && inputRef.current.setNativeProps({text: newValue});
    },
  }));
  return (
    <View
      style={[
        globalStyles.row,
        globalStyles.alignCenter,
        styles.container,
        containerStyle,
      ]}>
      {prefix}
      <TextInput
        {...props}
        value={value}
        onChangeText={setValue}
        placeholderTextColor={GREY3}
        style={[globalStyles.displayFlex, styles.txtInput, textInputStyle]}
      />
      {postfix}
    </View>
  );
});

export default Input;

const styles = StyleSheet.create({
  container: {
    backgroundColor: WHITE,
    borderRadius: 5,
    paddingHorizontal: 10,
  },
  txtInput: {color: BLACK},
});
