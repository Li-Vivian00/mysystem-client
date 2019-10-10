export default {
  methods: {
    getDateTimes() {
      const str = new Date()
        .toLocaleString('chinese', { hour12: false })
        .replace(/(\/)/g, '-');
      return str;
    }
  }
};
