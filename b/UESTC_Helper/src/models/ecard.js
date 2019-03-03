import { getTransactionFlow, getBasicInfo } from '../components/ecard/services';

export default {
  namespace: 'ecard',
  state: {
    
  },
  subscriptions: {
    setup({dispatch, history}) {
      history.listen(location => {
        if (location.pathname === '/ecard') {
          dispatch({
            type: 'loadData',
            payload: {}
          });
        }
      });
    },
  },
  effects: {
    *loadData({payload}, {call, put}) {
      // 初始化数据
      const basicData = yield call(getTransactionFlow);
      const res = yield call(getBasicInfo);
      console.log(basicData, res)
    }
  },
  reducers: {
    /**
     * 更新状态
     * @param {*Object} state 
     * @param {Object} action 
     */
    updateState(state, action) {
      return { ...state, ...action.payload };
    }
  },
};