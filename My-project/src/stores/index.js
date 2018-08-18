/*
 * Created by jhuang on 2018-06-02
*/
import ListStore from './listStore'

class searchStore {
  constructor() {
    this.listStore = new ListStore(this)
  }
}

export default searchStore