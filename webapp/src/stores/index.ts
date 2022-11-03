import { defineStore } from 'pinia';
import { getListApi } from '@/server';
import type { Data,Children,ChinaAdd,ChinaTotal,StatisGradeCityDetail} from './type';

export const useStore = defineStore({
  id: 'counter',
  state: () => ({
    list: <Data>{},
    item: <Children[]>[],
    chinaAdd: <ChinaAdd>{},
    chinaTotal: <ChinaTotal>{},
    cityDetail: <StatisGradeCityDetail[]>[],

  }),
  actions: {
    async getList () {
      const result = await getListApi();
      this.list = result;
      this.chinaAdd = result.diseaseh5Shelf.chinaAdd;
      this.chinaTotal = result.diseaseh5Shelf.chinaTotal;
      this.cityDetail = result.statisGradeCityDetail.slice(0,10);

      console.log(result);
    }
  }
})
