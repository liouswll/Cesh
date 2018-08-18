import { observable, action } from 'mobx'

class ListStore {
  constructor(rootStore) {
    this.rootStore = rootStore
  }
  @observable lang = 'zh_CN';//语言
  @action
  changeLang(lang) {
    this.lang = lang;
  }
}
export default ListStore