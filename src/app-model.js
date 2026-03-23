export class AppModel {
  constructor() {
    this.posts = [];
    this.tags = [];
    this.selectedTag = null;
  }

  reset() {
    this.posts = [];
    this.tags = [];
    this.selectedTag = null;
  }
}
