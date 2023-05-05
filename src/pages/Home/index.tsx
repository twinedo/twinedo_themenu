import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
  ListRenderItem,
  StatusBar,
} from 'react-native';
import React, {useRef, useEffect} from 'react';
import globalStyles from 'styles/globalStyles';
import {BaseContainer, Button, Card, Input, Spacer, Toolbar} from 'components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {BLUE, GREY10, GREY3, WHITE} from 'styles/colors';
import {InputComponentRef} from 'components/Input';
import useMenuStore from 'store/useMenuStore';
import {IMenuItems} from 'types/interfaces';
import {_currencyFormat, _onCheckImage} from 'services/fun';
import Footer from 'components/Footer';
import useCartStore from 'store/useCartStore';

const ITEM_WIDTH =
  (Dimensions.get('window').width -
    globalStyles.horizontalDefaultPadding.paddingHorizontal * 2) /
  2;
const ITEM_SPACING = 4;
export default function Home() {
  const inputRef = useRef<InputComponentRef>(null);

  const {menuData, getAllMenus} = useMenuStore();
  const {addToCart} = useCartStore();

  useEffect(() => {
    getAllMenus();
  }, []);

  const _onItemPressed = (item: IMenuItems) => {
    addToCart!(item);
  };

  const renderItem: ListRenderItem<IMenuItems> = ({item}) => (
    <Card containerStyle={styles.item}>
      <Image source={_onCheckImage(item.picture)} style={styles.img} />

      <View style={[globalStyles.justifySpaceBetween, styles.p10]}>
        <Text
          style={[globalStyles.headingBold.h3]}
          numberOfLines={1}
          lineBreakMode="tail">
          {item.name}
        </Text>
        <Spacer height={20} />
        <View style={[globalStyles.row, globalStyles.alignCenter]}>
          <Text style={[globalStyles.headingBold.h3, {color: BLUE}]}>
            {_currencyFormat.format(parseInt(item.price, 10))}
          </Text>
          <Text style={[globalStyles.headingRegular.h3, {color: GREY3}]}>
            {' '}
            / porsi
          </Text>
        </View>
        <Button
          text="Order"
          textColor={WHITE}
          textStyle={globalStyles.headingBold.h3}
          containerStyle={styles.btn}
          onPress={() => _onItemPressed(item)}
        />
      </View>
    </Card>
  );

  return (
    <BaseContainer>
      <View style={globalStyles.displayFlex}>
        <StatusBar backgroundColor={WHITE} barStyle="dark-content" />
        <Toolbar>
          <Input
            placeholder="Cari Menu"
            prefix={<FontAwesome name="search" size={24} color={GREY3} />}
            containerStyle={{backgroundColor: GREY10}}
          />
        </Toolbar>
        <View
          style={[
            globalStyles.displayFlex,
            globalStyles.verticalDefaultPadding,
            globalStyles.alignCenter,
            {backgroundColor: WHITE},
          ]}>
          <FlatList
            data={menuData}
            numColumns={2}
            renderItem={renderItem}
            keyExtractor={item => item?.id!.toString()}
            contentContainerStyle={styles.content}
          />
          <Footer />
        </View>
      </View>
    </BaseContainer>
  );
}

const styles = StyleSheet.create({
  content: {
    flexGrow: 1,
    gap: 10,
  },
  item: {
    margin: ITEM_SPACING,
    borderRadius: 10,
    width: ITEM_WIDTH,
    overflow: 'hidden',
  },
  btn: {backgroundColor: BLUE, borderRadius: 8, height: 40},
  img: {width: '100%', height: ITEM_WIDTH, resizeMode: 'stretch'},
  p10: {
    padding: 10,
  },
  btnCharge: {
    borderRadius: 8,
    backgroundColor: BLUE,
    width: 150,
    height: 40,
  },
});
