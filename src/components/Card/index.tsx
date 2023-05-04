import {StyleSheet, View, ViewProps, ViewStyle} from 'react-native';
import React, {ReactNode} from 'react';
import {WHITE} from 'styles/colors';
import globalStyles from 'styles/globalStyles';

interface ICard extends ViewProps {
  children: ReactNode;
  borderRadius?: number;
  containerStyle?: ViewStyle | ViewStyle[];
}

export default function Card(props: ICard) {
  const {children, borderRadius = 10, containerStyle} = props;
  return (
    <View
      {...props}
      style={[
        globalStyles.horizontalDefaultPadding,
        globalStyles.verticalDefaultPadding,
        styles.container,
        containerStyle,
        {borderRadius: borderRadius},
      ]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // borderRadius: 10,
    elevation: 5,
    backgroundColor: WHITE,
  },
});
