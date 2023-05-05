import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  FlatList,
  ListRenderItem,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import globalStyles from 'styles/globalStyles';
import {percentageHeight, percentageWidth} from 'utils/screen_size';
import {BLUE, GREY3, RED, WHITE} from 'styles/colors';
import {_currencyFormat, _onCheckImage} from 'services/fun';
import Spacer from 'components/Spacer';
import Button from 'components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import useCartStore from 'store/useCartStore';
import {IMenuItems} from 'types/interfaces';

export default function Footer() {
  const [isFooterExpanded, setIsFooterExpanded] = useState(false);

  const {cartData, minusToCart, addToCart} = useCartStore();

  const _onMinusCart = (item: any) => minusToCart!(item);
  const _onPlusCart = (item: any) => addToCart!(item);

  const _onGetTotalrice = useCallback(() => {
    const totalPrice =
      cartData.length > 0 &&
      cartData.reduce((acc, curr) => {
        if (curr?.quantity! > 0) {
          return acc + parseInt(curr.price) * curr?.quantity!;
        }
        return acc;
      }, 0);
    return totalPrice;
  }, [cartData]);

  const renderItem: ListRenderItem<IMenuItems & {quantity: number}> = ({
    item,
  }) => (
    <View style={[globalStyles.row]}>
      <Image
        source={_onCheckImage(item.picture)}
        style={{width: 70, height: 70}}
      />
      <Spacer width={10} />
      <View style={[globalStyles.displayFlex]}>
        <Text style={[globalStyles.headingBold.h3]}>{item.name}</Text>
        <View style={[globalStyles.row, globalStyles.alignCenter]}>
          <Text style={[globalStyles.headingBold.h3, {color: BLUE}]}>
            {_currencyFormat.format(parseInt(item.price, 10))}
          </Text>
          <Text style={[globalStyles.headingRegular.h3, {color: GREY3}]}>
            {' '}
            / porsi
          </Text>
        </View>
      </View>
      <View
        style={[
          globalStyles.displayFlex,
          globalStyles.row,
          globalStyles.alignCenter,
          globalStyles.justifyAround,
        ]}>
        <Button
          text="-"
          textColor={item.quantity === 0 ? BLUE : WHITE}
          onPress={() => {
            if (item.quantity > 0) {
              _onMinusCart(item);
            }
          }}
          containerStyle={{
            borderWidth: 1,
            borderColor: BLUE,
            backgroundColor: item.quantity === 0 ? WHITE : BLUE,
            width: 25,
            height: 25,
            borderRadius: 4,
          }}
        />
        <View>
          <Text style={[globalStyles.headingSemibold.h3]}>{item.quantity}</Text>
        </View>
        <Button
          text="+"
          textColor={WHITE}
          onPress={() => _onPlusCart(item)}
          containerStyle={{
            borderWidth: 1,
            borderColor: BLUE,
            backgroundColor: BLUE,
            width: 25,
            height: 25,
            borderRadius: 4,
          }}
        />
      </View>
    </View>
  );

  return (
    <View
      style={[
        globalStyles.absolute,
        {
          bottom: 0,
          // height: animatedHeight.current,
          //   height: isFooterExpanded ? 70 : 300,
          borderTopWidth: 1,
          width: percentageWidth(100),
          backgroundColor: WHITE,
        },
      ]}>
      <Pressable
        onPress={() => {
          if (cartData.length > 0) {
            setIsFooterExpanded(!isFooterExpanded);
          }
        }}
        style={{
          position: 'absolute',
          top: -17,
          left: 0,
          right: 0,
          alignItems: 'center',
          zIndex: 2,
        }}>
        <Ionicons
          name={isFooterExpanded ? 'chevron-down-circle' : 'chevron-up-circle'}
          size={30}
          color={BLUE}
        />
      </Pressable>
      <View
        style={[
          globalStyles.displayFlex,
          globalStyles.row,
          globalStyles.justifySpaceBetween,
          globalStyles.horizontalDefaultPadding,
          globalStyles.verticalDefaultPadding,
        ]}>
        <View style={[globalStyles.row]}>
          <View>
            <SimpleLineIcons name="handbag" size={32} color={BLUE} />
            <View
              style={[
                globalStyles.absolute,
                globalStyles.justifyCenter,
                {
                  top: 0,
                  right: 0,
                  width: 20,
                  height: 20,
                },
              ]}>
              <View>
                <Text
                  style={[
                    globalStyles.headingBold.h3,
                    globalStyles.textAlignCenter,
                    {
                      color: WHITE,
                      fontSize: 10,
                      padding: 2,
                      borderRadius: 10,
                      backgroundColor: RED,
                    },
                  ]}>
                  {cartData.length}
                </Text>
              </View>
            </View>
          </View>
          <Spacer width={10} />
          <Text style={globalStyles.headingBold.h3}>
            {_currencyFormat.format(_onGetTotalrice())}
          </Text>
        </View>
        <Button
          text="Charge"
          textColor={WHITE}
          containerStyle={styles.btnCharge}
        />
      </View>

      <View>
        {isFooterExpanded && (
          <View
            style={[
              globalStyles.horizontalDefaultPadding,
              globalStyles.verticalDefaultPadding,
              {maxHeight: percentageHeight(50)},
            ]}>
            <FlatList
              data={cartData}
              keyExtractor={item => item.id + Math.random().toString()}
              renderItem={renderItem}
              contentContainerStyle={{gap: 10}}
            />
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  btnCharge: {
    borderRadius: 8,
    backgroundColor: BLUE,
    width: 150,
    height: 40,
  },
});
