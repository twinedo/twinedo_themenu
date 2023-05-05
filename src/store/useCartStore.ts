import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetMenu} from 'services/handler';
import {IMenuItems} from 'types/interfaces';
import {_onCheckObjectMenu} from 'utils/constants';
import {Alert} from 'react-native';
import {create} from 'zustand';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';

interface ICartStore {
  cartData: Array<IMenuItems & {quantity: number}>;
  addToCart?: (item: IMenuItems) => void;
  minusToCart?: (item: IMenuItems) => void;
}

const useCartStore = create<ICartStore>()(
  devtools(
    persist(
      (set, get) => ({
        cartData: [],
        addToCart: (item: IMenuItems) => {
          const newCart = [...get().cartData];
          const findIdx = newCart.findIndex(obj => obj.id === item.id);
          if (findIdx >= 0) {
            newCart[findIdx].quantity = newCart[findIdx].quantity + 1;
            set({cartData: [...newCart]});
          } else {
            const newItem = {
              ...item,
              quantity: 1,
            };
            set({cartData: [...newCart, newItem]});
          }
        },
        minusToCart: (item: IMenuItems) => {
          const newCart = [...get().cartData];
          const findIdx = newCart.findIndex(obj => obj.id === item.id);
          if (findIdx >= 0) {
            if (newCart[findIdx].quantity === 1) {
              Alert.alert('cuk', 'cuk');
              const filtered = newCart.filter(o => o.quantity > 0);
              console.log('filtered', filtered);
              //   set({cartData: });
            } else {
              Alert.alert('cuk', 'cukad');
              newCart[findIdx].quantity = newCart[findIdx].quantity - 1;
              set({cartData: newCart});
            }
          } else {
            Alert.alert('test', 'test');
            const filtered = newCart.filter(o => o.quantity > 0);
            set({cartData: filtered});
          }
        },
      }),
      {
        name: '@menuState-themenu',
        storage: createJSONStorage(() => AsyncStorage),
      },
    ),
  ),
);

export default useCartStore;
