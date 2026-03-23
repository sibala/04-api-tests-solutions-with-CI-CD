import { fetchPosts, fetchTags, fetchPostsByTag } from "./api-service.js";
import { AppModel } from "./app-model.js";
import { renderPosts, renderTags, showLoading, showError } from "./app-view.js";

let model = new AppModel();

async function handleTagChange(tag) {
  model.selectedTag = tag || null;
  showLoading();

  try {
    let data = tag ? await fetchPostsByTag(tag) : await fetchPosts();
    model.posts = data.posts;
    renderPosts(model.posts);
  } catch {
    showError("Kunde inte ladda inlägg");
  }
}

// Starta appen
async function init() {
  try {
    let tags = await fetchTags();
    let postData = await fetchPosts();
    model.tags = tags;
    model.posts = postData.posts;
    renderTags(tags, handleTagChange);
    renderPosts(model.posts);
  } catch {
    showError("Kunde inte ladda data");
  }
}

init();
