import enUS from './en-US';
import zhCN from './zh-CN';

const messages = {
    EN: enUS,
    ZH: zhCN,
};

export default VueI18n => {
    return new VueI18n({
        locale: 'ZH',
        messages,
    })
}