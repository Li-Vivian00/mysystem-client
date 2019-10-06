import Util from '../utils/utilsReg';
export const validateName = (rule, value, callback, self) => {
  if (_.isEmpty(value)) {
    callback(new Error(self.$t('register.status.userName')));
  }
  callback();
};

export const validateSex = (rule, value, callback, self) => {
  if (value === '') {
    callback(new Error(self.$t('register.status.sex')));
  } else {
    callback();
  }
};

export const validateEmail = (rule, value, callback, self) => {
  if (value === '') {
    callback(new Error(self.$t('register.status.email')));
  } else if (!Util.emailReg.test(value)) {
    callback(new Error(self.$t('register.status.formatEmail')));
  } else {
    callback();
  }
};

export const validateCard = (rule, value, callback, self) => {
  if (value === '') {
    callback(new Error(self.$t('register.status.card')));
  } else if (!Util.idCardReg.test(value)) {
    callback(new Error(self.$t('register.status.formatCard')));
  } else {
    callback();
  }
};

export const validatePass = (rule, value, callback, self) => {
  if (value === '') {
    callback(new Error(self.$t('register.status.password')));
  } else {
    callback();
  }
};

export const validateRepeatPass = (
  rule,
  value,
  callback,
  self,
  formPassword
) => {
  if (value === '') {
    callback(new Error(self.$t('register.status.repeatPassword')));
  } else if (value !== formPassword) {
    callback(new Error(self.$t('register.status.repeatPasswordError')));
  } else {
    callback();
  }
};

export const validateLoginId = (rule, value, callback, self) => {
  if (value === '') {
    callback(new Error(self.$t('login.userLogin.inputPlaceholder')));
  }
  callback();
};
