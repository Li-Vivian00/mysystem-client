import xlsx from 'xlsx';
// import xlsxStyle from 'xlsx-style';
import saveAs from './fileSaver';
import _ from 'lodash';

//字符串转字符流
let s2ab = function (s) {
    if (typeof ArrayBuffer !== 'undefined') {
      let buf = new ArrayBuffer(s.length);
      let view = new Uint8Array(buf);
      for (let i = 0; i !== s.length; ++i) {
        view[i] = s.charCodeAt(i) & 0xFF;
      }
      return buf;
    }
    else {
      let buf = new Array(s.length);
      for (let i = 0; i !== s.length; ++i) {
        buf[i] = s.charCodeAt(i) & 0xFF;
      }
      return buf;
    }
  };

export const exportUserData = ({dataSet, fileName, sheetName}) => {
    let userData = {
        'A1': {'t': 's', 'v': 'Id'},
        'B1': {'t': 's', 'v': 'Login Id'},
        'C1': {'t': 's', 'v': 'User Name'},
        'D1': {'t': 's', 'v': 'Sex'},
        'E1': {'t': 's', 'v': 'Password'},
        'F1': {'t': 's', 'v': 'Phone'},
        'G1': {'t': 's', 'v': 'Card Id'},
        'H1': {'t': 's', 'v': 'Email'},
        'I1': {'t': 's', 'v': 'Room Id'},
        'J1': {'t': 's', 'v': 'Stay Date'},
        '!cols': [
          {wpx: 100},
          {wpx: 100},
          {wpx: 100},
          {wpx: 100},
          {wpx: 100},
          {wpx: 100},
          {wpx: 100},
          {wpx: 100},
          {wpx: 100},
          {wpx: 100},
        ],
    };

    let wb = {
        SheetNames: [sheetName],
        Sheets: {},
        Props: {},
    }
    wb.Sheets[sheetName] = xlsx.utils.sheet_add_json(userData, dataSet[sheetName], {
        skipHeader: true,
        origin: 'A2',
        cellStyles: true,
    })
    const fullFileName = `${fileName}.xlsx`;
    const output = xlsx.write(wb, {bookType: 'xlsx', bookSST: false, type: 'binary'});
    //创建二进制对象写入转换好的字节流 并保存文件
    saveAs(new Blob([s2ab(output)], {type: 'application/octet-stream'}), fullFileName);
}