import AsyncStorage from '@react-native-async-storage/async-storage';
import {GetMenu} from 'services/handler';
import {IMenuItems} from 'types/interfaces';
import {_onCheckObjectMenu} from 'utils/constants';
import {create} from 'zustand';
import {createJSONStorage, devtools, persist} from 'zustand/middleware';

interface IMenuStore {
  isLoading: boolean;
  getAllMenus: () => void;
  menuData: Array<IMenuItems>;
}

const useMenuStore = create<IMenuStore>()(
  devtools(
    persist(
      set => ({
        isLoading: true,
        menuData: [],
        getAllMenus: async () => {
          set({isLoading: true});
          try {
            const response = await GetMenu();
            console.log('response', response);
            const filteredArray = _onCheckObjectMenu(response);
            console.log('filteredArra', filteredArray);
            set(() => ({
              isLoading: false,
              menuData: response,
            }));
          } catch (error) {
            set({isLoading: false});
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

export default useMenuStore;
