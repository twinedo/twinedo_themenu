import {
  StyleSheet,
  Text,
  TextStyle,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React, {ReactNode} from 'react';
import {WHITE} from 'styles/colors';
import globalStyles from 'styles/globalStyles';

type ToolbarProps = {
  containerStyle?: ViewStyle | ViewStyle[];
  prefix?: React.ReactNode;
  prefixStyle?: ViewStyle | ViewStyle[];
  postfix?: React.ReactNode;
  postfixStyle?: ViewStyle | ViewStyle[];
  middleStyle?: ViewStyle | ViewStyle[];
} & ViewProps;

const Toolbar = (props: ToolbarProps & ViewProps) => {
  const {
    children,
    containerStyle,
    prefix,
    prefixStyle,
    postfix,
    postfixStyle,
    middleStyle,
  } = props;
  return (
    <View
      {...props}
      style={[
        globalStyles.row,
        globalStyles.alignCenter,
        globalStyles.justifySpaceBetween,
        styles.container,
        containerStyle,
      ]}>
      <View {...props} style={[styles.prefix, prefixStyle]}>
        {prefix}
      </View>
      {children !== undefined && (
        <View {...props} style={[styles.middle, middleStyle]}>
          {children}
        </View>
      )}
      <View {...props} style={[styles.postfix, postfixStyle]}>
        {postfix}
      </View>
    </View>
  );
};

export default Toolbar;

const styles = StyleSheet.create({
  container: {
    height: 60,
    paddingHorizontal: 12,
    backgroundColor: WHITE,
  },
  middle: {
    flex: 2,
    alignItems: 'center',
  },
  prefix: {
    alignItems: 'flex-start',
  },
  postfix: {
    alignItems: 'flex-end',
  },
});
