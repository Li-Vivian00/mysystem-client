import _ from 'lodash';
import { exportUserData } from '../plugins/excelHelper';
import getDateTimes from '../mixin/getDateTimes';
export default {
  data() {
    return {
      result: []
    };
  },
  mixins: [getDateTimes],
  methods: {
    async exportUserData(data) {
      if (!_.isArray(data)) {
        this.result.push(data);
      } else {
        this.result = data;
      }
      this.result = _.map(this.result, item => {
        return {
          Id: item.id,
          loginId: item.loginid,
          userName: item.username,
          sex: item.sex,
          password: item.password,
          phone: item.phone,
          card: item.card,
          email: item.email,
          roomId: item.room_id,
          stayDate: item.stay_date
        };
      });
      const time = this.getDateTimes();
      const fileName = `User Detail-${time}`;
      exportUserData({
        dataSet: {
          'User Data Table': this.result
        },
        fileName,
        sheetName: 'User Data Table'
      });
      this.result = [];
    }
  }
};
