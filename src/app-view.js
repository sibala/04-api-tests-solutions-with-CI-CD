let postList = document.getElementById("post-list");
let tagFilter = document.getElementById("tag-filter");

export function renderPosts(posts) {
  postList.innerHTML = "";
  posts.forEach((post) => {
    let div = document.createElement("div");
    div.className = "post-card";

    let h3 = document.createElement("h3");
    h3.textContent = post.title;

    let p = document.createElement("p");
    p.textContent = post.body;

    let meta = document.createElement("div");
    meta.className = "post-meta";
    meta.textContent =
      "Tags: " + post.tags.join(", ") +
      " | Likes: " + post.reactions.likes +
      " | Views: " + post.views;

    div.append(h3, p, meta);
    postList.appendChild(div);
  });
}

export function renderTags(tags, onChange) {
  tagFilter.innerHTML = '<option value="">Alla</option>';
  console.log(tags);
  tags.forEach((tag) => {
    let option = document.createElement("option");
    option.value = tag.slug;
    option.textContent = tag.name;
    tagFilter.appendChild(option);
  });
  tagFilter.addEventListener("change", () => onChange(tagFilter.value));
}

export function showLoading() {
  postList.innerHTML = '<p class="loading">Laddar inlägg…</p>';
}

export function showError(message) {
  postList.innerHTML = '<p class="error">' + message + "</p>";
}
