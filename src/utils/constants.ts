import {IMenuItems} from 'types/interfaces';

export const _onCheckObjectMenu = (data: IMenuItems[]) => {
  data.map((item: IMenuItems) => {
    if (
      item.created_at &&
      item.food_code &&
      item.id &&
      item.name &&
      item.picture &&
      item.picture_ori &&
      item.price
    ) {
      return item;
    }
    return {
      created_at: new Date().toLocaleDateString(),
      food_code: '',
      id: item.id,
      name: 'Unknown',
      picture: '',
      picture_ori: '',
      price: '',
    };
  });
};
