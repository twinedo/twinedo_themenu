import {
  StyleSheet,
  Text,
  View,
  Pressable,
  Image,
  FlatList,
  ListRenderItem,
  TextInput,
} from 'react-native';
import React, {useCallback, useState} from 'react';
import globalStyles from 'styles/globalStyles';
import {percentageHeight, percentageWidth} from 'utils/screen_size';
import {BLACK, BLUE, GREY3, RED, WHITE} from 'styles/colors';
import {_currencyFormat, _onCheckImage} from 'services/fun';
import Spacer from 'components/Spacer';
import Button from 'components/Button';
import Ionicons from 'react-native-vector-icons/Ionicons';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import useCartStore from 'store/useCartStore';
import {IMenuItems} from 'types/interfaces';
import Modal from 'react-native-modal';

export default function Footer() {
  const [isFooterExpanded, setIsFooterExpanded] = useState(false);
  const [isShowCharge, setIsShowCharge] = useState(false);
  const [uangDibayar, setUangDibayar] = useState('0');

  const formatCurrency = (inputValue: string) => {
    // let value = parseFloat(inputValue.replace(/,/g, '')) || 0;
    if (inputValue.length === 0) {
      setUangDibayar('0');
    } else {
      setUangDibayar(inputValue);
    }
  };

  const {cartData, minusToCart, addToCart, deleteFromCart} = useCartStore();

  const _onMinusCart = (item: any) => minusToCart!(item);
  const _onPlusCart = (item: any) => addToCart!(item);
  const _onDeleteFromCart = (id: number) => deleteFromCart!(id);

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

  console.log('uang dibayar', uangDibayar);

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
            if (item.quantity > 1) {
              _onMinusCart(item);
            } else if (item.quantity === 1) {
              _onDeleteFromCart(item?.id!);
            }
          }}
          containerStyle={[
            styles.btnMinus,
            {backgroundColor: item.quantity === 0 ? WHITE : BLUE},
          ]}
        />
        <View>
          <Text style={[globalStyles.headingSemibold.h3]}>{item.quantity}</Text>
        </View>
        <Button
          text="+"
          textColor={WHITE}
          onPress={() => _onPlusCart(item)}
          containerStyle={styles.btnPlus}
        />
      </View>

      <View>
        <Text style={[globalStyles.headingMedium.h3]}>{item.quantity}X</Text>
      </View>
    </View>
  );

  const renderItemModal: ListRenderItem<IMenuItems & {quantity: number}> = ({
    item,
  }) => (
    <View
      style={[
        globalStyles.row,
        globalStyles.alignCenter,
        {
          width:
            percentageWidth(100) -
            4 * globalStyles.horizontalDefaultPadding.paddingHorizontal -
            10,
        },
      ]}>
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

      <View>
        <Text style={[globalStyles.headingMedium.h3]}>x{item.quantity}</Text>
      </View>
    </View>
  );

  return (
    <View style={[globalStyles.absolute, styles.containerFooter]}>
      <Pressable
        onPress={() => {
          if (cartData.length > 0) {
            setIsFooterExpanded(!isFooterExpanded);
          }
        }}
        style={[
          globalStyles.absolute,
          globalStyles.alignCenter,
          styles.containerArrow,
        ]}>
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
                styles.badgeContainer,
              ]}>
              <View>
                <Text
                  style={[
                    globalStyles.headingBold.h3,
                    globalStyles.textAlignCenter,
                    styles.badge,
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
        {cartData.length > 0 && (
          <Button
            text="Charge"
            textColor={WHITE}
            containerStyle={styles.btnCharge}
            onPress={() => setIsShowCharge(!isShowCharge)}
          />
        )}
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
      <Modal isVisible={isShowCharge}>
        <View
          style={[
            styles.containerModal,
            globalStyles.verticalDefaultPadding,
            globalStyles.horizontalDefaultPadding,
          ]}>
          <Ionicons
            name="close"
            color={BLACK}
            size={24}
            style={globalStyles.textAlignRight}
            onPress={() => setIsShowCharge(false)}
          />
          <View
            style={[
              globalStyles.row,
              globalStyles.alignCenter,
              globalStyles.justifyCenter,
            ]}>
            <Ionicons name="restaurant-outline" color={BLUE} size={32} />
            <Text style={[globalStyles.headingSemibold.h3, {color: BLUE}]}>
              Detail Pesanan
            </Text>
          </View>
          <Spacer height={25} />
          <View>
            <FlatList
              data={cartData}
              keyExtractor={item => item.id + Math.random().toString()}
              renderItem={renderItemModal}
              contentContainerStyle={[globalStyles.alignCenter, {gap: 10}]}
              horizontal
            />
          </View>
          <Spacer height={15} />
          <View>
            <View style={[globalStyles.row, globalStyles.alignCenter]}>
              <View
                style={[
                  globalStyles.displayFlex,
                  globalStyles.row,
                  globalStyles.justifySpaceBetween,
                ]}>
                <Text
                  style={[
                    globalStyles.headingBold.h3,
                    globalStyles.displayFlex,
                  ]}>
                  Total{' '}
                </Text>
                <Text
                  style={[
                    globalStyles.headingBold.h3,
                    globalStyles.textAlignCenter,
                    {flex: 0.5},
                  ]}>
                  :{' '}
                </Text>
              </View>
              <View style={[globalStyles.displayFlex]}>
                <Text
                  style={[
                    globalStyles.headingBold.h3,
                    globalStyles.textAlignRight,
                  ]}>
                  {_currencyFormat.format(_onGetTotalrice())}
                </Text>
              </View>
            </View>
            <View style={[globalStyles.row, globalStyles.alignCenter]}>
              <View
                style={[
                  globalStyles.displayFlex,
                  globalStyles.row,
                  globalStyles.justifySpaceBetween,
                ]}>
                <Text
                  style={[
                    globalStyles.headingBold.h3,
                    globalStyles.displayFlex,
                  ]}>
                  Uang Dibayar{' '}
                </Text>

                <Text
                  style={[
                    globalStyles.headingBold.h3,
                    globalStyles.textAlignCenter,
                    {flex: 0.5},
                  ]}>
                  :{' '}
                </Text>
              </View>
              <View
                style={[
                  globalStyles.displayFlex,
                  {backgroundColor: '#F6F6F6'},
                ]}>
                <TextInput
                  keyboardType="number-pad"
                  value={uangDibayar}
                  onChangeText={formatCurrency}
                  style={[
                    globalStyles.textAlignRight,
                    globalStyles.headingBold.h3,
                  ]}
                />
              </View>
            </View>
            <View style={[globalStyles.row, globalStyles.alignCenter]}>
              <View
                style={[
                  globalStyles.displayFlex,
                  globalStyles.row,
                  globalStyles.justifySpaceBetween,
                ]}>
                <Text
                  style={[
                    globalStyles.headingBold.h3,
                    globalStyles.displayFlex,
                  ]}>
                  Kembalian{' '}
                </Text>
                <Text
                  style={[
                    globalStyles.headingBold.h3,
                    globalStyles.textAlignCenter,
                    {flex: 0.5},
                  ]}>
                  :{' '}
                </Text>
              </View>
              <View
                style={[
                  globalStyles.displayFlex,
                  {backgroundColor: '#DEEBE0'},
                ]}>
                <Text
                  style={[
                    globalStyles.headingBold.h3,
                    globalStyles.textAlignRight,
                  ]}>
                  {_currencyFormat.format(
                    _onGetTotalrice() - parseInt(uangDibayar),
                  )}
                </Text>
              </View>
            </View>
          </View>
          <Spacer height={15} />
          <Button
            text="Cetak Struk"
            textColor={WHITE}
            containerStyle={{backgroundColor: BLUE, borderRadius: 10}}
            onPress={() => setIsShowCharge(false)}
          />
        </View>
      </Modal>
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
  btnPlus: {
    borderWidth: 1,
    borderColor: BLUE,
    backgroundColor: BLUE,
    width: 25,
    height: 25,
    borderRadius: 4,
  },
  containerFooter: {
    bottom: 0,
    borderTopWidth: 1,
    width: percentageWidth(100),
    backgroundColor: WHITE,
  },
  containerArrow: {
    top: -17,
    left: 0,
    right: 0,

    zIndex: 2,
  },
  badgeContainer: {
    top: 0,
    right: 0,
    width: 20,
    height: 20,
  },
  badge: {
    color: WHITE,
    fontSize: 10,
    padding: 2,
    borderRadius: 10,
    backgroundColor: RED,
  },
  btnMinus: {
    borderWidth: 1,
    borderColor: BLUE,

    width: 25,
    height: 25,
    borderRadius: 4,
  },
  containerModal: {
    backgroundColor: WHITE,
    borderRadius: 5,
  },
});
