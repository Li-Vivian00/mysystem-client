export default {
  methods: {
    getLangName(key) {
      const langArr = {
        EN: 'EN',
        ZH: 'ZH'
      };
      return langArr[key];
    }
  }
};
