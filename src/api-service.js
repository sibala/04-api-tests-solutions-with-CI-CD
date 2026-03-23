const BASE_URL = "https://dummyjson.com";

export async function fetchPosts() {
  let res = await fetch(BASE_URL + "/posts");
  
  return res.json();
}

export async function fetchTags() {
  let res = await fetch(BASE_URL + "/posts/tags");
  return res.json();
}

export async function fetchPostsByTag(tag) {
  let res = await fetch(BASE_URL + "/posts/tag/" + tag);
  return res.json();
}
