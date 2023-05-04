import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  FlatList,
  Image,
} from 'react-native';
import React, {useRef, useEffect} from 'react';
import globalStyles from 'styles/globalStyles';
import {Card, Input, Toolbar} from 'components';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {BLACK, GREY10, GREY3, WHITE} from 'styles/colors';
import {InputComponentRef} from 'components/Input';
import useMenuStore from 'store/useMenuStore';
import {IMenuItems} from 'types/interfaces';

const ITEM_WIDTH =
  (Dimensions.get('window').width -
    globalStyles.horizontalDefaultPadding.paddingHorizontal * 2) /
  2;
const ITEM_SPACING = 4;
export default function Home() {
  const inputRef = useRef<InputComponentRef>(null);

  const {isLoading, menuData, getAllMenus} = useMenuStore();

  useEffect(() => {
    getAllMenus();
  }, []);

  const DATA = [...Array(10)].map((_, index) => ({
    id: String(index),
    title: `Item ${index + 1}`,
  }));

  const _onCheckImage = (source: string) => {
    if (source === '' || source === null || source.includes('localhost')) {
      return require('assets/images/img_default.png');
    } else {
      return {url: source};
    }
  };

  const Item = ({name, picture}: IMenuItems) => (
    <Card containerStyle={[styles.item, {width: ITEM_WIDTH - 16}]}>
      <Image
        source={_onCheckImage(picture)}
        style={{width: '100%', height: ITEM_WIDTH, resizeMode: 'contain'}}
      />
      <Text style={styles.title}>{name}</Text>
    </Card>
  );

  return (
    <View style={globalStyles.displayFlex}>
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
          //   globalStyles.horizontalDefaultPadding,
          globalStyles.verticalDefaultPadding,
          {backgroundColor: WHITE},
        ]}>
        <FlatList
          data={menuData.filter(obj => obj.id && obj.name)}
          numColumns={2}
          renderItem={Item}
          keyExtractor={item => item?.id.toString()}
          columnWrapperStyle={[styles.list, globalStyles.justifyEven]}
          contentContainerStyle={[
            styles.content,
            {
              gap: 10,
              //   margin: 16,
            },
          ]}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    marginHorizontal: -ITEM_SPACING,
  },
  item: {
    // backgroundColor: '#f9c2ff',
    padding: 20,
    margin: ITEM_SPACING,
    borderRadius: 10,
  },
  title: {
    fontSize: 32,
    color: BLACK,
  },
  content: {
    flexGrow: 1,
  },
});
